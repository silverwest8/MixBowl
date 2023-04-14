import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); //JWT 키불러오기

//인증 필요한 expree router에 적용할 미들웨어를 작성한 함수

export default (req, res, next) => {
  // 인증 완료
  try {
    //req.headers.authorization = access Token일 경우
    req.decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    return next();
  } catch (error) {
    //유효시간 만료
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        ok: false,
        message: "토큰이 만료되었습니다.",
      });
    }
    //비밀키 일치 오류
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        ok: false,
        message: "유효하지 않은 토큰입니다",
      });
    }
  }
};
