'use strict';

import express from 'express';
import { db, sequelize } from '../models';
import checkAccess from '../middleware/checkAccessToken';
import dotenv from 'dotenv';
import axios from 'axios';
import multer from 'multer';
import fs from 'fs';
import { Sequelize } from 'sequelize';

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

    // name, alcoholic, instruction, image path 저장F
    const cocktail = await db.COCKTAIL.create({
      UNO: req.user.UNO,
      NAME: data.name,
      ALCOHOLIC: data.alcoholic,
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

    // recipes 저장
    for (let i = 0; i < data.ingred.length; i++) {
      if (data.ingred[i] != null) {
        await db.RECIPE.create({
          CNO: cocktail.CNO,
          NAME: data.ingred[i].name,
          AMOUNT: data.ingred[i].amount,
          UNIT: data.ingred[i].unit,
        });
      }
    }

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
      ingred: [],
      instruction: '',
    };

    // cocktail get
    const cocktailId = req.params.cocktailId;
    const cocktail = await db.COCKTAIL.findByPk(cocktailId, {
      attributes: ['CNO', 'NAME', 'ALCOHOLIC', 'INSTRUCTION'],
      include: [
        {
          model: db.COLOR,
          as: 'COLORs',
          attributes: ['COLOR'],
          where: { CNO: cocktailId },
          required: false,
        },
        {
          model: db.RECIPE,
          as: 'RECIPEs',
          attributes: ['NAME', 'AMOUNT', 'UNIT'],
          where: { CNO: cocktailId },
          required: false,
        },
      ],
      order: [[{ model: db.RECIPE, as: 'RECIPEs' }, 'AMOUNT', 'DESC']],
    });
    const color = cocktail.COLORs;
    const recipe = cocktail.RECIPEs;
    data.name = cocktail.NAME;
    data.alcoholic = cocktail.ALCOHOLIC;
    data.instruction = cocktail.INSTRUCTION;

    // color
    for (let i = 0; i < color.length; i++) {
      data.color.push(color[i].COLOR);
    }

    // recipe
    console.log(recipe);
    for (let i = 0; i < recipe.length; i++) {
      const temp = {
        name: recipe[i].NAME,
        amount: recipe[i].AMOUNT,
        unit: recipe[i].UNIT,
      };
      data.ingred.push(temp);
    }
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
          {
            model: db.RECIPE,
            as: 'RECIPEs',
            attributes: ['NAME'],
            where: { CNO: cocktailId },
            required: false,
          },
        ],
      });
      const color = cocktail.COLORs;
      const recipe = cocktail.RECIPEs;
      console.log(cocktail.IMAGE_PATH);

      // 이전 이미지 삭제
      if (cocktail.IMAGE_PATH) {
        const oldFilePath = `./${cocktail.IMAGE_PATH}`;
        console.log(oldFilePath);
        fs.unlinkSync(oldFilePath);
      }

      // 정보 update
      await cocktail.update({
        NAME: data.name,
        INSTRUCTION: data.instruction,
        IMAGE_PATH: req.file ? req.file.path : null,
      });

      // color, recipe 개수 달라질 수 있으므로 삭제 후 저장
      // 삭제(color)
      for (let i = 0; i < color.length; i++) {
        console.log(color[i].COLOR);
        await db.COLOR.destroy({
          where: { CNO: cocktailId, COLOR: color[i].COLOR },
        });
      }
      // 삭제(recipe)
      for (let i = 0; i < recipe.length; i++) {
        console.log(recipe[i].NAME);
        await db.RECIPE.destroy({
          where: { CNO: cocktailId, NAME: recipe[i].NAME },
        });
      }

      // 추가(color)
      for (let i = 0; i < data.color.length; i++) {
        if (data.color[i] != null) {
          await db.COLOR.create({ CNO: cocktail.CNO, COLOR: data.color[i] });
        }
      }
      // 추가(recipe)
      for (let i = 0; i < data.ingred.length; i++) {
        console.log(data.ingred[i]);
        if (data.ingred[i] != null) {
          await db.RECIPE.create({
            CNO: cocktail.CNO,
            NAME: data.ingred[i].name,
            AMOUNT: data.ingred[i].amount,
            UNIT: data.ingred[i].unit,
          });
        }
      }

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
    console.log(cocktail);
    await cocktail.destroy();
    // color, recipe - CASCADE TRIGGER로 자동 삭제

    res.status(200).json({ success: true, message: 'Cocktail delete 성공' });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktail delete 실패', error });
  }
});

router.get('/list/filter/:page', checkAccess, async (req, res) => {
  try {
    const page = Number(req.params.page);
    const offset = 20 * (page - 1);
    const limit = 20;
    const color = req.query.color
      ? JSON.parse(`{"color": ${req.query.color}}`).color
      : null;
    const alcoholic = req.query.alcoholic
      ? JSON.parse(`{"alcoholic": ${req.query.alcoholic}}`).alcoholic
      : null;
    const search = req.query.search;
    const sort = req.query.sort == 'new' ? 'createdAt' : 'LIKECOUNT';
    // console.log(alcoholic, color, search, sort);
    let list = [];
    const cocktailfilter = await db.COCKTAIL.findAll({
      attributes: ['CNO', 'NAME', 'INSTRUCTION', 'ALCOHOLIC'],
      include: [
        {
          model: db.COLOR,
          as: 'COLORs',
          where: {
            COLOR: {
              [Sequelize.Op.or]: color,
            },
          },
          required: true,
        },
        {
          model: db.RECIPE,
          as: 'RECIPEs',
          attributes: ['NAME'],
          where: {
            NAME: { [Sequelize.Op.like]: `%${search}%` },
          },
          required: true,
        },
      ],
      where: {
        [Sequelize.Op.or]: [
          {
            NAME: {
              [Sequelize.Op.like]: `%${search}%`,
            },
          },
          {
            INSTRUCTION: {
              [Sequelize.Op.like]: `%${search}%`,
            },
          },
          {
            ALCOHOLIC: {
              [Sequelize.Op.or]: alcoholic,
            },
          },
        ],
      },
    });
    let filter = [];
    for (let i = 0; i < cocktailfilter.length; i++) {
      filter.push(`COCKTAIL.CNO = ${cocktailfilter[i].CNO}`);
    }
    const finalfilter = filter.join(' OR ');
    // console.log(finalfilter);
    const sortquery = `SELECT COCKTAIL.CNO, COCKTAIL.UNO, COCKTAIL.NAME, COUNT(COCKTAIL_LIKE.UNO) AS LIKECOUNT, COCKTAIL.createdAt
      FROM (
        SELECT *
        FROM COCKTAIL AS COCKTAIL
        ${filter.length ? `WHERE (${finalfilter})` : ''}
      )
      AS COCKTAIL
      LEFT JOIN COCKTAIL_LIKE AS COCKTAIL_LIKE
      ON COCKTAIL.CNO = COCKTAIL_LIKE.CNO
      GROUP BY CNO
      ORDER BY ${sort} DESC
      LIMIT ${offset}, ${limit};`;
    // console.log(sortquery);
    const result = await sequelize.query(sortquery, {
      type: Sequelize.QueryTypes.SELECT,
    });
    for (let i = 0; i < result.length; i++) {
      // console.log(result[i]);
      const user = await db.USER.findByPk(result[i].UNO);
      let temp = {
        id: result[i].CNO,
        name: result[i].NAME,
        like: result[i].LIKECOUNT,
        post: await db.POST.count({ where: result[i].CNO }),
        USER: {
          nickname: user.NICKNAME,
          level: user.LEVEL,
          iswriter: req.user.UNO == user.UNO ? true : false,
        },
      };
      list.push(temp);
    }
    console.log(list.length);

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
    let data = {
      name: '',
      color: [],
      ingred: [],
      instruction: '',
    };
    const cocktailId = req.params.cocktailId;
    const cocktail = await db.COCKTAIL.findByPk(cocktailId, {
      attributes: ['CNO', 'NAME', 'ALCOHOLIC', 'INSTRUCTION', 'createdAt'],
      include: [
        {
          model: db.COLOR,
          as: 'COLORs',
          attributes: ['COLOR'],
          where: { CNO: cocktailId },
          required: false,
        },
        {
          model: db.RECIPE,
          as: 'RECIPEs',
          attributes: ['NAME', 'AMOUNT', 'UNIT'],
          where: { CNO: cocktailId },
          required: false,
        },
        {
          model: db.USER,
          as: 'UNO_USER',
          attributes: ['UNO', 'NICKNAME', 'LEVEL'],
          required: false,
        },
      ],
      order: [[{ model: db.RECIPE, as: 'RECIPEs' }, 'AMOUNT', 'DESC']],
    });
    const color = cocktail.COLORs;
    const recipe = cocktail.RECIPEs;
    data.date = cocktail.createdAt;
    data.name = cocktail.NAME;
    data.alcoholic = cocktail.ALCOHOLIC;
    data.instruction = cocktail.INSTRUCTION;
    data.USER = {
      nickname: cocktail.UNO_USER.NICKNAME,
      level: cocktail.UNO_USER.LEVEL,
      iswriter: req.user.UNO == cocktail.UNO_USER.UNO ? true : false,
    };
    // color
    console.log(color);
    for (let i = 0; i < color.length; i++) {
      data.color.push(color[i].COLOR);
    }

    // recipe
    console.log(recipe);
    for (let i = 0; i < recipe.length; i++) {
      const temp = {
        name: recipe[i].NAME,
        amount: recipe[i].AMOUNT,
        unit: recipe[i].UNIT,
      };
      data.ingred.push(temp);
    }

    // color get
    // recipe get
    return res
      .status(200)
      .json({ success: true, message: 'Cocktail detail get 성공', data });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktail detail get 실패', error });
  }
});

router.get('/detail/review/:cocktailId', checkAccess, async (req, res) => {
  try {
    let data = {};
    let list = [];
    const cocktailId = req.params.cocktailId;
    const cocktail = await db.COCKTAIL.findByPk(cocktailId);

    const like = await db.COCKTAIL_LIKE.findAndCountAll({
      where: cocktail.CNO,
    });
    console.log(like.count);
    data.like = like.count;

    const post = await db.POST.findAndCountAll({ where: cocktail.CNO });
    console.log(post.count);
    data.post = post.count;

    data.list = post;

    return res
      .status(200)
      .json({ success: true, message: 'Cocktail detail get 성공', data });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Cocktail detail get 실패', error });
  }
});

router.get('/image/:cocktailId', async (req, res) => {
  try {
    const cocktailId = req.params.cocktailId;
    const cocktail = await db.COCKTAIL.findByPk(cocktailId);
    if (Number(cocktailId) < 11000 || cocktailId > 178368) {
      const data = fs.readFileSync(cocktail.IMAGE_PATH);
      res.writeHead(200, { 'Content-Type': 'image/jpg' }); //보낼 헤더를 만듬
      res.write(data); //본문을 만들고
      return res.end(); //클라이언트에게 응답을 전송한다
    } else {
      const { data } = await axios.get(cocktail.IMAGE_PATH, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(data, 'binary');
      res.set('Content-Type', 'image/jpeg');
      return res.status(200).send(imageBuffer);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Recipe Image get 실패', error });
  }
});

router.post('/like/:cocktailId', async (req, res) => {
  try {
    const cocktailId = req.params.cocktailId;
    await db.COCKTAIL_LIKE.create({ CNO: cocktailId, UNO: req.user.UNO });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Recipe Like 실패', error });
  }
});

router.post('/report/:cocktailId', async (req, res) => {
  try {
    const cocktailId = req.params.cocktailId;
    const report = req.body.report;
    await db.COCKTAIL_REPORT.create({
      CNO: cocktailId,
      UNO: req.user.UNO,
      REPORT: report,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Recipe Report 실패', error });
  }
});

export default router;
