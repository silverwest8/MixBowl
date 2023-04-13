'use strict';

import express from 'express';
import sql from '../database/sql';
import checkAccess from '../middleware/checkAccessToken';
import checkRefresh from '../middleware/checkRefreshToken';
import { refresh_new } from './jwt/jwt-util';
import USER from '../models/USER';
const router = express.Router();

//---- 연동확인
router.get('/', async (req, res) => {
  const users = await sql.getUser();
  console.log(users);
  res.send(users);
});

// 로그인
router.post('/login', async (req, res) => {
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
router.post('/logout', async (req, res) => {
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

//------- 회원가입---------//

//회원 가입
router.post('/signup', async (req, res) => {
  try {
    await sql.signupUser(req);
    res.status(200).send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

//닉네임 중복 체크
router.put('/nicknamedupcheck', async (req, res) => {
  try {
    const [check] = await sql.namedupcheck(req);
    const check_valid = check[0]['CHECK'];
    if (check_valid === 1) {
      return res.send({ success: false });
    } else {
      return res.send({ success: true });
    }
  } catch (error) {
    res.send('error on nicknamedupcheck');
  }
});

//이메일 중복 체크
router.put('/emaildupcheck', async (req, res) => {
  try {
    const [check] = await sql.emaildupcheck(req);
    const check_valid = check[0]['CHECK'];
    if (check_valid === 1) {
      return res.send({ success: false });
    } else {
      return res.send({ success: true });
    }
  } catch (error) {
    res.send('error on emaildupcheck');
  }
});

// 이메일 인증메일 보내기
router.post('/sendauthmail', async (req, res) => {
  //   try {
  //   const authNum = Math.random().toString().slice(2, 7);
  //   const code = await AUTH_CODE.findOne({ where: { EMAIL: req.body.email } });
  //   if (!code) {
  //     await AUTH_CODE.create({ EMAIL: req.body.email, CODE: authNum });
  //   } else {
  //     await AUTH_CODE.update({ CODE: authNum }, { where: { EMAIL: req.body.email } });
  //   }
  //   //인증번호 보내기
  //   let emailTemplete;
  //   let path = __dirname;
  //   path = path.replace("/router", "/template/emailAuthTemplate.ejs");
  //   ejs.renderFile(path, { authCode: authNum }, (err, data) => {
  //     if (err) {
  //       return res.json({ sucess: false, message: "인증메일 발송에 실패하였습니다.", err });
  //     }
  //     emailTemplete = data;
  //   });
  //   const mailOptions = {
  //     from: "스무슬리 <smoosly23@gmail.com>",
  //     to: req.body.email,
  //     subject: "Smoosly 이메일 인증",
  //     html: emailTemplete,
  //   };
  //   smtpTransport.sendMail(mailOptions, (err, responses) => {
  //     if (err) {
  //       return res.json({ sucess: false, message: "인증메일 발송에 실패하였습니다.", err });
  //     }
  //     smtpTransport.close();
  //     return res.json({ success: true, message: "인증메일이 발송되었습니다." });
  //   });
  // } catch (err) {
  //   return res.json({ success: false, message: "인증메일 발송에 실패하였습니다.", err });
  // }

  // setTimeout(async () => {
  //   await AUTH_CODE.destroy({ where: { EMAIL: req.body.email } });
  // }, 180000); //3분 후에는 인증 불가
});

//인증번호 확인
router.put('/checkauth', async (req, res) => {
  // const check = await AUTH_CODE.findOne({ where: { EMAIL: req.body.email } });
  // if (!check) {
  //   return res.json({ success: false, message: "이메일 인증을 다시 시도해주세요." });
  // }
  // if (check.CODE === req.body.authNum) {
  //   await AUTH_CODE.destroy({ where: { EMAIL: req.body.email } });
  //   return res.json({ success: true, message: "이메일 인증에 성공하였습니다." });
  // }
  // res.json({ success: false, message: "인증번호가 틀렸습니다." });
});

//회원 정보 수정
router.put('/update', checkAccess, async (req, res) => {
  try {
    const newNickname = req.body.nickname;
    console.log(newNickname);
    console.log(req.user);
    req.user.update({ NICKNAME: newNickname });
    return res.status(200).json({ success: true, message: '닉네임 수정 성공' });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '닉네임 수정 실패', error });
  }
});

// bar owner 인증
router.put('/checkbarowner', checkAccess, async (req, res) => {
  try {
    const barOwner = true;
    if (barOwner) {
      req.user.update({ LEVEL: 4 });
    }
    return res.status(200).json({ success: true, message: '사장님 인증 성공' });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '사장님 인증 실패', error });
  }
});

// bartender 인증
router.put('/checkbartender', checkAccess, async (req, res) => {
  try {
    const bartender = true;
    if (bartender) {
      req.user.update({ LEVEL: 5 });
    }
    return res.status(200).json({ success: true, message: '바텐더 인증 성공' });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '바텐더 인증 실패', error });
  }
});

//회원 탈퇴
router.delete('/delete', checkAccess, async (req, res) => {
  try {
    req.user.destroy();
    return res.status(200).json({ success: true, message: '회원 탈퇴 성공' });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '회원 탈퇴 실패', error });
  }
});

// 토큰 재발급 라우터
router.get('/refresh', refresh_new);

// JWT access 토큰 체크 라우터 (디버깅용)
router.get('/check/access', checkAccess, (req, res) => {
  console.log(req.decoded);
  const nickname = req.decoded.nickname;
  return res.status(200).json({
    code: 200,
    message: '유효한 토큰입니다.',
    data: {
      nickname: nickname,
    },
  });
});

export default router;
