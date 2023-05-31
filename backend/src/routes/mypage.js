'use strict';

import express from 'express';
import { db } from '../models';
import checkAccess from '../middleware/checkAccessToken';
import { logger } from '../../winston/winston';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/recipes/:page', checkAccess, async (req, res) => {
  try {
    const limit = 10;
    const page = Number(req.params.page);
    const offset = limit * (page - 1);
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
              required: false,
            },
          ],
        },
      ],
      offset,
      limit,
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

    return res.status(200).json({
      success: true,
      message: 'Mypage recipes get 성공',
      count: list.length,
      list,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'Mypage recipes get 실패', error });
  }
});

router.get('/posts/:page', checkAccess, async (req, res) => {
  try {
    const unit = 10;
    const page = Number(req.params.page);
    const offset = unit * (page - 1);
    const limit = unit;
    let list = [];
    const posts = await db.POST.findAll({
      where: { UNO: req.user.UNO },
      offset,
      limit,
    });
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const postImage = await db.IMAGE_COMMUNITY.findAll({
        where: {
          PNO: post.PNO,
        },
      });
      // console.log(postImage);
      const images = postImage.map((x) => x.IMAGE_ID);
      // console.log(images);
      const isUserLiked = await db.POST_LIKE.count({
        where: {
          UNO: req.user.UNO,
          PNO: post.PNO,
        },
      });
      console.log(isUserLiked);
      let temp = {
        postId: post.PNO,
        images,
        category: post.CATEGORY,
        title: post.TITLE,
        cocktailLike: post.LIKE,
        isUserLiked,
        content: post.CONTENT,
        cocktailId: post.CNO,
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
    return res.status(200).json({
      success: true,
      message: 'Mypage posts get 성공',
      count: list.length,
      list,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'Mypage posts get 실패', error });
  }
});

router.get('/replies/:page', checkAccess, async (req, res) => {
  try {
    const unit = 10;
    const page = Number(req.params.page);
    const offset = unit * (page - 1);
    const limit = unit;
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
      offset,
      limit,
    });
    for (let i = 0; i < replies.length; i++) {
      const reply = replies[i];
      let temp = {
        replyId: reply.PRNO,
        postId: reply.PNO,
        content: reply.CONTENT,
        title: reply.PNO_POST.TITLE,
        date: reply.createdAt,
      };
      // console.log(reply);
      console.log(temp);
      list.push(temp);
    }
    return res.status(200).json({
      success: true,
      message: 'Mypage replies get 성공',
      count: list.length,
      list,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'Mypage replies get 실패', error });
  }
});

router.get('/reviews/:page', checkAccess, async (req, res) => {
  try {
    const unit = 10;
    const page = Number(req.params.page);
    const offset = unit * (page - 1);
    const limit = unit;
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
        // {
        //   model: db.KEYWORD,
        //   as: 'KEYWORDs',
        //   attributes: ['KEYWORD'],
        //   required: false,
        // },
      ],
      offset,
      limit,
    });
    // console.log(reviews);
    let keyword = [];
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      const keywords = await db.KEYWORD.findAll({
        where: {
          REVIEW_ID: review.REVIEW_ID,
        },
      });
      // console.log(keywords);
      keyword = keywords.map((x) => x.KEYWORD);
      // for (let j = 0; j < keywords.length; j++) {
      //   keyword.push(keywords[j].KEYWORD);
      // }
      console.log(keyword);
      let temp = {
        placeId: review.PLACE_ID,
        reviewId: review.REVIEW_ID,
        placeName: review.PLACE.NAME,
        text: review.TEXT,
        keyword: keyword,
      };
      // console.log(review);
      console.log(temp);
      list.push(temp);
    }
    return res.status(200).json({
      success: true,
      message: 'Mypage reviews get 성공',
      count: list.length,
      list,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'Mypage reviews get 실패', error });
  }
});

export default router;
