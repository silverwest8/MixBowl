import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as jwt_module from '../routes/jwt/jwt-util';
import USER from '../models/USER';
import REVIEW from '../models/REVIEW';
import IMAGE from '../models/IMAGE';
import KEYWORD from '../models/KEYWORD';
import fs from 'fs';
dotenv.config(); //JWT 키불러오기

const sql = {
  getUser: async () => {
    const user = await USER.findAll();
    return user;
  },

  //refresh token 조회
  //안쓸듯
  getToken: async (username) => {
    const reToken = await promisePool.query(`
      SELECT TOKEN FROM USER WHERE '${username}' = NICKNAME;
    `);
    return reToken;
  },

  namedupcheck: async (req) => {
    const { checkname } = req.body;
    try {
      const check = await USER.findAndCountAll({
        where: { NICKNAME: checkname },
      });
      return check['count'];
    } catch (error) {
      console.log(error.message);
    }
  },

  emaildupcheck: async (req) => {
    const { checkemail } = req.body;
    try {
      const check = await USER.findAndCountAll({
        where: { EMAIL: checkemail },
      });

      return check['count'];
    } catch (error) {
      console.log(error.message);
    }
  },

  signupUser: async (req) => {
    const { nickname, email, password } = req.body; // regitserInfo에는 Nickname, Email, Password 가 포함되어야 함.
    console.log(nickname, email, password);
    try {
      await USER.create({
        NICKNAME: nickname,
        PASSWORD: password,
        EMAIL: email,
        LEVEL: 1,
      });
      return true;
    } catch (error) {
      console.log(error.message);
    }
  },

  loginUser: async (req) => {
    const { email, password } = req.body;
    try {
      const user = await USER.findOne({
        where: { email: email, password: password },
      });
      const unum = user.UNO;
      if (!(unum > 0)) {
        throw new Error('Invalid Info User');
      }

      //UNO 도 같이 포함
      const accessToken = jwt_module.sign(unum);
      const refreshToken = jwt_module.refresh();

      //refresh token sql 업데이트
      //일단 냅둘게요 (아마 안쓸듯)
      // await promisePool.query(`
      //   UPDATE USER SET TOKEN = '${refreshToken}' WHERE NICKNAME = '${username}';
      // `);
      return {
        code: 200,
        message: '토큰이 발급되었습니다.',
        token: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      console.log(error.message);
      return {
        code: 401,
      };
    }
  },

  getReview: async (req) => {
    const reviewId = req.params.reviewId;
    try {
      const review = await REVIEW.findByPk(reviewId);
      const { TEXT, RATING } = review.dataValues;
      const keyword = await KEYWORD.findAll({
        where: { REVIEW_ID: reviewId },
      });
      const keyword_arr = [];
      keyword.forEach((key) => {
        keyword_arr.push(key.dataValues.KEYWORD);
      });
      return {
        rating: RATING,
        keyword: keyword_arr,
        detail: TEXT,
      };
    } catch (error) {
      console.log(error.message);
    }
  },
  postReview: async (req) => {
    const unum = req.decoded.unum;
    console.log(req.body.data);
    const data = JSON.parse(req.body.data);
    console.log('data', data);
    const { placeId, rating, detail, keyword } = data;
    try {
      const review = await REVIEW.create({
        UNO: unum,
        PLACE_ID: placeId,
        TEXT: detail,
        RATING: rating,
      });
      console.log('keyword', keyword);
      console.log('review', review);
      console.log('reviewId', review.REVIEW_ID);
      keyword.forEach(async (keyword) => {
        await KEYWORD.create({
          REVIEW_ID: review.REVIEW_ID,
          KEYWORD: keyword,
        });
      });
      return review;
    } catch (error) {
      console.log(error.message);
    }
  },
  postImage: async (req, db) => {
    try {
      const reviewId = db.REVIEW_ID;
      let categoryDb = 0; //review 참조
      if (typeof reviewId === undefined) {
        const communityId = db.PNO;
        categoryDb = 1; // community(Post) 참조
      }
      req.files.map(async (data) => {
        let path = data.path;
        try {
          if (categoryDb === 0) {
            await IMAGE.create({
              REVIEW_ID: reviewId,
              PATH: path,
            });
          }
        } catch (error) {
          console.log(error.message);
        }
      });
      return true;
    } catch (error) {
      console.log(error.message);
    }
  },
  getImageId: async (reviewId) => {
    const idArr = [];
    try {
      const images = await IMAGE.findAll({
        where: {
          REVIEW_ID: reviewId,
        },
      });
      images.forEach((img) => {
        idArr.push(img.IMAGE_ID);
      });
      return idArr;
    } catch (error) {
      console.log(error.message);
    }
  },
  changeReview: async (req) => {
    const unum = req.decoded.unum;
    console.log(unum);
    const data = JSON.parse(req.body.data);
    const reviewId = req.params.reviewId;
    const review = await REVIEW.findByPk(reviewId);
    if (review.UNO === req.user.UNO) {
      console.log('권한 확인');
    } else {
      throw new Error('no authorization to modify review');
    }
    if (review !== null) {
      try {
        await REVIEW.update(
          {
            RATING: data.rating,
            TEXT: data.detail,
          },
          { where: { REVIEW_ID: reviewId } }
        );
        await KEYWORD.destroy({
          where: {
            REVIEW_ID: reviewId,
          },
        });
        data.keyword.forEach(async (key) => {
          await KEYWORD.create({
            REVIEW_ID: reviewId,
            KEYWORD: key,
          });
        });
      } catch (error) {
        console.log(error.message);
      }
      return review;
    } else {
      console.log('There is no review of URI parameter reviewId');
    }
    // const { rating, detail, keyword } = data;
  },
  deleteReview: async (req) => {
    const unum = req.decoded.unum;
    console.log(unum);
    const reviewId = req.params.reviewId;
    const review = await REVIEW.findByPk(reviewId);
    if (review.UNO === req.user.UNO) {
      console.log('권한 확인');
    } else {
      throw new Error('no authorization to modify review');
    }
    if (review !== null) {
      try {
        await REVIEW.destroy({ where: { REVIEW_ID: reviewId } });
        await KEYWORD.destroy({
          where: {
            REVIEW_ID: reviewId,
          },
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  deleteImage: async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const images = await IMAGE.findAll({
      where: {
        REVIEW_ID: reviewId,
      },
    });
    images.forEach((img) => {
      fs.unlink(img.PATH, (err) => {
        if (err) throw err;
        console.log('delete success');
      });
    });
    await IMAGE.destroy({
      where: {
        REVIEW_ID: reviewId,
      },
    });
    return next();
  },
  getImagePath: async (imageId) => {
    try {
      const image = await IMAGE.findByPk(imageId);
      return image.PATH;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default sql;
