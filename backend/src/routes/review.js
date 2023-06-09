'use strict';

import express from 'express';
import multer from 'multer';
import fs from 'fs';
import checkAccess from '../middleware/checkAccessToken';
import axios from 'axios';
import { db } from '../models';
import { Sequelize } from 'sequelize';
import { logger } from '../../winston/winston';
import sql from '../database/sql';
import dotenv from 'dotenv';
import checkTokenYesAndNo from '../middleware/checkTokenYesAndNo';
dotenv.config();
const router = express.Router();

const KEYWORD_VALUE = [
  {
    id: 1,
    value: '술이 맛있어요',
  },
  {
    id: 2,
    value: '술이 다양해요',
  },
  {
    id: 3,
    value: '혼술하기 좋아요',
  },
  {
    id: 4,
    value: '메뉴가 다양해요',
  },
  {
    id: 5,
    value: '음식이 맛있어요',
  },
  {
    id: 6,
    value: '분위기가 좋아요',
  },
  {
    id: 7,
    value: '직원이 친절해요',
  },
  {
    id: 8,
    value: '대화하기 좋아요',
  },
  { id: 9, value: '가성비가 좋아요' },
];

async function getKeyword(placeId) {
  let keywordlist = [null, null, null];
  const keyword = await db.KEYWORD.findAll({
    attributes: [
      'KEYWORD',
      [Sequelize.fn('COUNT', Sequelize.col('*')), 'COUNT'],
    ],
    include: [
      {
        model: db.REVIEW,
        as: 'REVIEW',
        attributes: [],
        where: { PLACE_ID: placeId },
        required: false,
      },
    ],
    group: ['KEYWORD'],
    order: [[Sequelize.literal('COUNT'), 'DESC']],
    limit: 3,
  });
  keyword.forEach((keyword) =>
    keywordlist.push(KEYWORD_VALUE[keyword.KEYWORD - 1].value)
  );
  return keywordlist;
}

async function getKeywordByReviewId(reviewId) {
  const keywordlist = [];
  const keyword = await db.KEYWORD.findAll({
    where: {
      REVIEW_ID: reviewId,
    },
  });
  keyword.forEach((keyword) =>
    keywordlist.push(KEYWORD_VALUE[keyword.KEYWORD - 1])
  );
  return keywordlist;
}

router.get('/barlist', checkTokenYesAndNo, async (req, res) => {
  // Example
  // http://localhost:3030/reviews/list?query=수원 칵테일바&x=37.514322572335935&y=127.06283102249932&radius=20000&sort=accuracy
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
            query: req.query.query,
            x: req.query.x,
            y: req.query.y,
            radius: req.query.radius,
            sort: req.query.sort,
            page: page,
            size: 15,
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
          const [place, created] = await db.PLACE.findOrCreate({
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
          const review_num = await db.REVIEW.findAll({
            where: { PLACE_ID: element.id },
          });
          const reviewList = await db.REVIEW.findAll({
            where: { PLACE_ID: element.id },
            include: [
              {
                model: db.USER,
                as: 'UNO_USER',
                attributes: ['UNO', 'NICKNAME', 'LEVEL'],
                required: false,
              },
            ],
            order: [['createdAt', 'DESC']],
            limit: 2,
          });
          const rating = await db.REVIEW.findOne({
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
          temp.review.review_cnt = review_num.length;
          temp.review.review_list = Object.assign(reviewList);
          for (let i = 0; i < reviewList.length; i++) {
            await sql
              .getImageId(temp.review.review_list[i].REVIEW_ID)
              .then((arr) => {
                temp.review.review_list[i].dataValues.imgIdArr = arr; //imgId삽입
              });
            if (req.user && req.user.UNO == temp.review.review_list[i].UNO_USER.UNO) {
              temp.review.review_list[
                i
              ].dataValues.UNO_USER.dataValues.ISWRITER = true;
            } else {
              temp.review.review_list[
                i
              ].dataValues.UNO_USER.dataValues.ISWRITER = false;
            }
          }
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

router.get('/bar/:placeId', checkAccess, async (req, res) => {
  // 빈값 처리 필요
  // Example
  // http://localhost:3030/reviews/getBar/1389819741
  let data = {};
  const placeId = req.params.placeId;
  console.log(placeId);
  const place_data = await db.PLACE.findByPk(placeId);
  data = Object.assign(place_data.dataValues);
  try {
    const rating = await db.REVIEW.findOne({
      attributes: [
        'PLACE_ID',
        [Sequelize.fn('AVG', Sequelize.col('RATING')), 'AVG_RATING'],
        [Sequelize.fn('COUNT', Sequelize.col('RATING')), 'COUNT_RATING'],
      ],
      where: {
        PLACE_ID: placeId,
      },
      group: ['PLACE_ID'],
    });
    data.AVG_RATING = rating != null ? rating.dataValues.AVG_RATING : null;
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

router.get('/checkToken', checkTokenYesAndNo, async (req, res) => {
  console.log('checkandno');
});

router.get('/bar/reviewlist/:place_id', checkAccess, async (req, res) => {
  // Example
  // http://localhost:3030/reviews/17649496
  try {
    let data = {
      total_cnt: null,
      keyword: null,
      list: [],
    };
    const place_id = req.params.place_id;
    const review = await db.REVIEW.findAll({
      where: { PLACE_ID: place_id },
      include: [
        {
          model: db.USER,
          as: 'UNO_USER',
          attributes: ['UNO', 'NICKNAME', 'LEVEL'],
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    data.total_cnt = review.length;
    data.list = Object.assign(review);
    for (let i = 0; i < review.length; i++) {
      await sql.getImageId(data.list[i].REVIEW_ID).then((arr) => {
        data.list[i].dataValues.imgIdArr = arr; //imgId삽입
      });
      if (req.user.UNO == data.list[i].UNO_USER.UNO) {
        data.list[i].dataValues.UNO_USER.dataValues.ISWRITER = true;
      } else {
        data.list[i].dataValues.UNO_USER.dataValues.ISWRITER = false;
      }
      data.list[i].dataValues.KEYWORDS = await getKeywordByReviewId(
        data.list[i].dataValues.REVIEW_ID
      );
    }
    data.keyword = await getKeyword(place_id);
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
//이미지 정보 가져오기
router.get('/image/one', async (req, res) => {
  try {
    const imageId = req.query.imageId;
    const imgPath = await sql.getImagePath(imageId, 'review');
    const data = fs.readFileSync(imgPath);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.write(data);
    return res.end();
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: '이미지 조회 실패', error });
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
  const fileType = typeArray[typeArray.length - 1]; // 이미지 확장자 추출
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
router.post('/', checkAccess, upload.array('files', 5), async (req, res) => {
  const review = await sql.postReview(req);

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
    res.json({ success: true, message: 'Multipart Upload Ok & DB update OK' });
  } catch (error) {
    console.log(error.message);
  }
});

//리뷰 수정하기 위한 페이지 보여주기
router.get('/one/:reviewId', checkAccess, async (req, res) => {
  try {
    const prevReview = await sql.getReview(req);
    prevReview.success = true;
    prevReview.message = 'Successfuly loaded previous review data';
    console.log(prevReview);
    return res.status(200).send(prevReview);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({
      success: false,
      message: 'fail to load previous review',
      error: error.message,
    });
  }
});

//리뷰 수정
router.post(
  '/:reviewId',
  checkAccess,
  sql.deleteImage,
  upload.array('files', 5),
  async (req, res) => {
    try {
      const review = await sql.changeReview(req);
      await sql.postImage(req, review);
      res.json({ success: true, message: 'Change Review Success' });
    } catch (error) {
      console.log(error.message);
    }
  }
);

router.delete('/:reviewId', checkAccess, sql.deleteImage, async (req, res) => {
  console.log('hi');
  try {
    await sql.deleteReview(req);
    return res
      .status(200)
      .json({ success: true, message: 'Delete Review Success' });
  } catch (error) {
    console.log(error.message);
  }
});

//Error Handler
router.use((err, req, res, next) => {
  res.json({ success: false, message: err.message });
});

export default router;
