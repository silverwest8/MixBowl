'use strict';

import express from 'express';
import axios from 'axios';
import { db } from '../models';
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

router.get('/cocktaildb/save', async (req, res) => {
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

router.get('/cocktaildb/migration', async (req, res) => {
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

router.get('/cocktaildb/ingredient', async (req, res) => {
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

router.get('/cocktaildb/processing2', async (req, res) => {
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

router.get('/cocktaildb/recipe', async (req, res) => {
  try {
    /*
    const cocktaildb = await db.cocktaildbset.findAll();
    for (let i = 0; i < cocktaildb.length; i++) {
      // console.log(cocktaildb[i]);
      const find = await db.API_cocktaildb_en.findByPk(cocktaildb[i].CNO);
      console.log(find);
      for (let j = 1; j <= 10; j++) {
        // migration
        if (find[`strIngredient${j}`] && find[`strMeasure${j}`]) {
          await db.cocktaildb_recipeset.create({
            CNO: cocktaildb[i].CNO,
            INGRED: find[`strIngredient${j}`],
            UNIT: find[`strMeasure${j}`],
          });
        }
      }
    }
    */
    const cocktaildb = await db.cocktaildb_recipeset.findAll({
      where: { AMOUNT: null },
      order: [['INGRED', 'DESC']],
    });
    for (let i = 0; i < cocktaildb.length; i++) {
      const str = cocktaildb[i].UNIT.trim();
      const list = str ? str.split(' ') : null;
      // console.log(list);
      if (!list || list.length != 2) {
        console.log('HERE CHECK');
        console.log(list);
        console.log('\n');
        continue;
      }

      /*
      // 1. oz -> ml
      if (list[1] == 'oz' && !isNaN(Number(list[0]))) {
        console.log(list);
        await db.cocktaildb_recipeset.update(
          {
            AMOUNT: Number(list[0]) * 30,
            UNIT: 'ml',
          },
          {
            where: {
              CNO: cocktaildb[i].CNO,
              INGRED: cocktaildb[i].INGRED,
            },
          }
        );
        console.log([list[0] * 30, 'ml']);
      }
      */

      /*
      // 2. cl -> ml
      if ((list[1] == 'cl' || list[1] == 'cL') && !isNaN(Number(list[0]))) {
        console.log(list);
        await db.cocktaildb_recipeset.update(
          {
            AMOUNT: Number(list[0]) * 10,
            UNIT: 'ml',
          },
          {
            where: {
              CNO: cocktaildb[i].CNO,
              INGRED: cocktaildb[i].INGRED,
            },
          }
        );
        console.log([list[0] * 10, 'ml']);
      }
      */

      /*
      // 3. part, parts -> part
      if (
        (list[1] == 'part' || list[1] == 'parts') &&
        !isNaN(Number(list[0]))
      ) {
        console.log(list);
        await db.cocktaildb_recipeset.update(
          {
            AMOUNT: Number(list[0]),
            UNIT: 'part',
          },
          {
            where: {
              CNO: cocktaildb[i].CNO,
              INGRED: cocktaildb[i].INGRED,
            },
          }
        );
        console.log([list[0], 'part']);
      }
      */

      /*
      // 4. dash, dashes -> ml
      if (
        (list[1] == 'dash' || list[1] == 'dashes') &&
        !isNaN(Number(list[0]))
      ) {
        console.log(list);
        await db.cocktaildb_recipeset.update(
          {
            AMOUNT: Number(list[0]),
            UNIT: 'ml',
          },
          {
            where: {
              CNO: cocktaildb[i].CNO,
              INGRED: cocktaildb[i].INGRED,
            },
          }
        );
        console.log([list[0], 'ml']);
      }
      */

      /*
      // 4. ml -> ml
      if (list[1] == 'ml' && !isNaN(Number(list[0]))) {
        console.log(list);
        await db.cocktaildb_recipeset.update(
          {
            AMOUNT: Number(list[0]),
            UNIT: 'ml',
          },
          {
            where: {
              CNO: cocktaildb[i].CNO,
              INGRED: cocktaildb[i].INGRED,
            },
          }
        );
        console.log([list[0], 'ml']);
        console.log('\n');
      }
      */

      /*
      // 5. drop -> 0.2ml 인데 그냥 방울로 함
      if (
        (list[1] == 'drop' || list[1] == 'drops') &&
        !isNaN(Number(list[0]))
      ) {
        console.log(list);
        await db.cocktaildb_recipeset.update(
          {
            AMOUNT: Number(list[0]),
            UNIT: '방울',
          },
          {
            where: {
              CNO: cocktaildb[i].CNO,
              INGRED: cocktaildb[i].INGRED,
            },
          }
        );
        console.log([list[0], '방울']);
      }
      */
      // 6. tsp -> 5ml
      if (list[1] == 'tsp' && !isNaN(Number(list[0]))) {
        console.log(list);
        await db.cocktaildb_recipeset.update(
          {
            AMOUNT: Number(list[0]) * 5,
            UNIT: 'ml',
          },
          {
            where: {
              CNO: cocktaildb[i].CNO,
              INGRED: cocktaildb[i].INGRED,
            },
          }
        );
        console.log([Number(list[0]) * 5, 'ml']);
      }
      // sho(shots) == jigger == 45ml
    }

    return res
      .status(200)
      .json({ success: true, message: 'cocktaildb recipe set 성공' });
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'cocktaildb recipe set 실패',
      error,
    });
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

router.get('/ninja/processing', async (req, res) => {
  try {
    // const searchWord = '1 2/3';
    // for (let i = 1; i <= 10; i++) {
    //   const DB = await db.API_ninja_en.findAll({
    //     attributes: ['ID', `INGREDIENT${i}`],
    //     where: {
    //       [`INGREDIENT${i}`]: { [Sequelize.Op.like]: '%' + searchWord + '%' },
    //     },
    //   });
    //   for (let j = 0; j < DB.length; j++) {
    //     console.log(DB[j].dataValues);
    //     if (DB[j][`INGREDIENT${i}`].substring(0, 5) == '1 2/3') {
    //       console.log('일치');
    //       const temp = await db.API_ninja_en.findByPk(DB[j].ID);
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
    //   const DB = await db.API_ninja_en.findAll({
    //     attributes: ['ID', `INGREDIENT${i}`],
    //     where: {
    //       [`INGREDIENT${i}`]: { [Sequelize.Op.like]: '%' + searchWord + '%' },
    //     },
    //   });
    //   for (let j = 0; j < DB.length; j++) {
    //     console.log(DB[j].dataValues);
    //     let idx = DB[j][`INGREDIENT${i}`].indexOf('(6 parts)');
    //     console.log('일치');
    //     const temp = await db.API_ninja_en.findByPk(DB[j].ID);
    //     await temp.update({
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
      const DB = await db.API_ninja_en.findAll({
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
        // const temp = await db.API_ninja_en.findByPk(DB[j].ID);
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
      .json({ success: true, message: 'Ninja API processing 성공' });
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Ninja API processing 실패',
      error,
    });
  }
});

router.get('/ninja/processing3', async (req, res) => {
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
      .json({ success: true, message: 'Ninja API processing3 성공' });
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Ninja API processing3 실패',
      error,
    });
  }
});

router.get('/ninja/recipe', async (req, res) => {
  try {
    const ninja = await db.ninjaset.findAll();
    for (let i = 0; i < ninja.length; i++) {
      // console.log(ninja[i]);
      const find = await db.API_ninja_en.findByPk(ninja[i].CNO);
      // console.log(find);
      for (let j = 1; j <= 10; j++) {
        if (find[`INGREDIENT${j}`]) {
          await db.ninja_recipe.findOrCreate({
            where: {
              CNO: ninja[i].CNO,
              INGRED: find[`INGREDIENT${j}`],
            },
          });
        }
      }
    }

    return res
      .status(200)
      .json({ success: true, message: 'Ninja API recipe 성공' });
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Ninja API recipe 실패',
      error,
    });
  }
});

router.get('/ninja/unit', async (req, res) => {
  try {
    const ninja = await db.ninja_recipe.findAll({
      where: { AMOUNT: null, UNIT: null },
      order: [['INGRED', 'DESC']],
    });
    for (let i = 0; i < ninja.length; i++) {
      const str = ninja[i].INGRED;
      const space1 = str ? str.indexOf(' ') : null;
      const space2 = str ? str.indexOf(' ', space1 + 1) : null;
      const temp1 = str ? str.split(' ', 2) : null;
      const list = [
        temp1 ? temp1[0] : null,
        temp1 ? temp1[1] : null,
        str ? str.substring(space2 + 1) : null,
      ];
      if (list[0] == null || list[1] == null || list[2] == null) {
        console.log('HERE NULL');
      }

      // 1. oz -> ml
      /*
      if (list[1] == 'oz') {
        console.log(list);
        await db.ninja_recipe.update(
          {
            INGRED: list[2],
            AMOUNT: Number(list[0]) * 30,
            UNIT: 'ml',
          },
          {
            where: {
              CNO: ninja[i].CNO,
              INGRED: ninja[i].INGRED,
            },
          }
        );
        console.log([list[2], Number(list[0]) * 30, 'ml']);
      }
      */

      /*
      // 2. ml -> ml
      if (list[1] == 'ml') {
        console.log(list);
        await db.ninja_recipe.update(
          {
            INGRED: list[2],
            AMOUNT: Number(list[0]),
            UNIT: 'ml',
          },
          {
            where: {
              CNO: ninja[i].CNO,
              INGRED: ninja[i].INGRED,
            },
          }
        );
        console.log([list[2], Number(list[0]), 'ml']);
      }
      */

      /*
      // 3. cl -> ml
      if (list[1] == 'cl') {
        console.log(list);
        await db.ninja_recipe.update(
          {
            INGRED: list[2],
            AMOUNT: Number(list[0]) * 10,
            UNIT: 'ml',
          },
          {
            where: {
              CNO: ninja[i].CNO,
              INGRED: ninja[i].INGRED,
            },
          }
        );
        console.log([list[2], Number(list[0]) * 10, 'ml']);
      }
      */

      /*
      // 4. part/parts/measure -> part
      if (list[1] == 'part' || list[1] == 'parts' || list[1] == 'measure') {
        console.log(list);
        await db.ninja_recipe.update(
          {
            INGRED: list[2],
            AMOUNT: Number(list[0]),
            UNIT: 'part',
          },
          {
            where: {
              CNO: ninja[i].CNO,
              INGRED: ninja[i].INGRED,
            },
          }
        );
        console.log([list[2], Number(list[0]), 'part']);
      }
      */

      /*
      // 5. dash/dashes/ds -> ml 0.62인데 그냥 1로 통침
      if (
        list[1] == 'ds' ||
        list[1] == 'dash' ||
        list[1] == 'dashes' ||
        list[1] == 'Dash' ||
        list[1] == 'Dashes'
      ) {
        console.log(list);
        await db.ninja_recipe.update(
          {
            INGRED: list[2],
            AMOUNT: Number(list[0]),
            UNIT: 'ml', // --->  ml 했어야 했는데 part로 고침 하 근데 귀찮아서 그냥 냅두고싶다...
          },
          {
            where: {
              CNO: ninja[i].CNO,
              INGRED: ninja[i].INGRED,
            },
          }
        );
        console.log([list[2], Number(list[0]), 'ml']);
      }
      */

      // 6. cup, glass => 240ml
      // 7. bottle => 750ml
      // 8. liter(L)은 그냥 L로 썼음! 1000ml보단 L이 나은 것 같아서
      // 9. T -> table spoon => 15ml
      // 10. dr(dram) -> * 3.6

      /*
      // 11. bsp, barspoon == t, teaspoon, teaspoons => 5ml
      if (
        list[1] == 'bsp' ||
        list[1] == 'barspoon' ||
        list[1] == 't' ||
        list[1] == 'teaspoon' ||
        list[1] == 'teaspoons'
      ) {
        console.log(list);
        await db.ninja_recipe.update(
          {
            INGRED: list[2],
            AMOUNT: Number(list[0]) * 5,
            UNIT: 'ml',
          },
          {
            where: {
              CNO: ninja[i].CNO,
              INGRED: ninja[i].INGRED,
            },
          }
        );
        console.log([list[2], Number(list[0]) * 5, 'ml']);
      }
      */

      /*
      // 12. leaf => 잎, sprig, sprigs => 잔가지...인데 그냥 leaf로 퉁침
      if (list[1] == 'lf' || list[1] == 'sprig' || list[1] == 'sprigs') {
        console.log(list);
        await db.ninja_recipe.update(
          {
            INGRED: list[2],
            AMOUNT: Number(list[0]),
            UNIT: 'leaf',
          },
          {
            where: {
              CNO: ninja[i].CNO,
              INGRED: ninja[i].INGRED,
            },
          }
        );
        console.log([list[2], Number(list[0]), 'leaf']);
      }
      */

      // 13. rinse -> 대충 알아보니 3ml... 정확하지 않음
      // 14. twst -> 껍질 세는 느낌
      // 15. wdg -> wedge(조각) 하 질린다...

      // 16. pn
      // 17. spl
      // 모르겠는건 걍 삭제...에라모르겠다
      // 12. leaf => 잎, sprig, sprigs => 잔가지...인데 그냥 leaf로 퉁침

      // 수량 숫자 없는거
      if (list[1] == '#' && list[0] == '$') {
        // isNaN(Number(list[0]))
        console.log(list);
        await db.ninja_recipe.update(
          {
            INGRED: list[2],
            AMOUNT: list[0], // Number(list[0])
            UNIT: list[1],
          },
          {
            where: {
              CNO: ninja[i].CNO,
              INGRED: ninja[i].INGRED,
            },
          }
        );
        console.log([list[2], list[0], list[1]]); // Number(list[0])
      }
    }

    return res
      .status(200)
      .json({ success: true, message: 'Ninja API recipe 성공' });
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Ninja API recipe 실패',
      error,
    });
  }
});

export default router;
