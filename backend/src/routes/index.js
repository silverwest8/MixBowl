'use strict';

import express from 'express';
const router = express.Router();

import main from './main';
import user from './user';
import recipe from './recipe';
import review from './review';
import data from './data';

router.use('/', main);
router.use('/users', user);
router.use('/recipes', recipe);
router.use('/reviews', review);
router.use('/data', data);

export default router;
