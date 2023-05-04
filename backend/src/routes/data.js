'use strict';

import express from 'express';
import axios from 'axios';
import { db } from '../models';
import checkAccess from '../middleware/checkAccessToken';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import ninjaset from '../models/ninjaset';
dotenv.config();
const router = express.Router();

router.get('/cocktaildb', async (req, res) => {
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
        const recipe = await db.API_cocktaildb_en.findByPk(
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
          const recipe = await db.API_cocktaildb_en.findByPk(
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

router.get('/cocktaildb/findById', async (req, res) => {
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
      await db.API_cocktaildb_en.findByPk(data.drinks[0].idDrink);
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktaildb API id 조회 실패', error });
  }
});

router.get('/ninja', async (req, res) => {
  try {
    const ingredient = await db.INGREDIENT.findAll();
    for (let i = 0; i < ingredient.length; i++) {
      const { data } = await axios.get(
        'https://api.api-ninjas.com/v1/cocktail',
        {
          params: {
            // [req.query.param]: req.query.content, // name or ingredients
            ingredients: ingredient[i].NAME,
          },
          headers: {
            'X-Api-Key': process.env.NINJA_API_KEY,
          },
        }
      );
      console.log(data.length);
      for (let j = 0; j < data.length; j++) {
        const [row, created] = await db.API_ninja_en.findOrCreate({
          where: { NAME: data[j].name },
        });
        row.update({
          INSTRUCTION: data[j].instructions,
          INGREDIENT1: data[j].ingredients[0],
          INGREDIENT2: data[j].ingredients[1],
          INGREDIENT3: data[j].ingredients[2],
          INGREDIENT4: data[j].ingredients[3],
          INGREDIENT5: data[j].ingredients[4],
          INGREDIENT6: data[j].ingredients[5],
          INGREDIENT7: data[j].ingredients[6],
          INGREDIENT8: data[j].ingredients[7],
          INGREDIENT9: data[j].ingredients[8],
          INGREDIENT10: data[j].ingredients[9],
        });
      }
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Ninja API id 조회 실패', error });
  }
});

router.get('/migration', async (req, res) => {
  try {
    const DB = await db.API_cocktaildb_en.findAll();
    DB.forEach(async (element) => {
      console.log(element);
      await db.COCKTAIL.create({
        CNO: element.idDrink,
        UNO: 1,
        NAME: element.strDrink,
        ALCOHOLIC: element.strAlcoholic,
        GLASS: element.strGlass,
        INSTRUCTION: element.strInstructions,
        IMAGE_PATH: element.strDrinkThumb,
      });
    });

    res.status(200).json({ success: true });
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cocktaildb API migration 실패',
      error,
    });
  }
});

router.get('/ingredient', async (req, res) => {
  try {
    for (let i = 1; i <= 15; i++) {
      const DB = await db.API_cocktaildb_en.findAll({
        attributes: [`strIngredient${i}`],
        group: [`strIngredient${i}`],
      });
      DB.forEach(async (element) => {
        try {
          if (element[`strIngredient${i}`] != null) {
            console.log(element[`strIngredient${i}`]);
            await db.INGREDIENT.findOrCreate({
              where: { NAME: element[`strIngredient${i}`] },
            });
          }
        } catch (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            message: 'Cocktaildb API ingredient building 실패',
            error,
          });
        }
      });
    }
    res.status(200).json({ success: true });
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cocktaildb API migration 실패',
      error,
    });
  }
});

router.get('/processing', async (req, res) => {
  try {
    // const searchWord = '1 2/3';
    // for (let i = 1; i <= 10; i++) {
    //   const DB = await API_ninja_en.findAll({
    //     attributes: ['ID', `INGREDIENT${i}`],
    //     where: {
    //       [`INGREDIENT${i}`]: { [Sequelize.Op.like]: '%' + searchWord + '%' },
    //     },
    //   });
    //   for (let j = 0; j < DB.length; j++) {
    //     console.log(DB[j].dataValues);
    //     if (DB[j][`INGREDIENT${i}`].substring(0, 5) == '1 2/3') {
    //       console.log('일치');
    //       const temp = await API_ninja_en.findByPk(DB[j].ID);
    //       temp.update({
    //         [`INGREDIENT${i}`]: '1.66' + DB[j][`INGREDIENT${i}`].substring(5),
    //       });
    //       console.log('change');
    //       console.log('1.66' + DB[j][`INGREDIENT${i}`].substring(5));
    //     }
    //   }
    //   console.log(DB.length);
    // }
    // ----------------------------------
    // const searchWord = '(6 parts)';
    // for (let i = 1; i <= 10; i++) {
    //   const DB = await API_ninja_en.findAll({
    //     attributes: ['ID', `INGREDIENT${i}`],
    //     where: {
    //       [`INGREDIENT${i}`]: { [Sequelize.Op.like]: '%' + searchWord + '%' },
    //     },
    //   });
    //   for (let j = 0; j < DB.length; j++) {
    //     console.log(DB[j].dataValues);
    //     let idx = DB[j][`INGREDIENT${i}`].indexOf('(6 parts)');
    //     console.log('일치');
    //     const temp = await API_ninja_en.findByPk(DB[j].ID);
    //     temp.update({
    //       [`INGREDIENT${i}`]:
    //         DB[j][`INGREDIENT${i}`].substring(0, idx) +
    //         DB[j][`INGREDIENT${i}`].substring(idx + 10),
    //     });
    //     console.log('change');
    //     console.log(
    //       DB[j][`INGREDIENT${i}`].substring(0, idx) +
    //         DB[j][`INGREDIENT${i}`].substring(idx + 10)
    //     );
    //   }
    //   console.log(DB.length);
    // }
    for (let i = 1; i <= 10; i++) {
      const DB = await API_ninja_en.findAll({
        attributes: ['ID', `INGREDIENT${i}`],
      });
      for (let j = 0; j < DB.length; j++) {
        const str = DB[j][`INGREDIENT${i}`];
        // if (str) console.log(DB[j].dataValues);
        const space1 = str ? str.indexOf(' ') : null;
        const space2 = str ? str.indexOf(' ', space1 + 1) : null;

        const temp1 = str ? str.split(' ', 2) : null;
        // if (temp1) console.log(temp1);
        const list = [
          temp1 ? temp1[0] : null,
          temp1 ? temp1[1] : null,
          str ? str.substring(space2 + 1) : null,
        ];
        if (str) console.log(list);
        // let idx = str.indexOf('(6 parts)');
        // console.log('일치');
        // const temp = await API_ninja_en.findByPk(DB[j].ID);
        // temp.update({
        //   [`INGREDIENT${i}`]:
        //     str.substring(0, idx) +
        //     str.substring(idx + 10),
        // });
        // console.log('change');
        // console.log(
        //   str.substring(0, idx) +
        //     str.substring(idx + 10)
        // );
      }
      console.log(DB.length);
    }
    res
      .status(200)
      .json({ success: true, message: 'Cocktaildb API processing 성공' });
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cocktaildb API processing 실패',
      error,
    });
  }
});

router.get('/processing2', async (req, res) => {
  try {
    const ctdb = await db.cocktaildbset.findAll();
    for (let i = 0; i < ctdb.length; i++) {
      // console.log(ctdb[i]);
      const find = await db.API_cocktaildb_en.findOne({
        where: { strDrink: ctdb[i].dataValues.NAME },
      });
      // console.log(find);
      await db.cocktaildbset.update(
        {
          CNO: find.idDrink,
          // INSTRUCTION: find.strInstructions,
          // IMAGE_PATH: find.strDrinkThumb,
          // GLASS: find.strGlass,
          // ALCOHOLIC: find.strAlcoholic,
        },
        {
          where: {
            CNO: ctdb[i].CNO,
          },
        }
      );
      await ctdb[i].update({
        UNO: 16,
      });
    }

    res
      .status(200)
      .json({ success: true, message: 'Cocktaildb API processing2 성공' });
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cocktaildb API processing2 실패',
      error,
    });
  }
});

router.get('/processing3', async (req, res) => {
  try {
    const ninja = await db.ninjaset.findAll();
    for (let i = 0; i < ninja.length; i++) {
      // console.log(ninja[i]);
      const find = await db.API_ninja_en.findOne({
        where: { NAME: ninja[i].dataValues.NAME },
      });
      console.log(ninja[i].CNO, find.ID);
      await db.ninjaset.update(
        { CNO: find.ID },
        { where: { CNO: ninja[i].CNO } }
      );
    }

    return res
      .status(200)
      .json({ success: true, message: 'Cocktaildb API processing3 성공' });
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cocktaildb API processing3 실패',
      error,
    });
  }
});

export default router;
