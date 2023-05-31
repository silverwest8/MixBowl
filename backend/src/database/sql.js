import * as jwt_module from '../routes/jwt/jwt-util';
import USER from '../models/USER';
import REVIEW from '../models/REVIEW';
import IMAGE from '../models/IMAGE';
import KEYWORD from '../models/KEYWORD';
import POST from '../models/POST';
import COCKTAIL from '../models/COCKTAIL';
import POST_LIKE from '../models/POST_LIKE';
import POST_REPLY from '../models/POST_REPLY';
import fs from 'fs';
import IMAGE_COMMUNITY from '../models/IMAGE_COMMUNITY';

const sql = {
  getUser: async () => {
    const user = await USER.findAll();
    return user;
  },

  //refresh token 조회
  //안쓸듯
  getToken: async (username) => {
    const reToken = await promisePool.query(`
      SELECT TOKEN FROM USER WHERE '${username}' = NICKNAME;
    `);
    return reToken;
  },

  namedupcheck: async (req) => {
    const { checkname } = req.body;
    try {
      const check = await USER.findAndCountAll({
        where: { NICKNAME: checkname },
      });
      return check['count'];
    } catch (error) {
      console.log(error.message);
    }
  },

  emaildupcheck: async (req) => {
    const { checkemail } = req.body;
    try {
      const check = await USER.findAndCountAll({
        where: { EMAIL: checkemail },
      });

      return check['count'];
    } catch (error) {
      console.log(error.message);
    }
  },

  signupUser: async (req) => {
    const { nickname, email, password } = req.body; // regitserInfo에는 Nickname, Email, Password 가 포함되어야 함.
    console.log(nickname, email, password);
    try {
      await USER.create({
        NICKNAME: nickname,
        PASSWORD: password,
        EMAIL: email,
        LEVEL: 1,
      });
      return true;
    } catch (error) {
      console.log(error.message);
    }
  },

  loginUser: async (req) => {
    const { email, password } = req.body;
    try {
      const user = await USER.findOne({
        where: { email: email, password: password },
      });
      const unum = user.UNO;
      if (!(unum > 0)) {
        throw new Error('Invalid Info User');
      }

      //UNO 도 같이 포함
      const accessToken = jwt_module.sign(unum);
      const refreshToken = jwt_module.refresh();

      //refresh token sql 업데이트
      //일단 냅둘게요 (아마 안쓸듯)
      // await promisePool.query(`
      //   UPDATE USER SET TOKEN = '${refreshToken}' WHERE NICKNAME = '${username}';
      // `);
      return {
        code: 200,
        message: '토큰이 발급되었습니다.',
        token: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      console.log(error.message);
      return {
        code: 401,
      };
    }
  },

  getReview: async (req) => {
    const reviewId = req.params.reviewId;
    try {
      const review = await REVIEW.findByPk(reviewId);
      const { TEXT, RATING } = review.dataValues;
      const keyword = await KEYWORD.findAll({
        where: { REVIEW_ID: reviewId },
      });
      const keyword_arr = [];
      keyword.forEach((key) => {
        keyword_arr.push(key.dataValues.KEYWORD);
      });
      return {
        rating: RATING,
        keyword: keyword_arr,
        detail: TEXT,
      };
    } catch (error) {
      console.log(error.message);
    }
  },
  postReview: async (req) => {
    const unum = req.decoded.unum;
    console.log(req.body.data);
    const data = JSON.parse(req.body.data);
    console.log('data', data);
    const { placeId, rating, detail, keyword } = data;
    try {
      const review = await REVIEW.create({
        UNO: unum,
        PLACE_ID: placeId,
        TEXT: detail,
        RATING: rating,
      });
      console.log('keyword', keyword);
      console.log('review', review);
      console.log('reviewId', review.REVIEW_ID);
      keyword.forEach(async (keyword) => {
        await KEYWORD.create({
          REVIEW_ID: review.REVIEW_ID,
          KEYWORD: keyword,
        });
      });
      return review;
    } catch (error) {
      console.log(error.message);
    }
  },
  postCommunity: async (req) => {
    const unum = req.decoded.unum;
    console.log(req.body.data);
    const category = req.query.category;
    const data = JSON.parse(req.body.data);
    console.log('data', data);
    try {
      if (category === '1') {
        //칵테일 추천
        const { title, content } = data;
        const post = await POST.create({
          UNO: unum,
          CATEGORY: category,
          TITLE: title,
          CONTENT: content,
        });
        return post;
      } else if (category === '2') {
        //질문과 답변
        const { content } = data;
        const post = await POST.create({
          UNO: unum,
          CATEGORY: category,
          CONTENT: content,
        });
        return post;
      } else if (category === '3') {
        //칵테일 리뷰 -> 제목 = 타이틀
        const { title, content, like, cno } = data;
        const post = await POST.create({
          UNO: unum,
          CATEGORY: category,
          TITLE: title,
          CONTENT: content,
          CNO: cno,
          LIKE: like,
        });
        return post;
      } else if (category === '4') {
        //자유게시판
        const { title, content } = data;
        const post = await POST.create({
          UNO: unum,
          CATEGORY: category,
          TITLE: title,
          CONTENT: content,
        });
        return post;
      } else {
        throw new Error('invalid category');
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  changeCommunity: async (req, pno) => {
    const unum = req.decoded.unum;
    const data = JSON.parse(req.body.data);
    console.log('data', data);
    const return_obj = { PNO: pno };
    try {
      if (data.category === 1) {
        //칵테일 추천
        const { title, content } = data;
        const post = await POST.update(
          {
            TITLE: title,
            CONTENT: content,
          },
          { where: { PNO: pno } }
        );
        return return_obj;
      } else if (data.category === 2) {
        //질문과 답변
        const { content } = data;
        const post = await POST.update(
          {
            CONTENT: content,
          },
          { where: { PNO: pno } }
        );
        return return_obj;
      } else if (data.category === 3) {
        //칵테일 리뷰 -> 제목 = 타이틀
        const { title, content, like, cno } = data;
        const post = await POST.update(
          {
            TITLE: title,
            CONTENT: content,
            CNO: cno,
            LIKE: like,
          },
          { where: { PNO: pno } }
        );
        return return_obj;
      } else if (data.category === 4) {
        //자유게시판
        const { title, content } = data;
        const post = await POST.update(
          {
            TITLE: title,
            CONTENT: content,
          },
          { where: { PNO: pno } }
        );
        return return_obj;
      } else {
        throw new Error('invalid category');
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  postReply: async (req, pno) => {
    const content = req.body.content;
    await POST_REPLY.create({
      UNO: req.user.dataValues.UNO,
      PNO: pno,
      CONTENT: content,
    });
  },
  changeReply: async (req, replyId) => {
    const content = req.body.content;
    try {
      await POST_REPLY.update(
        {
          CONTENT: content,
        },
        { where: { PRNO: replyId } }
      );
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteReply: async (req, replyId) => {
    try {
      await POST_REPLY.destroy({
        where: { PRNO: replyId },
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getReplyUno: async (replyId) => {
    const reply = await POST_REPLY.findByPk(replyId);
    return reply.UNO;
  },
  makePostLike: async (uno, pno) => {
    try {
      await POST_LIKE.create({
        UNO: uno,
        PNO: pno,
      });
      return 1;
    } catch (error) {
      if (error.message === 'Validation error') {
        return 2;
      }
      console.log(error.message);
      return 3;
    }
  },
  deletePostLike: async (uno, pno) => {
    try {
      await POST_LIKE.destroy({
        where: { UNO: uno, PNO: pno },
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getCommunityPost: async (req) => {},
  postImage: async (req, db) => {
    try {
      let categoryDb = 0; //review 참조
      let communityId;
      let reviewId;
      if (db.REVIEW_ID === undefined) {
        communityId = Number(db.PNO);
        categoryDb = 1; // community(Post) 참조
      } else {
        reviewId = db.REVIEW_ID;
      }
      req.files.map(async (data) => {
        let path = data.path;
        try {
          if (categoryDb === 0) {
            await IMAGE.create({
              REVIEW_ID: reviewId,
              PATH: path,
            });
          } else if (categoryDb === 1) {
            await IMAGE_COMMUNITY.create({
              PNO: communityId,
              PATH: path,
            });
          }
        } catch (error) {
          console.log(error.message);
        }
      });
      return true;
    } catch (error) {
      console.log(error.message);
    }
  },
  getCocktails: async () => {
    const cocktails = await COCKTAIL.findAll({
      attributes: ['NAME', 'CNO'],
    });
    return cocktails;
  },
  getImageId: async (reviewId) => {
    const idArr = [];
    try {
      const images = await IMAGE.findAll({
        where: {
          REVIEW_ID: reviewId,
        },
      });
      images.forEach((img) => {
        idArr.push(img.IMAGE_ID);
      });
      return idArr;
    } catch (error) {
      console.log(error.message);
    }
  },
  changeReview: async (req) => {
    const unum = req.decoded.unum;
    console.log(unum);
    const data = JSON.parse(req.body.data);
    const reviewId = req.params.reviewId;
    const review = await REVIEW.findByPk(reviewId);
    if (review.UNO === req.user.UNO) {
      console.log('권한 확인');
    } else {
      throw new Error('no authorization to modify review');
    }
    if (review !== null) {
      try {
        await REVIEW.update(
          {
            RATING: data.rating,
            TEXT: data.detail,
          },
          { where: { REVIEW_ID: reviewId } }
        );
        await KEYWORD.destroy({
          where: {
            REVIEW_ID: reviewId,
          },
        });
        data.keyword.forEach(async (key) => {
          await KEYWORD.create({
            REVIEW_ID: reviewId,
            KEYWORD: key,
          });
        });
      } catch (error) {
        console.log(error.message);
      }
      return review;
    } else {
      console.log('There is no review of URI parameter reviewId');
    }
    // const { rating, detail, keyword } = data;
  },
  deleteReview: async (req) => {
    const unum = req.decoded.unum;
    console.log(unum);
    const reviewId = req.params.reviewId;
    const review = await REVIEW.findByPk(reviewId);
    if (review.UNO === req.user.UNO) {
      console.log('권한 확인');
    } else {
      throw new Error('no authorization to modify review');
    }
    if (review !== null) {
      try {
        await REVIEW.destroy({ where: { REVIEW_ID: reviewId } });
        await KEYWORD.destroy({
          where: {
            REVIEW_ID: reviewId,
          },
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  deletePost: async (req) => {
    const unum = req.decoded.unum;
    const postId = req.params.postId;
    const post = await POST.findByPk(postId);
    if (post.UNO === req.user.UNO) {
      console.log('권한 확인');
    } else {
      throw new Error('no authorization to delete post');
    }
    if (post !== null) {
      try {
        await POST.destroy({ where: { PNO: postId } });
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  deleteImage: async (req, res, next) => {
    const reviewId = req.params.reviewId;
    console.log('check');
    if (reviewId !== undefined) {
      try {
        const images = await IMAGE.findAll({
          where: {
            REVIEW_ID: reviewId,
          },
        });
        images.forEach((img) => {
          fs.unlink(img.PATH, (err) => {
            if (err) throw err;
            console.log('delete success');
          });
        });
        await IMAGE.destroy({
          where: {
            REVIEW_ID: reviewId,
          },
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const postId = req.params.postId;
      try {
        if (postId !== undefined) {
          const images = await IMAGE_COMMUNITY.findAll({
            where: {
              PNO: postId,
            },
          });
          images.forEach((img) => {
            fs.unlink(img.PATH, (err) => {
              if (err) throw err;
              console.log('delete success');
            });
          });
          await IMAGE_COMMUNITY.destroy({
            where: {
              PNO: postId,
            },
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    return next();
  },
  getImagePath: async (imageId, category) => {
    try {
      if (category === 'review') {
        const image = await IMAGE.findByPk(imageId);
        return image.PATH;
      } else if (category === 'community') {
        const image_communty = await IMAGE_COMMUNITY.findByPk(imageId);
        return image_communty.PATH;
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default sql;
