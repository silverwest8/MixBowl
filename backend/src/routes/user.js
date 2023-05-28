'use strict';

import express from 'express';
import sql from '../database/sql';
import userUtil from '../middleware/user';
import checkAccess from '../middleware/checkAccessToken';
import { refresh_new } from './jwt/jwt-util';
import dotenv from 'dotenv';
import * as validation from '../validation/user';
import { db } from '../models';
import nodemailer from 'nodemailer';
import axios from 'axios';
import iconv from 'iconv-lite';
import * as cheerio from 'cheerio';
dotenv.config();

const router = express.Router();
const smtpTransport = nodemailer.createTransport({
  service: 'naver',
  host: 'smtp.naver.com', // SMTP 서버명
  port: 465, // SMTP 포트
  auth: {
    user: process.env.NODEMAILER_USER, // 네이버 아이디
    pass: process.env.NODEMAILER_PASS, // 네이버 비밀번호
  },
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const tokens = await sql.loginUser(req, res);
    if (tokens.code !== 200) {
      throw new Error();
    }
    const { email } = req.body;
    if (validation.checkEmail(email) === false) {
      throw new Error();
    }
    return res.status(200).send({
      success: true,
      // nickname: nickname[0]["NICKNAME"],
      tokens,
    });
  } catch (error) {
    return res.status(400).send({ success: false });
  }
});

// 토큰 재발급 라우터
router.get('/refresh', refresh_new);

//로그아웃
router.get('/logout'); //브라우저 쿠키 삭제

//회원 가입
router.post('/signup', userUtil.signUp);

//닉네임 중복 체크
router.put('/nicknamedupcheck', async (req, res) => {
  try {
    const count = await sql.namedupcheck(req);
    if (count !== 0) {
      return res
        .status(200)
        .send({ success: true, duplicate: true, message: '닉네임 중복' });
    } else {
      return res
        .status(200)
        .send({ success: true, duplicate: false, message: '닉네임 사용 가능' });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: 'error on nicknamedupcheck', error });
  }
});

//이메일 중복 체크
router.put('/emaildupcheck', async (req, res) => {
  try {
    const count = await sql.emaildupcheck(req);
    if (count !== 0 || !validation.checkEmail(req.body['checkemail'])) {
      return res.status(409).send({ success: false });
    } else {
      return res.send({ success: true });
    }
  } catch (error) {
    res.send('error on emaildupcheck');
  }
});

// 이메일 인증메일 보내기
router.post('/sendauthmail', async (req, res) => {
  try {
    const authNum = Math.random().toString().slice(2, 7);
    await db.AUTH_CODE.create({ EMAIL: req.body.email, AUTH_CODE: authNum });

    //인증번호 보내기
    const mailOptions = {
      from: 'Cocktell <cocktell@naver.com>',
      to: req.body.email,
      subject: 'Cocktell 이메일 인증',
      text: `아래 인증번호를 확인하여 이메일 주소 인증을 완료해 주세요.\n
      인증번호 [ ${authNum} ]`,
    };
    smtpTransport.sendMail(mailOptions, (error, responses) => {
      if (error) {
        return res.status(400).json({
          sucess: false,
          message: '인증번호메일 발송 실패',
          error,
        });
      }
      smtpTransport.close();
      return res.json({ success: true, message: '인증메일이 발송되었습니다.' });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: '인증번호메일 발송에 실패하였습니다.',
      error,
    });
  }
});

//인증번호 확인
router.put('/checkauth', async (req, res) => {
  try {
    const check = await db.AUTH_CODE.findOne({
      where: { EMAIL: req.body.email },
      order: [['createdAt', 'DESC']],
    });
    console.log(check);
    if (!check) {
      return res
        .status(200)
        .json({ success: false, message: '이메일 인증을 다시 시도해주세요.' });
    } else if (check.AUTH_CODE === req.body.code) {
      return res
        .status(200)
        .json({ success: true, message: '이메일 인증에 성공하였습니다.' });
    } else {
      return res
        .status(200)
        .json({ success: false, message: '인증번호가 틀렸습니다.' });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: '이메일 인증에 실패하였습니다.',
      error,
    });
  }
});

// bar owner 인증
router.put('/checkbarowner', checkAccess, async (req, res) => {
  try {
    const barOwner = true;
    if (barOwner) {
      req.user.update({ LEVEL: 4 });
    }
    return res
      .status(200)
      .json({ success: true, baronnwer: true, message: '사장님 인증 성공' });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '사장님 인증 실패', error });
  }
});

// bartender 인증
router.put('/checkbartender', checkAccess, async (req, res) => {
  try {
    const name = req.body.name; //
    const encoded = iconv.encode(name, 'euc-kr');
    let encodedName = '';
    for (var i = 0; i < encoded.length; i++) {
      encodedName += '%' + encoded[i].toString('16');
    }
    console.log(encoded);
    console.log(encodedName.toUpperCase());
    const response = await axios.get(
      `https://www.q-net.or.kr/qlf006.do?hgulNm=${encodedName}`, // 이름 인코딩
      {
        params: {
          id: 'qlf00601s01',
          gSite: 'Q',
          gId: '',
          resdNo1: req.body.birth, //생년월일
          lcsNo: req.body.qualification, // 자격증번호
          qualExpDt: req.body.issueDate, // 발급(등록)연월일
          lcsMngNo: req.body.lcsMngNo, // 자격증내지번호
        },
        responseType: 'arraybuffer',
      }
    );
    const contentType = response.headers['content-type'];
    const charset = contentType.includes('charset=')
      ? contentType.split('charset=')[1]
      : 'UTF-8';
    const content = iconv.decode(response.data, charset).trim();

    const $ = cheerio.load(content);
    console.log(charset);
    console.log(content);
    console.log($('.ff_zh').text());
    console.log($('.fc_r').text());
    let bartender = false;
    if ($('.ff_zh').text()) {
      bartender = true;
      if (bartender) {
        req.user.update({ LEVEL: 5 });
      }
      return res.status(200).json({
        success: true,
        bartender,
        message: '바텐더 인증에 성공하였습니다',
      });
    } else {
      return res.status(200).json({
        success: true,
        bartender,
        message: '바텐더 인증을 다시 시도해주세요',
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: '바텐더 인증 실패', error });
  }
});

// 회원 정보 조회
router.get('/', checkAccess, async (req, res) => {
  try {
    console.log(req.user);
    return res
      .status(200)
      .json({ success: true, message: '회원 정보 조회 성공', data: req.user });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '회원 정보 조회 실패', error });
  }
});

//회원 정보 수정
router.put('/', checkAccess, async (req, res) => {
  try {
    const newNickname = req.body.nickname;
    req.user.update({ NICKNAME: newNickname });
    return res.status(200).json({ success: true, message: '닉네임 수정 성공' });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '닉네임 수정 실패', error });
  }
});

//회원 탈퇴
router.delete('/', checkAccess, userUtil.delUser);

// JWT access 토큰 체크 라우터 (디버깅용)
router.get('/check/access', checkAccess, (req, res) => {
  console.log(req.user);
  const uno = req.decoded.unum;
  return res.status(200).json({
    code: 200,
    message: '유효한 토큰입니다.',
    data: {
      uno: uno,
    },
  });
});

export default router;
