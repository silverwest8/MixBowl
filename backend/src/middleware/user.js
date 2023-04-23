import sql from '../database/sql';

const user = {
  signUp: async (req, res) => {
    try {
      const success = await sql.signupUser(req);
      if (success) {
        return res.status(200).send({ success: true });
      } else {
        throw new Error();
      }
    } catch (error) {
      return res.status(403).send({ success: false });
    }
  },
};

export default user;
