'use strict';

import express from 'express';
const router = express.Router();

import main from './main';
import home from './home';
import user from './user';
import recipe from './recipe';
import community from './community';
import review from './review';
import data from './data';
import mypage from './mypage';

router.use('/', main);
router.use('/home', home);
router.use('/users', user);
router.use('/communities', community);
router.use('/recipes', recipe);
router.use('/reviews', review);
router.use('/mypages', mypage);
router.use('/data', data);

export default router;
