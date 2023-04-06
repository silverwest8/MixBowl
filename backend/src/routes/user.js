import express from "express";
import sql from "../database/sql";
const router = express.Router();

//---- 연동확인
router.get('/',async (req,res)=>{
    const users = await sql.getUser()
    console.log(users);
    res.send(users);        
})

router.post('/login',(req,res)=>{
    res.send("Login Post page will be rendered");
})
router.get("/logout", (req, res) => {
    res.send("Logout Get page will be rendered");
});

router.post('/signup',async (req,res)=>{
    try{
        await sql.signupUser(req);
        console.log('hi');
        res.status(200).send({success:true});
    }catch(error){
        console.log('false',req.body);
        res.send({success:false});
    }
})
export default router;