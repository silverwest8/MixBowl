import mysql from "mysql2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as jwt_module from "../routes/jwt/jwt-util";
dotenv.config(); //JWT 키불러오기

// pool 을 사용한 이유 -> Connection 계속 유지하므로 부하 적어짐. (병렬 처리 가능)
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: "3.34.97.140",
    user: "mixbowl",
    database: "Mixbowl",
    password: "swe302841",
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
  getToken: async (username) => {
    const reToken = await promisePool.query(`
      SELECT TOKEN FROM USER WHERE '${username}' = NICKNAME;
    `);
    return reToken;
  },

  namedupcheck: async (req) => {
    const { checkname } = req.body;
    try {
      const check = await promisePool.query(`
        SELECT COUNT(*) AS 'CHECK' FROM USER WHERE '${checkname}' = NICKNAME;
      `);
      return check;
    } catch (error) {
      console.log(error.message);
    }
  },

  emaildupcheck: async (req) => {
    const { checkemail } = req.body;
    try {
      const check = await promisePool.query(`
        SELECT COUNT(*) AS 'CHECK' FROM USER WHERE '${checkemail}' = EMAIL;
      `);
      return check;
    } catch (error) {
      console.log(error.message);
    }
  },
  signupUser: async (req) => {
    const { nickname, email, password } = req.body; //regitserInfo에는 Nickname, Email, Password 가 포함되어야 함.
    //-- 토큰 빠져 있음 -> 임의 추가 했어요. + ORM으로 바꾸어도 상관없어요
    console.log(nickname, email, password);
    try {
      await promisePool.query(`
        INSERT INTO Mixbowl.USER (NICKNAME, EMAIL, PASSWORD, LEVEL, TOKEN) 
        VALUES ('${nickname}', '${email}', '${password}', 1, 'tsetestestes');
      `);
    } catch (error) {
      console.log(error.message);
    }
  },

  loginUser: async (req) => {
    const { nickname, password } = req.body;
    try {
      const [username] = await promisePool.query(`
      SELECT NICKNAME FROM Mixbowl.USER WHERE '${nickname}' = NICKNAME AND '${password}' = PASSWORD ;
      `);
      console.log("in sql", username);
      const accessToken = await jwt_module.sign(username[0]["NICKNAME"]);
      const refreshToken = await jwt_module.refresh();

      //refresh token sql 업데이트
      await promisePool.query(`
        UPDATE USER SET TOKEN = '${refreshToken}' WHERE NICKNAME = '${nickname}';
      `);
      return {
        code: 200,
        message: "토큰이 발급되었습니다.",
        token: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default sql;
