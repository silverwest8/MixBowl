'use strict';

import express from 'express';
import axios from 'axios';
import API_cocktaildb from '../models/API_cocktaildb';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('recipe');
});

router.get('/testAPIs', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php',
      {
        params: {
          f: req.query.f,
        },
        headers: {
          Authorization: '1',
        },
      }
    );
    if (data.drinks != null) {
      for (let i = 0; i < data.drinks.length; i++) {
        await API_cocktaildb.create(data.drinks[i]);
      }
    }
    res.status(200).json(data);
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: 'Cocktaildb API 조회 실패', error });
  }
});

router.get('/testAPIs/findById', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://www.thecocktaildb.com/api/json/v1/1/lookup.php',
      {
        params: {
          i: req.query.i,
        },
        headers: {
          Authorization: '1',
        },
      }
    );
    if (data.drinks != null) {
      await API_cocktaildb.findByPk(data.drinks[0].idDrink);
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktaildb API id 조회 실패', error });
  }
});

router.get('/testAPIs/getlist', async (req, res) => {
  // c=list categories
  // g=list glasses
  // i=list ingredients
  // a=list alcoholic
  try {
    const { data } = await axios.get(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php',
      {
        params: {
          [req.query.list]: 'list',
        },
        headers: {
          Authorization: '1',
        },
      }
    );
    res.status(200).json(data);
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: 'Cocktaildb API id 조회 실패', error });
  }
});

export default router;
