import express from "express";
import sql from "../database/sql";
const router = express.Router();

//---- 연동확인
router.get('/',async (req,res)=>{
    const users = await sql.getUser()
    console.log(users);
    res.send(users);        
})

// 회원가입
router.post('/signup',async (req,res)=>{
    try{
        await sql.signupUser(req);
        res.status(200).send({success:true});
    }catch(error){
        res.send({success:false});
    }
})

// 로그인
router.post('/login', async(req,res)=>{
    try{
        const nickname = await sql.loginUser(req);
        if (nickname.length === 0){
            throw new Error();
        }
        res.status(200).send({
            success:true,
            nickname: nickname[0]["NICKNAME"]
        });
    }catch(error){
        res.send({success:false})
    }
})
export default router;