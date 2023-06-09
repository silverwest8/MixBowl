'use strict';

import express from 'express';
import sql from '../database/sql';
import checkAccess from '../middleware/checkAccessToken';
import multer from 'multer';
import POST from '../models/POST';
import USER from '../models/USER';
import POST_LIKE from '../models/POST_LIKE';
import POST_REPLY from '../models/POST_REPLY';
import fs from 'fs';
import { Sequelize, Op } from 'sequelize';
import IMAGE_COMMUNITY from '../models/IMAGE_COMMUNITY';
import checkTokenYesAndNo from '../middleware/checkTokenYesAndNo';
import dotenv from 'dotenv';
import POST_REPORT from '../models/POST_REPORT';
dotenv.config();
const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

const router = express.Router();

export default router;

// 파일 업로드를 위해 사용되는 multipart/form-data 를 front에서 사용할것

//multer 미들웨어 파일 제한 값 (Doc 공격으로부터 서버를 보호하는데 도움이 된다.)
const limits = {
  fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 5, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};
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
//multer 미들웨어 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 파일이 업로드되는 경로 지정
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // 파일 이름 설정
  },
});
const upload = multer({
  storage: storage,
  dest: __dirname + '/uploads/', // 이미지 업로드 경로
  limits: limits, // 이미지 업로드 제한 설정
  fileFilter: fileFilter, // 이미지 업로드 필터링 설정
});

router.post('/like/:pno', checkAccess, async (req, res) => {
  const uno = req.decoded.unum;
  const pno = req.params.pno;
  console.log(uno, pno);
  try {
    const isPostLike = await sql.makePostLike(uno, pno);
    if (isPostLike === 3) {
      //db 접근 자체 못하는 오류
      throw new Error("We can't make Post Like DB");
    } else if (isPostLike === 2) {
      //db에 이미 좋아요 기록이 있는경우 -> 좋아요 취소
      await sql.deletePostLike(uno, pno);
    }
    res.json({
      success: true,
      message: 'Like or Dislike Updated successfully',
    });
  } catch (error) {
    console.log(error.message);
  }
});
router.post('/', checkAccess, upload.array('files', 5), async (req, res) => {
  try {
    const post = await sql.postCommunity(req);
    console.log('maybe', post);
    //배열 형태이기 때문에 반복문을 통해 파일 정보를 알아낸다.
    req.files.map(async (data) => {
      console.log('폼에 정의된 필드명 : ', data.fieldname);
      console.log('사용자가 업로드한 파일 명 : ', data.originalname);
      console.log('파일의 엔코딩 타입 : ', data.encoding);
      console.log('파일의 Mime 타입 : ', data.mimetype);
      console.log('파일이 저장된 폴더 : ', data.destination);
      console.log('destinatin에 저장된 파일 명 : ', data.filename);
      console.log('업로드된 파일의 전체 경로 ', data.path);
      console.log('파일의 바이트(byte 사이즈)', data.size);
    });
    await sql.postImage(req, post);
    res.json({
      success: true,
      message: 'Community Multipart Upload Ok & DB update OK',
    });
  } catch (error) {
    console.log(error.message);
  }
});
router.get('/:postId', checkTokenYesAndNo, async (req, res) => {
  const pno = req.params.postId;
  const postData = await POST.findByPk(Number(pno));
  if (postData === null) {
    return res.status(400).send({
      success: false,
      message: '게시물이 없습니다.',
    });
  }
  const user = await USER.findByPk(postData.dataValues.UNO);
  console.log(user);
  let isWriter = false;
  const likePost = await POST_LIKE.findAll({
    attributes: ['PNO', [Sequelize.fn('COUNT', Sequelize.col('PNO')), 'LIKES']],
    where: {
      PNO: pno,
    },
    group: ['PNO'],
  });
  let likes;
  if (likePost.length === 0) {
    likes = 0;
  } else {
    likes = likePost[0].dataValues.LIKES;
  }
  const replies = await POST_REPLY.findAll({
    where: {
      PNO: pno,
    },
  });
  let isUserLike = false;
  const isLike =
    req.user === undefined
      ? []
      : await POST_LIKE.findAll({
          where: { UNO: req.user.UNO, PNO: postData.PNO },
        });
  console.log(isLike);
  if (isLike.length !== 0) {
    isUserLike = true;
  }
  console.log(isUserLike);
  const reply_arr = [];
  for (const val of replies) {
    const user = await USER.findByPk(val.dataValues.UNO);
    let isReplyWriter = false;
    if (req.user !== undefined) {
      //로그인 한 상태일 때,
      console.log(val.dataValues);
      if (req.user.UNO === val.dataValues.UNO) {
        isReplyWriter = true;
      }
    }
    delete val.dataValues.UNO;
    val.dataValues.UNO_USER = {
      replyId: val.dataValues.PRNO,
      NICKNAME: user.NICKNAME,
      LEVEL: user.LEVEL,
      CONTENT: val.dataValues.CONTENT,
      createdAt: val.dataValues.createdAt,
      isReplyWriter: isReplyWriter,
    };
    reply_arr.push(val.dataValues.UNO_USER);
  }
  console.log(reply_arr);
  const imageIdArr = [];
  const imagesPromise = await IMAGE_COMMUNITY.findAll({
    where: {
      PNO: pno,
    },
  });
  if (req.user !== undefined) {
    //로그인 한 상태일 때,
    if (req.user.UNO === postData.UNO) {
      isWriter = true;
    }
  }
  imagesPromise.forEach((val) => imageIdArr.push(val.IMAGE_ID));
  switch (postData.CATEGORY) {
    //postId 로 이미지 찾을 수 있음
    case 1:
      return res.send({
        success: true,
        title: postData.TITLE,
        like: likes,
        isUserLike: isUserLike,
        content: postData.CONTENT,
        username: user.dataValues.NICKNAME,
        userlevel: user.dataValues.LEVEL,
        createdAt: postData.createdAt,
        postId: postData.PNO,
        images: imageIdArr,
        isWriter: isWriter,
        category: postData.dataValues.CATEGORY,
        replies: reply_arr,
      });
    case 2:
      return res.send({
        success: true,
        like: likes,
        isUserLike: isUserLike,
        content: postData.CONTENT,
        username: user.dataValues.NICKNAME,
        userlevel: user.dataValues.LEVEL,
        createdAt: postData.createdAt,
        postId: postData.PNO,
        images: imageIdArr,
        isWriter: isWriter,
        category: postData.dataValues.CATEGORY,
        replies: reply_arr,
      });
    case 3:
      return res.send({
        success: true,
        title: postData.TITLE,
        cocktailLike: postData.LIKE,
        isUserLike: isUserLike,
        like: likes,
        content: postData.CONTENT,
        username: user.dataValues.NICKNAME,
        userlevel: user.dataValues.LEVEL,
        createdAt: postData.createdAt,
        cno: postData.CNO,
        postId: postData.PNO,
        images: imageIdArr,
        isWriter: isWriter,
        category: postData.dataValues.CATEGORY,
        replies: reply_arr,
      });
    case 4:
      return res.send({
        success: true,
        title: postData.TITLE,
        like: likes,
        isUserLike: isUserLike,
        content: postData.CONTENT,
        username: user.dataValues.NICKNAME,
        userlevel: user.dataValues.LEVEL,
        createdAt: postData.createdAt,
        postId: postData.PNO,
        images: imageIdArr,
        isWriter: isWriter,
        category: postData.dataValues.CATEGORY,
        replies: reply_arr,
      });
  }
});
router.post(
  '/:postId',
  checkAccess,
  sql.deleteImage,
  upload.array('files', 5),
  async (req, res) => {
    try {
      const pno = req.params.postId;
      const uno = req.decoded.unum;
      const postData = await POST.findByPk(pno);
      // if (postData.dataValues.UNO === uno) {
      //   const data = Object.assign(postData.dataValues);
      //   sql.
      // }

      //get으로 다 포스트 전체 내용 받아오고 다시 전달
      if (postData.dataValues.UNO === uno) {
        const post = await sql.changeCommunity(req, pno);
        console.log('post', post);
        await sql.postImage(req, post);
        res.send({
          success: true,
          message: 'modify success',
        });
      } else {
        res.send({
          success: false,
          message: "can't modify post/ not writer",
        });
      }
    } catch (error) {
      console.log(error.message);
      res.send({
        success: false,
        message: 'sth wrong happend in system',
      });
    }
  }
);
router.delete('/:postId', checkAccess, sql.deleteImage, async (req, res) => {
  console.log('hi');
  try {
    await sql.deletePost(req);
    return res
      .status(200)
      .json({ success: true, message: 'Delete Review Success' });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
router.post('/reply/:postId', checkAccess, async (req, res) => {
  try {
    const pno = req.params.postId;
    await sql.postReply(req, pno);
    res.send({
      success: true,
      message: 'REPLY post successfully',
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      success: false,
      message: 'REPLY post failed',
    });
  }
});
router.put('/reply/:replyId', checkAccess, async (req, res) => {
  try {
    const uno = req.decoded.unum;
    const replyId = req.params.replyId;
    const reply_uno = await sql.getReplyUno(replyId);
    if (uno === reply_uno) {
      await sql.changeReply(req, replyId);
      res.send({
        success: true,
        message: 'change Reply successfully',
      });
    } else {
      res.send({
        success: false,
        message: 'cannot change reply/not writer',
      });
    }
  } catch (error) {
    console.log('error', error.message);
    res.send({
      success: false,
      message: 'change Reply failed',
    });
  }
});

router.delete('/reply/:replyId', checkAccess, async (req, res) => {
  try {
    const uno = req.decoded.unum;
    const replyId = req.params.replyId;
    const reply_uno = await sql.getReplyUno(replyId);
    if (uno === reply_uno) {
      await sql.deleteReply(req, replyId);
      res.send({
        success: true,
        message: 'delete Reply successfully',
      });
    } else {
      res.send({
        success: false,
        message: 'cannot delete reply/not writer',
      });
    }
  } catch (error) {
    console.log('error', error.message);
    res.send({
      success: false,
      message: 'delete Reply failed',
    });
  }
});

router.get('/list/all', checkTokenYesAndNo, async (req, res) => {
  try {
    const page = Number(req.query.page);
    const search = req.query.search;
    console.log('search', search);
    const offset = 10 * (page - 1);
    const limit = 10;
    const list = [];
    let posts;
    if (search) {
      posts = await POST.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset,
        where: {
          [Sequelize.Op.or]: [
            {
              TITLE: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              CONTENT: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
      });
    } else {
      posts = await POST.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset,
      });
    }
    for (const val of posts) {
      const user = await USER.findByPk(val.dataValues.UNO);
      const likePost = await POST_LIKE.findAll({
        attributes: [
          'PNO',
          [Sequelize.fn('COUNT', Sequelize.col('PNO')), 'LIKES'],
        ],
        where: {
          PNO: val.dataValues.PNO,
        },
        group: ['PNO'],
      });
      let isUserLike = false;
      const isLike =
        req.user === undefined
          ? []
          : await POST_LIKE.findAll({
              where: { UNO: req.user.UNO, PNO: val.dataValues.PNO },
            });
      console.log(isLike);
      if (isLike.length !== 0) {
        isUserLike = true;
      }
      val.dataValues.isUserLike = isUserLike;
      val.dataValues.cocktailLike = -1; //cocktail관련 게시글이 아닌경우 -1로 초기화
      if (val.CATEGORY === 3) {
        val.dataValues.cocktailLike = val.LIKE;
      }
      const replyNum = await POST_REPLY.findAll({
        attributes: [
          'PNO',
          [Sequelize.fn('COUNT', Sequelize.col('PNO')), 'Replies'],
        ],
        where: {
          PNO: val.dataValues.PNO,
        },
        group: ['PNO'],
      });
      console.log('val', val.dataValues.UNO);
      let isWriter = false;
      if (req.user !== undefined) {
        if (req.user.UNO === val.dataValues.UNO) {
          isWriter = true;
        }
      }
      val.dataValues.isWriter = isWriter;
      delete val.dataValues.UNO;
      val.dataValues.UNO_USER = {
        NICKNAME: user.NICKNAME,
        LEVEL: user.LEVEL,
      };
      if (likePost.length !== 0) {
        val.dataValues.LIKE = likePost[0].dataValues.LIKES;
      } else {
        val.dataValues.LIKE = 0;
      }
      if (replyNum.length !== 0) {
        val.dataValues.REPLY = replyNum[0].dataValues.Replies;
      } else {
        val.dataValues.REPLY = 0;
      }
      list.push(val.dataValues);
    }

    console.log(list);
    res.send({
      success: true,
      message: 'Post List loaded successfully',
      data: list,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      success: false,
      message: 'Post List loaded failed',
    });
  }
});
router.get(
  '/list/category/:category_name',
  checkTokenYesAndNo,
  async (req, res) => {
    try {
      const category_name = req.params.category_name;
      const search = req.query.search;
      let category;
      if (category_name === 'recommend') {
        category = 1;
      } else if (category_name === 'question') {
        category = 2;
      } else if (category_name === 'review') {
        category = 3;
      } else if (category_name === 'free') {
        category = 4;
      } else {
        throw new Error('not valid category name');
      }
      const page = Number(req.query.page);
      const offset = 10 * (page - 1);
      const limit = 10;
      const list = [];
      let posts;
      if (search) {
        posts = await POST.findAll({
          where: {
            [Op.and]: [
              { CATEGORY: category },
              {
                [Op.or]: [
                  {
                    TITLE: {
                      [Op.like]: `%${search}%`,
                    },
                  },
                  {
                    CONTENT: {
                      [Op.like]: `%${search}%`,
                    },
                  },
                ],
              },
            ],
          },
          order: [['createdAt', 'DESC']],
          limit: limit,
          offset: offset,
        });
      } else {
        posts = await POST.findAll({
          where: { category: category },
          order: [['createdAt', 'DESC']],
          limit: limit,
          offset: offset,
        });
      }

      for (const val of posts) {
        const user = await USER.findByPk(val.dataValues.UNO);
        const likePost = await POST_LIKE.findAll({
          attributes: [
            'PNO',
            [Sequelize.fn('COUNT', Sequelize.col('PNO')), 'LIKES'],
          ],
          where: {
            PNO: val.dataValues.PNO,
          },
          group: ['PNO'],
        });
        let isUserLike = false;
        const isLike =
          req.user === undefined
            ? []
            : await POST_LIKE.findAll({
                where: { UNO: req.user.UNO, PNO: val.dataValues.PNO },
              });
        console.log(isLike);
        if (isLike.length !== 0) {
          isUserLike = true;
        }
        val.dataValues.isUserLike = isUserLike;
        let isWriter = false;
        if (req.user !== undefined) {
          if (req.user.UNO === val.dataValues.UNO) {
            isWriter = true;
          }
        }
        val.dataValues.isWriter = isWriter;
        const replyNum = await POST_REPLY.findAll({
          attributes: [
            'PNO',
            [Sequelize.fn('COUNT', Sequelize.col('PNO')), 'Replies'],
          ],
          where: {
            PNO: val.dataValues.PNO,
          },
          group: ['PNO'],
        });

        delete val.dataValues.UNO;
        val.dataValues.UNO_USER = {
          NICKNAME: user.NICKNAME,
          LEVEL: user.LEVEL,
        };

        if (likePost.length !== 0) {
          val.dataValues.LIKE = likePost[0].dataValues.LIKES;
        } else {
          val.dataValues.LIKE = 0;
        }
        if (replyNum.length !== 0) {
          val.dataValues.REPLY = replyNum[0].dataValues.Replies;
        } else {
          val.dataValues.REPLY = 0;
        }

        list.push(val.dataValues);
      }

      console.log(list);
      res.send({
        success: true,
        message: 'Post List loaded successfully',
        data: list,
      });
    } catch (error) {
      console.log(error.message);
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);
router.get('/one/image', async (req, res) => {
  //이미지 하나 요청
  try {
    const imageId = req.query.imageId;
    const imgPath = await sql.getImagePath(imageId, 'community');
    const data = fs.readFileSync(imgPath);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.write(data);
    return res.end();
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: '이미지 조회 실패', error });
  }
});
router.get('/list/cocktails', async (req, res) => {
  try {
    const cocktailNames = [];
    await sql.getCocktails().then((value) => {
      console.log(value);
      for (let i = 0; i < value.length; i++) {
        cocktailNames.push(value[i].NAME + '/' + value[i].CNO);
      }
    });
    console.log(cocktailNames);
    res.json({
      success: true,
      message: 'get All Cocktails in cocktail DB',
      data: cocktailNames,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "can't get cocktails in cocktail DB",
    });
  }
});

router.get('/list/hotPost', checkTokenYesAndNo, async (req, res) => {
  try {
    const list = [];
    const result = await POST_LIKE.findAll({
      attributes: [
        'POST_LIKE.PNO',
        [Sequelize.fn('COUNT', Sequelize.col('POST_LIKE.PNO')), 'likeCount'],
      ],
      group: ['POST_LIKE.PNO'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('POST_LIKE.PNO')), 'DESC']],
      include: [
        {
          model: POST,
          required: true,
          as: 'PNO_POST',
          where: {
            createdAt: {
              [Op.lt]: oneWeekAgo,
            },
          },
        },
      ],
      limit: 3, //최대 3개로 조정.
    });
    for (const val of result) {
      let isWriter = false;
      if (req.user !== undefined) {
        if (req.user.UNO === val.dataValues.UNO) {
          isWriter = true;
        }
      }
      let isUserLike = false;
      console.log(val);
      const isLike =
        req.user === undefined
          ? []
          : await POST_LIKE.findAll({
              where: { UNO: req.user.UNO, PNO: val.dataValues.PNO_POST.PNO },
            });
      console.log(isLike);
      if (isLike.length !== 0) {
        isUserLike = true;
      }
      val.dataValues.isWriter = isWriter;
      const postInfo = val.dataValues.PNO_POST;
      const data = {};
      data['likeCount'] = val.dataValues.likeCount;
      const user = await USER.findByPk(postInfo.UNO);
      data['userName'] = user.NICKNAME;
      data['userLevel'] = user.LEVEL;
      data['category'] = postInfo.CATEGORY;
      data['title'] = postInfo.TITLE || null;
      data['createdAt'] = postInfo.createdAt;
      data['content'] = postInfo.CONTENT;
      data['isWriter'] = isWriter;
      data['isUserLike'] = isUserLike;
      const replyNum = await POST_REPLY.findAll({
        attributes: [
          'PNO',
          [Sequelize.fn('COUNT', Sequelize.col('PNO')), 'Replies'],
        ],
        where: {
          PNO: postInfo.PNO,
        },
        group: ['PNO'],
      });
      if (replyNum.length !== 0) {
        data['reply'] = replyNum[0].dataValues.Replies;
      } else {
        data['reply'] = 0;
      }
      console.log(data);

      list.push(data);
    }

    console.log(list);
    res.send({
      success: true,
      message: 'Post List loaded successfully',
      data: list,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      success: false,
      message: 'Post List loaded failed',
    });
  }
});
router.post('/report/:postId', checkAccess, async (req, res) => {
  try {
    const postId = req.params.postId;
    const report = req.body.report;
    const [result, created] = await POST_REPORT.findOrCreate({
      where: {
        PNO: postId,
        UNO: req.user.UNO,
      },
      defaults: {
        REPORT: report,
      },
    });
    if (created) {
      return res.status(200).json({
        success: true,
        message: 'Post Report 성공',
      });
    } else {
      return res
        .status(200)
        .json({ success: false, message: 'Post Report 중복' });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Post Report 실패', error });
  }
});
