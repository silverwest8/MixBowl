const checkEmail = (email) => {
  var reg_email =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (!reg_email.test(email)) {
    return false;
  } else {
    return true;
  }
};

const checkPassword = (password) => {
  if (password.length >= 8 && password.length <= 16) {
    const num = password.search(/[0-9]/g);
    const eng = password.search(/[a-z]/gi);
    if (num === -1) return false;
    if (eng === -1) return false;
    return true;
  }
  return false;
};

export { checkEmail, checkPassword };
