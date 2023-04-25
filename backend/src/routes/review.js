'use strict';

import express from 'express';
import checkAccess from '../middleware/checkAccessToken';
import axios from 'axios';
import PLACE from '../models/PLACE';
import REVIEW from '../models/REVIEW';
import USER from '../models/USER';
import KEYWORD from '../models/KEYWORD';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { logger } from '../../winston/winston';

dotenv.config();
const router = express.Router();

//---- 연동확인
router.get('/', async (req, res) => {
  res.send('review');
});

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
            query: req.query.query,
            x: req.query.x,
            y: req.query.y,
            radius: req.query.radius,
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
            where: { PLACE_ID: element.id },
            limit: 2,
            order: [['createdAt', 'DESC']],
          });
          let temp = {
            kakao_data: element,
            total_rate: 5,
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
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'KAKAO API 조회 실패', error });
  }
});

router.get('/getBar/:id', checkAccess, async (req, res) => {
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
      keyword: [null, null, null],
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
    console.log(data);

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
          where: { PLACE_ID: id },
        },
      ],
      group: ['KEYWORD'],
      order: [[Sequelize.literal('COUNT'), 'DESC']],
      limit: 3,
    });
    console.log(keyword);
    keyword.forEach((keyword, idx) => {
      console.log(keyword);
      console.log(idx);
      console.log(keyword.KEYWORD);
      switch (keyword.KEYWORD) {
        case 1:
          data.keyword[idx] = '술이 맛있어요';
          break;
        case 2:
          data.keyword[idx] = '술이 다양해요';
          break;
        case 3:
          data.keyword[idx] = '혼술하기 좋아요';
          break;
        case 4:
          data.keyword[idx] = '분위기가 좋아요';
          break;
        case 5:
          data.keyword[idx] = '직원이 친절해요';
          break;
        case 6:
          data.keyword[idx] = '대화하기 좋아요';
          break;
        case 7:
          data.keyword[idx] = '가성비가 좋아요';
          break;
        case 8:
          data.keyword[idx] = '메뉴가 다양해요';
          break;
        case 9:
          data.keyword[idx] = '음식이 맛있어요';
          break;
        default:
          data.keyword[idx] = null;
      }
    });
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

router.post('/create', checkAccess, async (req, res) => {
  return res.status(200).json({ success: true, message: '리뷰 작성 성공' });
});

router.put('/update', checkAccess, async (req, res) => {
  return res.status(200).json({ success: true, message: '리뷰 수정 성공' });
});

router.delete('/delete', checkAccess, async (req, res) => {
  return res.status(200).json({ success: true, message: '리뷰 삭제F 성공' });
});

export default router;
