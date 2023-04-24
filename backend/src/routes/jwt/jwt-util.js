import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sql from '../../database/sql';
dotenv.config();

export function sign (username) {
  // Access 토큰 생성 코드
  const payload = {
    type: 'JWT',
    nickname: username,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h',
    issuer: 'MixBowl',
  });
}

export function accessVerify (token) {
  //Access 토큰 확인 코드
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    return {
      ok: true,
      nickname: decoded.nickname[0]['NICKNAME'],
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
}

export function refresh () {
  // Refresh 토큰 생성 코드
  return jwt.sign({}, process.env.SECRET_KEY, {
    expiresIn: '14d',
    issuer: 'MixBowl',
  });
}

//토큰 header에 주고, db 내 refresh 토큰으로 확인
export async function refreshVerify (token, username) {
  //Refresh 토큰 확인 코드
  //redis 도입하면 좋을듯
  try {
    const refToken = await sql.getToken(username);
    if (token === refToken) {
      try {
        jwt.verify(token, process.env.SECRET_KEY);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

// header에 "authorization", "refresh"에 각각 토큰정보 넣어줄 것
export const refresh_new = async (req, res) => {
  if (req.headers.authorization && req.headers.refresh) {
    const access = req.headers.authorization;
    const refresh = req.headers.refresh;

    const accessResult = accessVerify(access);
    const decodeAccess = jwt.decode(access);

    if (decodeAccess === null) {
      res.status(401).send({
        ok: false,
        message: 'No Authorization for Access Token',
      });
    }
    else {
      const refreshResult = refreshVerify(refresh, decodeAccess.nickname);

<<<<<<< HEAD
    const refreshResult = refreshVerify(refresh, decodeAccess.nickname);

    if (accessResult.ok === false && accessResult.message === 'jwt expired') {
      if (refreshResult.ok === false) {
        res.status(401).send({
          ok: false,
          message: 'No Authorization, MAKE A NEW LOGIN',
        });
=======
      if (accessResult.ok === false && accessResult.message === "jwt expired") {
        if (refreshResult.ok === false) {
          res.status(401).send({
            ok: false,
            message: "No Authorization, MAKE A NEW LOGIN",
          });
        } else {
          //refresh token이 유효하므로, 새로운 access token 발급
          const newAccessToken = sign(req.body.nickname);
          res.status(200).send({
            ok: true,
            accessToken: newAccessToken
          });
        }
>>>>>>> backend-jwt
      } else {
        res.status(400).send({
          ok: false,
          message: "Access Token is not expired",
        });
      }
<<<<<<< HEAD
    } else {
      res.status(400).send({
        ok: false,
        message: 'Access Token is not expired',
      });
=======
>>>>>>> backend-jwt
    }
  } else {
    res.status(400).send({
      ok: false,
      message: 'Access token and Refresh Token are needed for refresh',
    });
  }
};
