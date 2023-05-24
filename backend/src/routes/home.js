'use strict';

import express from 'express';
import { db } from '../models';
import { Sequelize } from 'sequelize';
const router = express.Router();

router.get('/question', async (req, res) => {
  try {
    let list = [];
    const questions = await db.POST.findAll({
      where: {
        category: 2,
      },
      include: [
        {
          model: db.POST_REPLY,
          as: 'POST_REPLies',
          required: false,
        },
        {
          model: db.USER,
          as: 'UNO_USER',
          attributes: ['NICKNAME', 'LEVEL'],
          required: false,
        },
      ],
    });
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (question.POST_REPLies.length == 0) {
        let temp = {
          postId: question.PNO,
          content: question.CONTENT,
          date: question.createdAt,
          USER: {
            nickname: question.UNO_USER.NICKNAME,
            level: question.UNO_USER.LEVEL,
          },
        };
        list.push(temp);
      }
    }
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
    // 기준 불확실
    const cocktails = await db.COCKTAIL.findAll({
      where: {}, // 일주일 필터링 넣으면 아무것도 안보여서 보류
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('COCKTAIL_LIKEs.UNO')), 'COUNT'],
        ],
      },
      include: [
        {
          model: db.COCKTAIL_LIKE,
          as: 'COCKTAIL_LIKEs',
          attributes: [],
        },
        {
          model: db.USER,
          as: 'UNO_USER',
          required: false,
          attributes: ['NICKNAME'],
        },
      ],
      having: {
        COUNT: { [Sequelize.Op.gt]: 0 },
      },
      group: ['COCKTAIL.CNO'],
      order: [
        [Sequelize.literal('COUNT'), 'DESC'],
        ['createdAt', 'DESC'],
      ],
    });
    for (let i = 0; i < cocktails.length; i++) {
      const cocktail = cocktails[i];
      const content = await db.POST.findOne({
        where: {
          CATEGORY: 3,
          CNO: cocktail.CNO,
        },
        order: [['createdAt', 'DESC']],
      });
      let temp = {
        cocktailId: cocktail.CNO,
        cocktailName: cocktail.NAME,
        reviewContent: content ? content.CONTENT : null,
        like: await db.COCKTAIL_LIKE.count({
          where: {
            CNO: cocktail.CNO,
          },
        }),
        reply: await db.POST.count({
          where: {
            CATEGORY: 3,
            CNO: cocktail.CNO,
          },
        }),
        USER: {
          nickname: cocktail.UNO_USER.NICKNAME,
        },
      };
      list.push(temp);
    }
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
    const posts = await db.POST.findAll({
      where: {}, // 일주일 필터링 넣으면 아무것도 안보여서 보류
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('POST_LIKEs.UNO')), 'COUNT'],
        ],
      },
      include: [
        {
          model: db.POST_LIKE,
          as: 'POST_LIKEs',
          attributes: [],
        },
        {
          model: db.USER,
          as: 'UNO_USER',
          required: false,
          attributes: ['NICKNAME', 'LEVEL'],
        },
      ],
      having: {
        COUNT: { [Sequelize.Op.gt]: 0 },
      },
      group: ['POST.PNO'],
      order: [
        [Sequelize.literal('COUNT'), 'DESC'],
        ['createdAt', 'DESC'],
      ],
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
        USER: {
          nickname: post.UNO_USER.NICKNAME,
          level: post.UNO_USER.LEVEL,
        },
      };
      list.push(temp);
    }
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
