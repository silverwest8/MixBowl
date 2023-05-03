'use strict';

import express from 'express';
import sql from '../database/sql';
import checkAccess from '../middleware/checkAccessToken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
//회원 정보 수정
router.put('/', checkAccess, async (req, res) => {
  res.send('mypage');
});

export default router;
