import sql from '../database/sql';

const user = {
  signUp: async (req, res) => {
    try {
      const success = await sql.signupUser(req);
      res.status(200).send({ success: true });
    } catch (error) {
      res.send({ success: false });
    }
  },
};

export default user;
