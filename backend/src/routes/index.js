'use strict';

import express from 'express';
const router = express.Router();

import main from './main';
import user from './user';
import recipe from './recipe';
import review from './review';

router.use('/', main);
router.use('/user', user);
router.use('/recipes', recipe);
router.use('/reviews', review);

export default router;
