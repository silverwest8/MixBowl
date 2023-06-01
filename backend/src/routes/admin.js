'use strict';

import express from 'express';
import { db } from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import checkAdmin from '../middleware/checkAdmin';

dotenv.config();
const router = express.Router();

const REPORTS = [
  {
    id: 1,
    value: '부적절한 표현, 욕설 또는 혐오 표현',
  },
  {
    id: 2,
    value: '스팸 또는 사용자를 현혹하는 콘텐츠',
  },
  {
    id: 3,
    value: '유해하거나 위험한 컨텐츠',
  },
  {
    id: 4,
    value: '증오 또는 위험한 콘텐츠',
  },
];

router.get('/', checkAdmin, async (req, res) => {
  try {
    const data = await db.ADMIN.findAll();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await db.ADMIN.findOne({
      where: { email: email, password: password },
    });
    if (admin) {
      const payload = {
        type: 'JWT',
        unum: admin.UNO,
      };
      const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1d',
        issuer: 'MixBowl',
      });
      return res.status(200).json({ success: true, accessToken });
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

router.get('/report', checkAdmin, async (req, res) => {
  const type = req.query.type;
  try {
    if (type === 'recipe') {
      const reports = await db.COCKTAIL_REPORT.findAll({
        include: [
          {
            model: db.USER,
            as: 'UNO_USER',
            attributes: ['UNO', 'NICKNAME', 'EMAIL', 'LEVEL'],
            required: false,
          },
        ],
      });
      const data = [];
      for (let i = 0; i < reports.length; i++) {
        const report = REPORTS.find((item) => item.id === reports[i].REPORT);
        const cocktail = await db.COCKTAIL.findByPk(reports[i].CNO, {
          attributes: ['CNO', 'NAME'],
        });
        const index = data.findIndex((item) => item.id === cocktail.CNO);
        if (index === -1) {
          data.push({
            id: cocktail.CNO,
            title: cocktail.NAME,
            reports: [
              {
                value: report.value,
                user: {
                  id: reports[i].UNO,
                  nickname: reports[i].UNO_USER.NICKNAME,
                  email: reports[i].UNO_USER.EMAIL,
                  level: reports[i].UNO_USER.LEVEL,
                },
              },
            ],
          });
        } else {
          data[index].reports.push({
            value: report.value,
            user: {
              id: reports[i].UNO,
              nickname: reports[i].UNO_USER.NICKNAME,
              email: reports[i].UNO_USER.EMAIL,
              level: reports[i].UNO_USER.LEVEL,
            },
          });
        }
      }
      data.sort((a, b) => b.reports.length - a.reports.length);
      return res.status(200).json({ success: true, data });
    } else if (type === 'post') {
      const reports = await db.POST_REPORT.findAll({
        include: [
          {
            model: db.USER,
            as: 'UNO_USER',
            attributes: ['UNO', 'NICKNAME', 'EMAIL', 'LEVEL'],
            required: false,
          },
        ],
      });
      const data = [];
      for (let i = 0; i < reports.length; i++) {
        const report = REPORTS.find((item) => item.id === reports[i].REPORT);
        const post = await db.POST.findByPk(reports[i].PNO, {
          attributes: ['PNO', 'TITLE'],
        });
        const index = data.findIndex((item) => item.id === post.PNO);
        if (index === -1) {
          data.push({
            id: post.PNO,
            title: post.TITLE,
            reports: [
              {
                value: report.value,
                user: {
                  id: reports[i].UNO,
                  nickname: reports[i].UNO_USER.NICKNAME,
                  email: reports[i].UNO_USER.EMAIL,
                  level: reports[i].UNO_USER.LEVEL,
                },
              },
            ],
          });
        } else {
          data[index].reports.push({
            value: report.value,
            user: {
              id: reports[i].UNO,
              nickname: reports[i].UNO_USER.NICKNAME,
              email: reports[i].UNO_USER.EMAIL,
              level: reports[i].UNO_USER.LEVEL,
            },
          });
        }
      }
      data.sort((a, b) => b.reports.length - a.reports.length);
      return res.status(200).json({ success: true, data });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
});

export default router;
