import express from "express";
import sql from "../database/sql";
import checkAccess from "./middleware/checkAccessToken";
import checkRefresh from "./middleware/checkRefreshToken";
import { refresh_new } from "./jwt/jwt-util";
const router = express.Router();

//---- 연동확인
router.get("/", async (req, res) => {
  const users = await sql.getUser();
  console.log(users);
  res.send(users);
});

//------- 회원가입---------//

//닉네임 중복 체크
router.post("/nicknamedupcheck", async (req, res) => {
  try {
    const [check] = await sql.namedupcheck(req);
    const check_valid = check[0]["CHECK"];
    if (check_valid === 1) {
      return res.send({ success: false });
    } else {
      return res.send({ success: true });
    }
  } catch (error) {
    res.send("error on nicknamedupcheck");
  }
});

router.post("/emaildupcheck", async (req, res) => {
  try {
    const [check] = await sql.emaildupcheck(req);
    const check_valid = check[0]["CHECK"];
    if (check_valid === 1) {
      return res.send({ success: false });
    } else {
      return res.send({ success: true });
    }
  } catch (error) {
    res.send("error on emaildupcheck");
  }
});
//회원 가입
router.post("/signup", async (req, res) => {
  try {
    await sql.signupUser(req);
    res.status(200).send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

// 로그인
/**
 * @swagger
 * paths:
 *   /user/login:
 *     post:
 *       tags:
 *         - user
 *       summary: Logs user into the system
 *       description: ''
 *       operationId: loginUser
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Res'
 *         '400':
 *           description: Invalid username/password supplied
 */
router.post("/login", async (req, res) => {
  try {
    const tokens = await sql.loginUser(req, res);
    if (tokens.code !== 200) {
      throw new Error();
    }
    const { email } = req.body;
    //이메일 유효성 검사 함수 정의 필요
    if (email.length === 0) {
      throw new Error();
    }
    return res.status(200).send({
      success: true,
      // nickname: nickname[0]["NICKNAME"],
      tokens,
    });
  } catch (error) {
    return res.send({ success: false });
  }
});

//로그아웃
/**
 * @swagger
 * /user/logout:
 * get:
 *   tags:
 *     - user
 *   summary: Logs out current logged in user session
 *   description: ''
 *   operationId: logoutUser
 *   parameters:
 *     - in: cookie
 *       name: token
 *       schema:
 *         $ref: '#/components/schemas/Cookie'
 *         
 *   responses:
 *     '200':
 *       description: successful operation
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Res'
 *     '400':
 *       description: Something wrong
 */
router.post("/logout", async (req, res) => {
  const tokens = await sql.loginUser(req, res);
  try {
    const { nickname } = req.body;
    if (nickname.length === 0) {
      throw new Error();
    }
    return res.status(200).send({
      success: true,
      // nickname: nickname[0]["NICKNAME"],
      tokens,
    });
  } catch (error) {
    return res.send({ success: false });
  }
});

// 토큰 재발급 라우터
router.get("/refresh", refresh_new);

// JWT access 토큰 체크 라우터 (디버깅용)
router.get("/check/access", checkAccess, (req, res) => {
  console.log(req.decoded);
  const nickname = req.decoded.nickname;
  return res.status(200).json({
    code: 200,
    message: "유효한 토큰입니다.",
    data: {
      nickname: nickname,
    },
  });
});

export default router;
>>>>>>> e6cc631ba3beec2650b73c8273d8205b0a50456a
