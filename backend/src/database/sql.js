import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as jwt_module from '../routes/jwt/jwt-util';
import USER from '../models/USER';
import REVIEW from '../models/REVIEW';
import IMAGE from '../models/IMAGE';
import KEYWORD from '../models/KEYWORD';
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

  namedupcheck: async req => {
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

  emaildupcheck: async req => {
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

  loginUser: async req => {
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
  postReview: async (req) => {
    const unum = req.decoded.unum;
    const req_json = JSON.parse(req.body.data);
    req.keyword = req_json.keyword; //postImage req에 keyword 정보 미리 처리
    console.log(req_json); //json형식으로 하면 바꿔질수있음, postman으로는 string취급됨
    const { rating, detail } = req_json;
    try {
      const review = REVIEW.create({
        UNO: unum,
        PLACE_ID: req.params.placeId,
        TEXT: detail,
        RATING: rating,
      });
      return review;
    } catch (error) {
      console.log(error.message);
    }
  },
  postImage: async (req, review) => {
    try {
      const keyword = req.keyword;
      const reviewId = review.REVIEW_ID;
      req.files.map(async (data) => {
        let path = data.path;
        try {
          IMAGE.create({
            REVIEW_ID: `${reviewId}`,
            PATH: `${path}`,
          });
        } catch (error) {
          console.log(error.message);
        }
      });
      console.log(keyword);
      const keyword_arr = keyword.split(',');
      keyword_arr.forEach((i) => {
        try {
          KEYWORD.create({
            REVIEW_ID: reviewId,
            KEYWORD: i,
          });
        } catch (error) {
          console.log(error.message);
        }
      });
      return true;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default sql;
