import express from "express";
const router = express.Router();

router.post('/login',(req,res)=>{
    res.send("Login Post page will be rendered");
})
router.get("/logout", (req, res) => {
    res.send("Logout Get page will be rendered");
});

