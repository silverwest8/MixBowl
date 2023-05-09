'use strict';

import express from 'express';
import { db } from '../models';
const router = express.Router();

router.get('/report', async (req, res) => {
    try {
      const data = await db.COCKTAIL_REPORT.findAll();
      return res
      .status(200)
      .json({ success: true, message: 'Cocktail detail get 성공', data });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, error });
    }
  });