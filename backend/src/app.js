import express from "express";
const app = express();
const port = 3000;

//---- 모든 요청 응답 확인
app.use((req,res,next)=>{
  console.log("logging for routers");
})
//---- json형식으로 바꾸기
app.use(express.json());
  
app.listen(port, () => {
    console.log(`Server on "${port}" PortNum`);
});