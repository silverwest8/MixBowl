import express from "express";
const router = express.Router();

import main from "./main";
import user from "./user";
import recipe from "./recipe";

router.use("/", main);
router.use("/user", user);
router.use("/recipe", recipe);

export default router;
