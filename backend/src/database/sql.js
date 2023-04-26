import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as jwt_module from '../routes/jwt/jwt-util';
import USER from '../models/USER';
dotenv.config(); //JWT 키불러오기

const sql = {
  getUser: async () => {
    const user = await USER.findAll();
    return user;
  },

  //refresh token 조회
  //안쓸듯
  getToken: async username => {
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

  signupUser: async req => {
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
};

export default sql;
