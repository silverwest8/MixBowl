import express from "express";
const router = express.Router();

export default router.get("/", (req, res) => {
    res.send("Index page will be rendered");
});

