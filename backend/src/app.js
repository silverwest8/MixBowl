import express from "express";
import Routers from "./routes/index";
const app = express();
const port = 3030;

//---- 모든 요청 응답 확인
app.use((req, res, next) => {
  console.log("logging for routers");
  next();
});

//---- json형식으로 바꾸기
app.use(express.json());

//---- 라우터 시작 -> index.js에 라우터정보 모음
app.use("/", Routers);

//---- 서버 시작
app.listen(port, () => {
  console.log(`Server on "${port}" PortNum`);
});
