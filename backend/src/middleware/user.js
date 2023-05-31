import sql from '../database/sql';

const user = {
  signUp: async (req, res) => {
    try {
      const success = await sql.signupUser(req);
      console.log(success);
      if (success) {
        return res.status(200).send({ success: true });
      } else {
        throw new Error();
      }
    } catch (error) {
      return res.status(403).send({ success: false, message: error.message });
    }
  },
  delUser: async (req, res) => {
    try {
      req.user.destroy();
      return res.status(200).json({ success: true, message: '회원 탈퇴 성공' });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: '회원 탈퇴 실패', error });
    }
  },
};

export default user;
