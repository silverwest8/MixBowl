'use strict';

import express from 'express';
import { db, sequelize } from '../models';
import checkAccess from '../middleware/checkAccessToken';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const router = express.Router();

router.get('/recipes', checkAccess, async (req, res) => {
  try {
    let data = [];
    const like = await db.COCKTAIL_LIKE.findAll({
      where: { UNO: req.user.UNO },
      include: [
        {
          model: db.COCKTAIL,
          as: 'CNO_COCKTAIL',
          attributes: ['CNO', 'NAME'],
          required: false,
          include: [
            {
              model: db.USER,
              as: 'UNO_USER',
              attributes: ['NICKNAME', 'LEVEL'],
              require: false,
            },
          ],
        },
      ],
    });
    // console.log(like);
    for (let i = 0; i < like.length; i++) {
      const recipes = like[i].CNO_COCKTAIL;
      let temp = {
        cocktailId: recipes.CNO,
        name: recipes.NAME,
        like: await db.COCKTAIL_LIKE.count({
          where: {
            CNO: recipes.CNO,
          },
        }),
        USER: {
          nickname: recipes.UNO_USER.NICKNAME,
          level: recipes.UNO_USER.LEVEL,
        },
      };
      console.log(temp);
      data.push(temp)
      // console.log(like[i].CNO_COCKTAIL);
    }

    return res
      .status(200)
      .json({ success: true, message: 'Mypage recipes get 성공', data });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Mypage recipes get', error });
  }
});

router.get('/posts', checkAccess, async (req, res) => {
  try {
    let data = {
      name: '',
      color: [],
      ingred: [],
      instruction: '',
    };

    return res
      .status(200)
      .json({ success: true, message: 'Recipe get 성공', data });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Recipe get 실패', error });
  }
});

router.get('/replies', checkAccess, async (req, res) => {
  try {
    let data = {
      name: '',
      color: [],
      ingred: [],
      instruction: '',
    };

    return res
      .status(200)
      .json({ success: true, message: 'Recipe get 성공', data });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Recipe get 실패', error });
  }
});

router.get('/reviews', checkAccess, async (req, res) => {
  try {
    let data = {
      name: '',
      color: [],
      ingred: [],
      instruction: '',
    };

    return res
      .status(200)
      .json({ success: true, message: 'Recipe get 성공', data });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Recipe get 실패', error });
  }
});

export default router;
