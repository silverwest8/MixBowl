'use strict';

import express from 'express';
import axios from 'axios';
import API_cocktaildb from '../models/API_cocktaildb_en';
import dotenv from 'dotenv';
dotenv.config();

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
        console.log(data.drinks[i]);
        const recipe = await API_cocktaildb.findByPk(
          Number(data.drinks[i].idDrink)
        );
        await recipe.update(data.drinks[i]);
      }
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktaildb API 조회 실패', error });
  }
});

router.get('/testAPIsAll', async (req, res) => {
  try {
    for (
      let i = req.query.f.charCodeAt(0);
      i < req.query.f.charCodeAt(0) + 26;
      i++
    ) {
      const { data } = await axios.get(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php',
        {
          params: {
            f: String.fromCharCode(i),
          },
          headers: {
            Authorization: '1',
          },
        }
      );
      if (data.drinks != null) {
        for (let i = 0; i < data.drinks.length; i++) {
          console.log(data.drinks[i]);
          const recipe = await API_cocktaildb.findByPk(
            Number(data.drinks[i].idDrink)
          );
          await recipe.update(data.drinks[i]);
        }
      }
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
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
    data.count = data.drinks.length;
    res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cocktaildb API list 조회 실패',
      error,
    });
  }
});

router.get('/testAPIs/ninja', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.api-ninjas.com/v1/cocktail', {
      params: {
        [req.query.param]: req.query.content, // name or ingredients
      },
      headers: {
        'X-Api-Key': process.env.NINJA_API_Key,
      },
    });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktaildb API id 조회 실패', error });
  }
});

export default router;
