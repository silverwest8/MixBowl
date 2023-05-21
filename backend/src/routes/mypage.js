'use strict';

import express from 'express';
import { db } from '../models';
import checkAccess from '../middleware/checkAccessToken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/recipes', checkAccess, async (req, res) => {
  try {
    let list = [];
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
      list.push(temp);
      // console.log(like[i].CNO_COCKTAIL);
    }

    return res
      .status(200)
      .json({ success: true, message: 'Mypage recipes get 성공', list });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Mypage recipes get 실패', error });
  }
});

router.get('/posts', checkAccess, async (req, res) => {
  try {
    let list = [];
    const posts = await db.POST.findAll({
      where: { UNO: req.user.UNO },
    });
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      let temp = {
        postId: post.PNO,
        category: post.CATEGORY,
        title: post.TITLE,
        content: post.CONTENT,
        like: await db.POST_LIKE.count({
          where: {
            PNO: post.PNO,
          },
        }),
        reply: await db.POST_REPLY.count({
          where: {
            PNO: post.PNO,
          },
        }),
        date: post.createdAt,
      };
      // console.log(post);
      console.log(temp);
      list.push(temp);
    }
    return res
      .status(200)
      .json({ success: true, message: 'Mypage posts get 성공', list });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Mypage posts get 실패', error });
  }
});

router.get('/replies', checkAccess, async (req, res) => {
  try {
    let list = [];
    const replies = await db.POST_REPLY.findAll({
      where: { UNO: req.user.UNO },
      include: [
        {
          model: db.POST,
          as: 'PNO_POST',
          attributes: ['TITLE'],
          required: false,
        },
      ],
    });
    for (let i = 0; i < replies.length; i++) {
      const reply = replies[i];
      let temp = {
        content: reply.CONTENT,
        title: reply.PNO_POST.TITLE,
        date: reply.createdAt,
      };
      // console.log(reply);
      console.log(temp);
      list.push(temp);
    }
    return res
      .status(200)
      .json({ success: true, message: 'Mypage replies get 성공', list });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Mypage replies get 실패', error });
  }
});

router.get('/reviews', checkAccess, async (req, res) => {
  try {
    let list = [];
    const reviews = await db.REVIEW.findAll({
      where: { UNO: req.user.UNO },
      include: [
        {
          model: db.PLACE,
          as: 'PLACE',
          attributes: ['NAME'],
          required: false,
        },
        {
          model: db.KEYWORD,
          as: 'KEYWORDs',
          attributes: ['KEYWORD'],
          required: false,
        },
      ],
    });

    let keyword = [];
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      for (let j = 0; j < review.KEYWORDs.length; j++) {
        keyword.push(review.KEYWORDs[j].KEYWORD);
      }
      let temp = {
        text: review.TEXT,
        place: review.PLACE.NAME,
        keyword: keyword,
      };
      // console.log(review);
      console.log(temp);
      list.push(temp);
    }
    return res
      .status(200)
      .json({ success: true, message: 'Mypage reviews get 성공', list });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Mypage reviews get 실패', error });
  }
});

export default router;
