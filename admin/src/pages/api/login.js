import { db } from "@/lib/database";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request
      try {
        const { email, password } = req.body;
        const admin = await db.ADMIN.findOne({
          where: { email: email, password: password },
        });
        if (admin) {
          const payload = {
            type: 'JWT',
            unum: admin.UNO,
          };
          const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1d',
            issuer: 'MixBowl',
          });
          return res.status(200).json({ success: true, accessToken });
        } else {
          return res.status(400).json({ success: false });
        }
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    } else {
      return res.status(404).json({ success: false });
    }
  }