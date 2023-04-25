'use strict';

import express from 'express';
import multer from 'multer';
import checkAccess from '../middleware/checkAccessToken';
import axios from 'axios';
// import PLACE from '../models/PLACE';
// import REVIEW from '../models/REVIEW';
// import IMAGE from '../models/IMAGE';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import sql from '../database/sql';
dotenv.config();
const router = express.Router();

//---- 연동확인
router.get('/', async (req, res) => {
  res.send('review');
});

router.get('/getList', async (req, res) => {
  const data = {
    total_cnt: 0,
    place_list: [],
  };
  try {
    let end = false;
    let page = 1;
    while (!end) {
      const response = await axios.get(
        'https://dapi.kakao.com/v2/local/search/keyword.json',
        {
          params: {
            // --원의 중심 --
            query: req.body.query,
            x: req.body.x,
            y: req.body.y,
            // --------------
            radius: req.body.radius,
            page: page,
            size: 15,
            sort: req.body.sort,
            category_group_code: 'FD6',
          },
          headers: {
            Accept: '*/*',
            Authorization: 'KakaoAK ' + process.env.KAKAO_REST_API_KEY,
          },
        }
      );
      for (let i = 0; i < response.data.documents.length; i++) {
        const element = response.data.documents[i];
        if (element.category_name == '음식점 > 술집 > 칵테일바') {
          const [place, created] = await PLACE.findOrCreate({
            where: { PLACE_ID: element.id },
            defaults: {
              NAME: element.place_name,
              ADDRESS: element.address_name,
              ROAD_ADDRESS: element.road_address_name,
              PHONE: element.phone == '' ? null : element.phone,
              X: element.x,
              Y: element.y,
              URL: element.place_url,
            },
          });
          if (!created) {
            place.update({
              NAME: element.place_name,
              ADDRESS: element.address_name,
              ROAD_ADDRESS: element.road_address_name,
              PHONE: element.phone == '' ? null : element.phone,
              X: element.x,
              Y: element.y,
              URL: element.place_url,
            });
          }

          data.total_cnt++;
          const reviewList = await REVIEW.findAll({
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
            where: { PLACE_ID: parseInt(element.id) },
            limit: 2,
            order: [['CREATED_AT', 'DESC']],
          });
          console.log(reviewList);
          let temp = {
            kakao_data: element,
            total_rate: 5, //해야하는거
            review: {
              review_cnt: reviewList.length,
              review_list: reviewList,
            },
          };
          data.place_list.push(temp);
        }
      }
      end = response.data.meta.is_end;
      if (!end) {
        page++;
      }
    }
    return res
      .status(200)
      .json({ success: true, message: 'KAKAO API 조회 성공', data: data });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'KAKAO API 조회 실패', error });
  }
});

//multer 미들웨어 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 파일이 업로드되는 경로 지정
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // 파일 이름 설정
  },
});

// 파일 업로드를 위해 사용되는 multipart/form-data 를 front에서 사용할것

//multer 미들웨어 파일 제한 값 (Doc 공격으로부터 서버를 보호하는데 도움이 된다.)
const limits = {
  fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 5, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};
const fileFilter = (req, file, callback) => {
  const typeArray = file.mimetype.split('/');
  const fileType = typeArray[1]; // 이미지 확장자 추출

  //이미지 확장자 구분 검사
  if (fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png') {
    callback(null, true);
  } else {
    return callback(
      { message: '*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다.' },
      false
    );
  }
};
const upload = multer({
  storage: storage,
  dest: __dirname + '/uploads/', // 이미지 업로드 경로
  limits: limits, // 이미지 업로드 제한 설정
  fileFilter: fileFilter, // 이미지 업로드 필터링 설정
});

// 리뷰 등록
router.post(
  '/create/:placeId',
  upload.array('file'),
  checkAccess,
  async (req, res) => {
    const review = await sql.postReview(req);

    const { name } = req.body;

    console.log('body 데이터 : ', name);

    //배열 형태이기 때문에 반복문을 통해 파일 정보를 알아낸다.
    req.files.map(async (data) => {
      console.log('폼에 정의된 필드명 : ', data.fieldname);
      console.log('사용자가 업로드한 파일 명 : ', data.originalname);
      console.log('파일의 엔코딩 타입 : ', data.encoding);
      console.log('파일의 Mime 타입 : ', data.mimetype);
      console.log('파일이 저장된 폴더 : ', data.destination);
      console.log('destinatin에 저장된 파일 명 : ', data.filename);
      console.log('업로드된 파일의 전체 경로 ', data.path);
      await sql.postImage(req, review);
      console.log('파일의 바이트(byte 사이즈)', data.size);
    });
    res.json({ ok: true, data: 'Multipart Upload Ok' });
  }
);

//Error Handler
router.use((err, req, res, next) => {
  res.json({ ok: false, data: err.message });
});
export default router;
