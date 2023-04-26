import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sql from '../../database/sql';
dotenv.config();

export function sign(userNumber) {
  // Access 토큰 생성 코드
  const payload = {
    type: 'JWT',
    unum: userNumber,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h',
    issuer: 'MixBowl',
  });
}

export function accessVerify(token) {
  //Access 토큰 확인 코드
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    return {
      ok: true,
      unum: decoded.unum,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
}

export function refresh() {
  // Refresh 토큰 생성 코드
  return jwt.sign({}, process.env.SECRET_KEY, {
    expiresIn: '14d',
    issuer: 'MixBowl',
  });
}

//토큰 header에 주고, db 내 refresh 토큰으로 확인
export async function refreshVerify(ref_token) {
  //Refresh 토큰 확인 코드
  //redis 도입하면 좋을듯
  try {
    jwt.verify(ref_token, process.env.SECRET_KEY);
    return true;
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
    console.log(decodeAccess.unum);

    if (decodeAccess === null) {
      res.status(401).send({
        ok: false,
        message: 'No Authorization for Access Token',
      });
    } else {
      const refreshResult = refreshVerify(refresh, decodeAccess.unum);

      if (accessResult.ok === false && accessResult.message === 'jwt expired') {
        if (refreshResult.ok === false) {
          res.status(401).send({
            ok: false,
            message: 'No Authorization, MAKE A NEW LOGIN',
          });
        } else {
          //refresh token이 유효하므로, 새로운 access token 발급
          const newAccessToken = sign(decodeAccess.unum);
          res.status(200).send({
            ok: true,
            accessToken: newAccessToken,
          });
        }
      } else if (accessResult.message === 'invalid signature') {
        res.status(403).send({
          ok: false,
          message: 'Invalid Access Token',
        });
      } else {
        res.status(400).send({
          ok: false,
          message: 'Access Token is not expired',
        });
      }
    }
  } else {
    res.status(400).send({
      ok: false,
      message: 'Access token and Refresh Token are needed for refresh',
    });
  }
};
