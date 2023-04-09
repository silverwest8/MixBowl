import mysql from "mysql2";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/authMiddleware";

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

  loginUser: async (req, res) => {
    const { nickname, password } = req.body;
    try {
      const [username] = await promisePool.query(`
      SELECT NICKNAME FROM Mixbowl.USER WHERE '${nickname}' = NICKNAME AND '${password}' = PASSWORD ;
      `);
      console.log(username);
      const token = jwt.sign(
        {
          type: "JWT",
          nickname: username,
        },
        SECRET_KEY,
        {
          expiresIn: "15m",
          issuer: "MixBowl",
        }
      );
      return res.status(200).json({
        code: 200,
        message: "토큰이 발급되었습니다.",
        token: token,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default sql;
