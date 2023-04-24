import * as user from "./user.js";

test("비밀번호의 유효성 체크 검사 1 - 숫자로만 이루어짐",()=>{
    expect(user.checkPassword('12345678')).toEqual(false);
})

test("비밀번호의 유효성 체크 검사 2 - 영어로만 이루어짐",()=>{
    expect(user.checkPassword('Aafaefee')).toEqual(false);
})

test("비밀번호의 유효성 체크 검사 3 - 8~16자",()=>{
    expect(user.checkPassword('12345')).toEqual(false);
})

test("비밀번호의 유효성 체크 검사 4 - 성공",()=>{
    expect(user.checkPassword('12345678a')).toEqual(true);
})
