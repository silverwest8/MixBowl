'use strict';

import express from 'express';
import dotenv from 'dotenv';
import { sql } from '../models';
import checkAccess from '../middleware/checkAccessToken';
import multer from 'multer';
import fs from 'fs';
dotenv.config();

const router = express.Router();

export default router;

// 파일 업로드를 위해 사용되는 multipart/form-data 를 front에서 사용할것

//multer 미들웨어 파일 제한 값 (Doc 공격으로부터 서버를 보호하는데 도움이 된다.)
const limits = {
  fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 5, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};
const fileFilter = (req, file, callback) => {
  const typeArray = file.originalname.split('.');
  const fileType = typeArray[typeArray.length - 1]; // 이미지 확장자 추출
  //이미지 확장자 구분 검사
  if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
    callback(null, true);
  } else {
    return callback(
      { message: '*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다.' },
      false
    );
  }
};
//multer 미들웨어 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 파일이 업로드되는 경로 지정
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // 파일 이름 설정
  },
});
const upload = multer({
  storage: storage,
  dest: __dirname + '/uploads/', // 이미지 업로드 경로
  limits: limits, // 이미지 업로드 제한 설정
  fileFilter: fileFilter, // 이미지 업로드 필터링 설정
});
