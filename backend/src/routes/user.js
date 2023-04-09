import express from "express";
import sql from "../database/sql";
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
router.post("/login", async (req, res) => {
  try {
    const nickname = await sql.loginUser(req);
    if (nickname.length === 0) {
      throw new Error();
    }
    res.status(200).send({
      success: true,
      nickname: nickname[0]["NICKNAME"],
    });
  } catch (error) {
    res.send({ success: false });
  }
});
export default router;
