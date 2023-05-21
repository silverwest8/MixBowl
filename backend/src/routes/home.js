'use strict';

import express from 'express';
import { db } from '../models';
const router = express.Router();

router.get('/questions', async (req, res) => {
  try {
    let list = [];
    return res.status(200).json({
      success: true,
      message: 'Home question get 성공',
      count: list.length,
      list,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Home question get 실패', error });
  }
});

router.get('/cocktail', async (req, res) => {
  try {
    let list = [];
    return res.status(200).json({
      success: true,
      message: 'Home cocktail get 성공',
      count: list.length,
      list,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Home cocktail get 실패', error });
  }
});

router.get('/bar', async (req, res) => {
  try {
    let list = [];
    return res.status(200).json({
      success: true,
      message: 'Home bar get 성공',
      count: list.length,
      list,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Home bar get 실패', error });
  }
});

router.get('/community', async (req, res) => {
  try {
    let list = [];
    return res.status(200).json({
      success: true,
      message: 'Home community get 성공',
      count: list.length,
      list,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Home community get 실패', error });
  }
});

export default router;
