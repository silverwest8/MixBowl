import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as jwt_module from '../routes/jwt/jwt-util';
import USER from '../models/USER';
import REVIEW from '../models/REVIEW';
import IMAGE from '../models/IMAGE';
dotenv.config(); //JWT 키불러오기

// pool 을 사용한 이유 -> Connection 계속 유지하므로 부하 적어짐. (병렬 처리 가능)
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: '3.34.97.140',
    user: 'mixbowl',
    database: 'Mixbowl',
    password: 'swe302841',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
);
const promisePool = pool.promise();

const sql = {
  getUser: async () => {
    const [rows] = await promisePool.query(`
      SELECT * FROM USER
    `);
    return rows;
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
        where: { NICKNAME: `${checkname}` },
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
        where: { EMAIL: `${checkemail}` },
      });

      return check['count'];
    } catch (error) {
      console.log(error.message);
    }
  },
  signupUser: async (req) => {
    const { nickname, email, password } = req.body; //regitserInfo에는 Nickname, Email, Password 가 포함되어야 함.
    console.log(nickname, email, password);
    try {
      await USER.create({
        NICKNAME: `${nickname}`,
        PASSWORD: `${password}`,
        EMAIL: `${email}`,
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
      const { dataValues } = await USER.findOne({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        where: { email: `${email}`, password: `${password}` },
      });
      const unum = dataValues['UNO'];
      if (!(unum > 0)) {
        throw new Error('Invalid Info User');
      }

      //UNO 도 같이 포함
      const accessToken = await jwt_module.sign(unum);
      const refreshToken = await jwt_module.refresh();

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
  postReview: async (req) => {
    const unum = req.decoded.unum;
    const { ratings, keyword, detail } = req.body;
    try {
      const review = REVIEW.create({
        UNO: `${unum}`,
        PLACE_ID: `${req.params.placeId}`,
        TEXT: `${detail}`,
        RATINGS: `${ratings}`,
      });
      return review;
    } catch (error) {
      console.log(error.message);
    }
  },
  postImage: async (req, review) => {
    try {
      const reviewId = review.REVIEW_ID;
      req.files.map(async (data) => {
        let path = data.path;
        IMAGE.create({
          REVIEW_ID: `${reviewId}`,
          PATH: `${path}`,
        });
        return true;
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default sql;
