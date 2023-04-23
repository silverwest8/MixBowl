jest.mock('../database/sql.js');
import sql from '../database/sql.js';
import * as userTest from './user.js';
import userUtil from '../middleware/user.js';
// import mysql from 'mysql2';

describe('회원가입 체크', () => {
  const req = {
    nickname: 'testNickname',
    email: 'testcode@gmail.com',
    password: 'a12345678',
  };
  const res = {
    status: jest.fn(() => res), //체이닝 하므로 자기자신
    send: jest.fn(),
  };

  //테스트 분기 1
  test('회원 가입 성공', async () => {
    // User 정보 create return값 강제 지정
    sql.signupUser.mockReturnValue(Promise.resolve());
    await userUtil.signUp(req, res);
    expect(res.send).toBeCalledWith({ success: true });
  });
});

// 테스트용 DB 연걸할것

test('비밀번호의 유효성 체크 검사 1 - 숫자로만 이루어짐', () => {
  expect(userTest.checkPassword('12345678')).toEqual(false);
});

test('비밀번호의 유효성 체크 검사 2 - 영어로만 이루어짐', () => {
  expect(userTest.checkPassword('Aafaefee')).toEqual(false);
});

test('비밀번호의 유효성 체크 검사 3 - 8~16자', () => {
  expect(userTest.checkPassword('12345')).toEqual(false);
});

test('비밀번호의 유효성 체크 검사 4 - 성공', () => {
  expect(userTest.checkPassword('12345678a')).toEqual(true);
});
