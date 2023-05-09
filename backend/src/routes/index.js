'use strict';

import express from 'express';
const router = express.Router();

import main from './main';
import user from './user';
import recipe from './recipe';
import review from './review';
import admin from "./admin";

router.use('/', main);
router.use('/users', user);
router.use('/recipes', recipe);
router.use('/reviews', review);
router.use('/admin', admin);

export default router;
