import express from "express";
const router = express.Router();

import main from "./main";
import user from "./user";

router.use('/', main);
router.use('/user',user);
