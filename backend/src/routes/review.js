'use strict';

import express from 'express';
import multer from 'multer';
import checkAccess from '../middleware/checkAccessToken';
import axios from 'axios';
import PLACE from '../models/PLACE';
import REVIEW from '../models/REVIEW';
import USER from '../models/USER';
import KEYWORD from '../models/KEYWORD';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { logger } from '../../winston/winston';
import sql from '../database/sql';
dotenv.config();
const router = express.Router();

//---- 연동확인
router.get('/', async (req, res) => {
  res.send('review');
});

async function getKeyword(place_id) {
  let keywordlist = [null, null, null];
  const keyword = await KEYWORD.findAll({
    attributes: [
      'KEYWORD',
      [Sequelize.fn('count', Sequelize.col('*')), 'COUNT'],
    ],
    include: [
      {
        model: REVIEW,
        as: 'REVIEW',
        attributes: [],
        where: { PLACE_ID: place_id },
      },
    ],
    group: ['KEYWORD'],
    order: [[Sequelize.literal('COUNT'), 'DESC']],
    limit: 3,
  });
  keyword.forEach((keyword, idx) => {
    switch (keyword.KEYWORD) {
      case 1:
        keywordlist[idx] = '술이 맛있어요';
        break;
      case 2:
        keywordlist[idx] = '술이 다양해요';
        break;
      case 3:
        keywordlist[idx] = '혼술하기 좋아요';
        break;
      case 4:
        keywordlist[idx] = '분위기가 좋아요';
        break;
      case 5:
        keywordlist[idx] = '직원이 친절해요';
        break;
      case 6:
        keywordlist[idx] = '대화하기 좋아요';
        break;
      case 7:
        keywordlist[idx] = '가성비가 좋아요';
        break;
      case 8:
        keywordlist[idx] = '메뉴가 다양해요';
        break;
      case 9:
        keywordlist[idx] = '음식이 맛있어요';
        break;
      default:
        keywordlist[idx] = null;
    }
  });
  return keywordlist;
}

router.get('/getList', checkAccess, async (req, res) => {
  // Example
  // http://localhost:3030/review/getList?query=수원 칵테일바&x=37.514322572335935&y=127.06283102249932&radius=20000&sort=accuracy
  let data = {
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
            sort: req.query.sort,
            category_group_code: 'FD6',
          },
          headers: {
            Authorization: 'KakaoAK ' + process.env.KAKAO_REST_API_KEY,
          },
        }
      );
      for (let i = 0; i < response.data.documents.length; i++) {
        let temp = {
          kakao_data: null,
          total_rate: null,
          keyword: null,
          review: {
            review_cnt: null,
            review_list: [],
          },
        };
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
            where: { PLACE_ID: element.id },
            limit: 2,
            order: [['createdAt', 'DESC']],
          });
          const rating = await REVIEW.findOne({
            attributes: [
              'PLACE_ID',
              [Sequelize.fn('AVG', Sequelize.col('RATING')), 'AVG_RATING'],
              [Sequelize.fn('COUNT', Sequelize.col('RATING')), 'COUNT_RATING'],
            ],
            where: {
              PLACE_ID: element.id,
            },
            group: ['PLACE_ID'],
          });
          temp.kakao_data = element;
          if (rating != null) temp.total_rate = rating.dataValues.AVG_RATING;
          temp.keyword = await getKeyword(element.id);
          temp.review.review_cnt = reviewList.length;
          temp.review.review_list = Object.assign(reviewList);
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
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'KAKAO API 조회 실패', error });
  }
});

router.get('/getBar/:id', checkAccess, async (req, res) => {
  // 빈값 처리 필요
  // Example
  // http://localhost:3030/review/getBar/1389819741
  let data = {};
  const id = req.params.id;
  const place_data = await PLACE.findByPk(id);
  data = Object.assign(place_data);
  try {
    const review = await REVIEW.findByPk(id, {
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('RATING')), 'AVG_RATING'],
      ],
      raw: true,
    });
    data.dataValues.AVG_RATING = review.AVG_RATING;
    return res
      .status(200)
      .json({ success: true, message: '칵테일 바 단건 조회 성공', data: data });
  } catch (error) {
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: '칵테일 바 단건 조회 실패', error });
  }
});

router.get('/getReview/:id', checkAccess, async (req, res) => {
  // Example
  // http://localhost:3030/review/getReview/17649496
  try {
    let data = {
      total_cnt: null,
      keyword: null,
      list: [],
    };
    const id = req.params.id;
    const review = await REVIEW.findAll({
      where: { PLACE_ID: id },
      include: [
        {
          model: USER,
          as: 'UNO_USER',
          attributes: ['UNO', 'NICKNAME', 'LEVEL'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    data.total_cnt = review.length;
    data.list = Object.assign(review);
    for (let i = 0; i < data.total_cnt; i++) {
      if (req.user.UNO == data.list[i].UNO_USER.UNO) {
        data.list[i].dataValues.UNO_USER.dataValues.ISWRITER = true;
      } else {
        console.log(data.list[i].dataValues.UNO_USER);
        data.list[i].dataValues.UNO_USER.dataValues.ISWRITER = false;
      }
    }
    data.keyword = await getKeyword(id);
    return res
      .status(200)
      .json({ success: true, message: '칵테일 바 리뷰 조회 성공', data: data });
  } catch (error) {
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: '칵테일 바 리뷰 조회 실패', error });
  }
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
  const typeArray = file.originalname.split('.');
  const fileType = typeArray[1]; // 이미지 확장자 추출
  //이미지 확장자 구분 검사
  if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
    callback(null, true);
  } else {
    return callback(
      { message: '*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다.' },
      false
    );
  }
};
//multer 미들웨어 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 파일이 업로드되는 경로 지정
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // 파일 이름 설정
  },
});
const upload = multer({
  storage: storage,
  dest: __dirname + '/uploads/', // 이미지 업로드 경로
  limits: limits, // 이미지 업로드 제한 설정
  fileFilter: fileFilter, // 이미지 업로드 필터링 설정
});

// 리뷰 등록
router.post(
  '/create/:placeId',
  upload.array('files', 5),
  checkAccess,
  async (req, res) => {
    const review = await sql.postReview(req);
    console.log(review);
    console.log('req', req);

    //배열 형태이기 때문에 반복문을 통해 파일 정보를 알아낸다.
    req.files.map(async (data) => {
      console.log('폼에 정의된 필드명 : ', data.fieldname);
      console.log('사용자가 업로드한 파일 명 : ', data.originalname);
      console.log('파일의 엔코딩 타입 : ', data.encoding);
      console.log('파일의 Mime 타입 : ', data.mimetype);
      console.log('파일이 저장된 폴더 : ', data.destination);
      console.log('destinatin에 저장된 파일 명 : ', data.filename);
      console.log('업로드된 파일의 전체 경로 ', data.path);
      console.log('파일의 바이트(byte 사이즈)', data.size);
    });
    try {
      await sql.postImage(req, review);
    } catch (error) {
      console.log(error.message);
    }
    res.json({ ok: true, data: 'Multipart Upload Ok' });
  }
);

router.put('/update', checkAccess, async (req, res) => {
  return res.status(200).json({ success: true, message: '리뷰 수정 성공' });
});

router.delete('/delete', checkAccess, async (req, res) => {
  return res.status(200).json({ success: true, message: '리뷰 삭제 성공' });
});

//Error Handler
router.use((err, req, res, next) => {
  res.json({ ok: false, data: err.message });
});

export default router;
