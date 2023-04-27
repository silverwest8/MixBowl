'use strict';

import express from 'express';
import Routers from './routes/index';
import { swaggerUi, specs } from './swagger/swagger';
import { sequelize } from './models';
import { logger } from '../winston/winston';

const app = express();
const port = 3030;

//---- 모든 요청 응답 확인
app.use((req, res, next) => {
  logger.info('logging for routers');
  next();
});

//---- json형식으로 바꾸기
app.use(express.json());

//---- 라우터 시작 -> index.js에 라우터정보 모음
app.use('/', Routers);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

sequelize
  .sync({ force: false }) //true면 서버 실행마다 테이블 재생성
  .then(() => {
    logger.info('Mysql Connecting Success with Sequelize');
  })
  .catch((err) => {
    console.error(err);
  });

//---- 서버 시작
app.listen(port, () => {
  logger.info(`Server on "${port}" PortNum`);
});
