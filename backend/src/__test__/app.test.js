import * as user from './user.js';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config(); //JWT 키불러오기

// pool 을 사용한 이유 -> Connection 계속 유지하므로 부하 적어짐. (병렬 처리 가능)
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'a1573289',
    database: 'test_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
);

const nickname = console.log(sql.test());
// 테스트용 DB 연걸할것
test('test db 연동 확인', () => {
  expect(
    promisePool
      .query(
        `
    SELECT NICKNAME FROM USER
  ;`
      )
      .toEqual(['test'])
  );
});
test('비밀번호의 유효성 체크 검사 1 - 숫자로만 이루어짐', () => {
  expect(user.checkPassword('12345678')).toEqual(false);
});

test('비밀번호의 유효성 체크 검사 2 - 영어로만 이루어짐', () => {
  expect(user.checkPassword('Aafaefee')).toEqual(false);
});

test('비밀번호의 유효성 체크 검사 3 - 8~16자', () => {
  expect(user.checkPassword('12345')).toEqual(false);
});

test('비밀번호의 유효성 체크 검사 4 - 성공', () => {
  expect(user.checkPassword('12345678a')).toEqual(true);
});
