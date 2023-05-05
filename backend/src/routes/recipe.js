'use strict';

import express from 'express';
import axios from 'axios';
import { db } from '../models';
import checkAccess from '../middleware/checkAccessToken';
import dotenv from 'dotenv';
import axios from 'axios';
import multer from 'multer';
import fs from 'fs';
dotenv.config();
const router = express.Router();

//multer 미들웨어 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/cocktailImage'); // 파일이 업로드되는 경로 지정
  },
  filename: function (req, file, cb) {
    const date = new Date();
    date.toLocaleDateString('ko-KR'); // 한국 시간 설정
    cb(
      null,
      `${date.getFullYear()}${
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`
      }${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}${
        date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
      }${
        date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
      }${
        date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`
      }_${file.originalname}`
    ); // 파일 이름 설정
  },
});
const fileFilter = (req, file, callback) => {
  const typeArray = file.originalname.split('.');
  const fileType = typeArray[typeArray.length - 1]; // 이미지 확장자 추출
  //이미지 확장자 구분 검사
  if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
    callback(null, true);
  } else {
    return callback(
      { message: '*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다.' },
      false
    );
  }
};
const limits = {
  fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 1, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // 이미지 업로드 필터링 설정
  limits: limits, // 이미지 업로드 제한 설정
});
router.post('/', checkAccess, upload.single('image'), async (req, res) => {
  try {
    console.log(__dirname);
    const data = JSON.parse(req.body.data);
    console.log(data);
    console.log(req.file);
    const cocktail = await db.COCKTAIL.create({
      UNO: req.user.UNO,
      NAME: data.name,
      INSTRUCTION: data.instruction,
      IMAGE_PATH: req.file.path,
    });
    console.log(cocktail.CNO);
    // color 저장
    for (let i = 0; i < data.color.length; i++) {
      if (data.color[i] != null) {
        await db.COLOR.create({ CNO: cocktail.CNO, COLOR: data.color[i] });
      }
    }

    // main, sub ingredient 저장

    res.status(200).json({ success: true, message: 'Recipe post 성공' });
  } catch (error) {
    console.log(error);
    // 중간 실패시 COCKTAIL, COLOR, RECIPE 모두 삭제해줘야 함
    return res
      .status(400)
      .json({ success: false, message: 'Recipe post 실패', error });
  }
});

router.get('/:cocktailId', checkAccess, async (req, res) => {
  try {
    let data = {
      name: '',
      color: [],
      main: [],
      sub: [],
      instruction: '',
    };

    // cocktail get
    const cocktailId = req.params.cocktailId;
    const cocktail = await db.COCKTAIL.findByPk(cocktailId, {
      attributes: ['CNO', 'NAME', 'INSTRUCTION'],
      include: [
        {
          model: db.COLOR,
          as: 'COLORs',
          attributes: ['COLOR'],
          where: { CNO: cocktailId },
          required: false,
        },
      ],
    });
    console.log(cocktail);
    data.name = cocktail.NAME;
    data.instruction = cocktail.INSTRUCTION;
    for (let i = 0; i < cocktail.COLORs.length; i++) {
      data.color.push(cocktail.COLORs[i].COLOR);
    }
    // main, sub ingredient get
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

// update - Not supporting formdata at put method
router.post(
  '/:cocktailId',
  checkAccess,
  upload.single('image'),
  async (req, res) => {
    try {
      const cocktailId = req.params.cocktailId;
      const data = JSON.parse(req.body.data);
      console.log(data);
      console.log(req.file);
      const cocktail = await db.COCKTAIL.findByPk(cocktailId, {
        attributes: ['CNO', 'NAME', 'INSTRUCTION', 'IMAGE_PATH'],
        include: [
          {
            model: db.COLOR,
            as: 'COLORs',
            attributes: ['COLOR'],
            where: { CNO: cocktailId },
            required: false,
          },
        ],
      });
      console.log(cocktail.IMAGE_PATH);
      if (cocktail.IMAGE_PATH) {
        const oldFilePath = `./${cocktail.IMAGE_PATH}`;
        console.log(oldFilePath);
        fs.unlinkSync(oldFilePath);
      }
      await cocktail.update({
        NAME: data.name,
        INSTRUCTION: data.instruction,
        IMAGE_PATH: req.file ? req.file.path : null,
      });
      // color는 개수 달라질 수 있으므로 삭제 후 저장
      for (let i = 0; i < cocktail.COLORs.length; i++) {
        console.log(cocktail.COLORs[i].COLOR);
        await db.COLOR.destroy({
          where: { CNO: cocktailId, COLOR: cocktail.COLORs[i].COLOR },
        });
      }
      for (let i = 0; i < data.color.length; i++) {
        if (data.color[i] != null) {
          await db.COLOR.create({ CNO: cocktail.CNO, COLOR: data.color[i] });
        }
      }

      // main, sub ingredient 변경

      res.status(200).json({ success: true, message: 'Cocktail update 성공' });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, message: 'Cocktail update 실패', error });
    }
  }
);

router.delete('/:cocktailId', async (req, res) => {
  try {
    const cocktailId = req.params.cocktailId;
    const cocktail = await db.COCKTAIL.findByPk(cocktailId);

    // file system에서 이미지파일 삭제
    const oldFilePath = `./${cocktail.IMAGE_PATH}`;
    console.log(oldFilePath);
    fs.unlinkSync(oldFilePath);
    // color 삭제(아마 자동)
    // main, sub ingredient 삭제(아마 자동)
    console.log(cocktail);
    await cocktail.destroy();

    res.status(200).json({ success: true, message: 'Cocktail delete 성공' });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktail delete 실패', error });
  }
});

router.get('/list/filter', checkAccess, async (req, res) => {
  try {
    const max = req.query.max;
    const min = req.query.min;
    const color = req.query.color; // json string parse?
    const search = req.query.search;
    const sort = req.query.sort;
    console.log(max, min, color, search, sort);
    let list = [];
    const cocktail = await db.COCKTAIL.findAll({
      attributes: ['CNO', 'NAME'],
      where: {
        //
      },
      include: [
        {
          model: db.USER,
          as: 'UNO_USER',
          attributes: ['UNO', 'NICKNAME', 'LEVEL'],
          required: false,
        },
      ],
    });
    // console.log(cocktail);
    for (let i = 0; i < cocktail.length; i++) {
      let temp = {
        id: cocktail[i].CNO,
        name: cocktail[i].NAME,
        like: 0,
        post: 0,
        USER: {
          nickname: cocktail[i].UNO_USER.NICKNAME,
          level: cocktail[i].UNO_USER.LEVEL,
          iswriter: false,
        },
      };
      const like = await db.COCKTAIL_LIKE.findAndCountAll({
        where: cocktail[i].CNO,
      });
      temp.like = like.count;
      const post = await db.POST.findAndCountAll({ where: cocktail[i].CNO });
      temp.post = post.count;
      if (req.user.UNO == cocktail[i].UNO_USER.UNO) {
        temp.USER.iswriter = true;
      }
      list.push(temp);
    }

    // main, sub ingredient get
    return res
      .status(200)
      .json({ success: true, message: 'Cocktail list get 성공', list });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktail list get 실패', error });
  }
});

router.get('/detail/:cocktailId', checkAccess, async (req, res) => {
  try {
    const cocktailId = req.params.cocktailId;
    const cocktail = await db.COCKTAIL.findByPk(cocktailId);

    for (let i = 0; i < cocktail.length; i++) {
      const like = await db.COCKTAIL_LIKE.findAndCountAll({
        where: cocktail[i].CNO,
      });
      console.log(like.count);
      const post = await db.POST.findAndCountAll({ where: cocktail[i].CNO });
      console.log(post.count);
    }

    // color get
    // main, sub ingredient get
    return res
      .status(200)
      .json({ success: true, message: 'Cocktail detail get 성공', list });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktail detail get 실패', error });
  }
});

router.get('/detail/review/:cocktailId', checkAccess, async (req, res) => {
  try {
    const cocktailId = req.params.cocktailId;
    const cocktail = await db.COCKTAIL.findByPk(cocktailId);

    for (let i = 0; i < cocktail.length; i++) {
      const like = await db.COCKTAIL_LIKE.findAndCountAll({
        where: cocktail[i].CNO,
      });
      console.log(like.count);
      const post = await db.POST.findAndCountAll({ where: cocktail[i].CNO });
      console.log(post.count);
    }

    // color get
    // main, sub ingredient get
    return res
      .status(200)
      .json({ success: true, message: 'Cocktail detail get 성공', list });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktail detail get 실패', error });
  }
});

router.get('/image/:cocktailId', checkAccess, async (req, res) => {
  try {
    const cocktailId = req.params.cocktailId;
    const cocktail = await db.COCKTAIL.findByPk(cocktailId);
    console.log(cocktail.IMAGE_PATH);
    if (Number(cocktailId) < 11000 || cocktailId > 178368) {
      const data = fs.readFileSync(cocktail.IMAGE_PATH);
      res.writeHead(200, { 'Content-Type': 'image/jpg' }); //보낼 헤더를 만듬
      res.write(data); //본문을 만들고
      return res.end(); //클라이언트에게 응답을 전송한다
    } else {
      const { data } = await axios.get(cocktail.IMAGE_PATH);
      res.writeHead(200, { 'Content-Type': 'image/jpg' });
      res.write(data);
      return res.end();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Recipe Image get 실패', error });
  }
});

//  ----- 이 아래는 데이터 가공을 위해 쓴 코드 - 배포 시 지울 예정 ----- //

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
          const recipe = await API_cocktaildb_en.findByPk(
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
      await API_cocktaildb_en.findByPk(data.drinks[0].idDrink);
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktaildb API id 조회 실패', error });
  }
});

router.get('/testAPIs/ninja', async (req, res) => {
  try {
    const ingredient = await INGREDIENT.findAll();
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
        const [row, created] = await API_ninja_en.findOrCreate({
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

router.get('/data/migration', async (req, res) => {
  try {
    const DB = await API_cocktaildb_en.findAll();
    DB.forEach(async (element) => {
      console.log(element);
      await COCKTAIL.create({
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

router.get('/data/ingredient', async (req, res) => {
  try {
    for (let i = 1; i <= 15; i++) {
      const DB = await API_cocktaildb_en.findAll({
        attributes: [`strIngredient${i}`],
        group: [`strIngredient${i}`],
      });
      DB.forEach(async (element) => {
        try {
          if (element[`strIngredient${i}`] != null) {
            console.log(element[`strIngredient${i}`]);
            await INGREDIENT.findOrCreate({
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

router.get('/data/processing', async (req, res) => {
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
    res.status(200).json({ success: true });
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

export default router;
