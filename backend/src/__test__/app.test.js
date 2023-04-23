jest.mock('../database/sql.js');
import sql from '../database/sql.js';
import * as userTest from '../validation/user.js';
import userUtil from '../middleware/user.js';
// import mysql from 'mysql2';

describe('회원가입 체크', () => {
  const res = {
    status: jest.fn(() => res), //체이닝 하므로 자기자신
    send: jest.fn(),
  };

  //테스트 분기 1
  test('회원 가입 성공', async () => {
    // User 정보 create return값 강제 지정
    let check = true;
    const req = {
      nickname: 'testNickname',
      email: 'testcode@gmail.com',
      password: 'a12345678',
    };
    if (userTest.checkPassword(req.password) === false) {
      check = false;
    }
    if (userTest.checkEmail(req.email) === false) {
      check = false;
    }
    if (check) {
      sql.signupUser.mockReturnValue(Promise.resolve());
      await userUtil.signUp(req, res);
      expect(res.send).toBeCalledWith({ success: true });
    }
  });
  test('회원 가입 실패', async () => {
    // User 정보 create return값 강제 지정
    let check = true;
    const req = {
      nickname: 'testNickname',
      email: 'testcode@gmail.com',
      password: 'a678',
    };
    if (userTest.checkPassword(req.password) === false) {
      check = false;
    }
    if (userTest.checkEmail(req.email) === false) {
      check = false;
    }
    if (!check) {
      sql.signupUser.mockReturnValue(Promise.reject());
      await userUtil.signUp(req, res);
      expect(res.send).toBeCalledWith({ success: false });
    }
  });
});

describe('비밀번호 유효성 검사', () => {
  test('숫자로만 이루어진 경우', () => {
    expect(userTest.checkPassword('12345678')).toEqual(false);
  });

  test('영어로만 이루어진 경우', () => {
    expect(userTest.checkPassword('Aafaefee')).toEqual(false);
  });

  test('8~16자가 아닌 경우', () => {
    expect(userTest.checkPassword('12345')).toEqual(false);
  });

  test('성공', () => {
    expect(userTest.checkPassword('12345678a')).toEqual(true);
  });
});

describe('이메일 유효성 검사', () => {
  test('@가 없는 경우', () => {
    expect(userTest.checkEmail('afeiwaofaew.com')).toEqual(false);
  });
  test('도메인 네임 마지막이 너무 긴 경우', () => {
    expect(userTest.checkEmail('afeiwaofaew@naver.cowrwm.kwerawrewra')).toEqual(
      false
    );
  });
  test('이메일에 한글이 들어간 경우', () => {
    expect(userTest.checkEmail('afeiwwㄷㅁ@naver.com')).toEqual(false);
  });
  test('이메일유효성 검사 성공', () => {
    expect(userTest.checkEmail('afeiww@naver.co.kr')).toEqual(true);
  });
});
