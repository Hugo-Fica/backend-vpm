import { response, request } from 'express';
import { User } from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import { generateJWT } from '../helpers/generate-jwt.js';

export const login = async (req = request, res = response) => {
  const { email, pass } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({
        msg: 'email is not correct',
      });
    }
    if (!user.state) {
      return res.status(400).json({
        msg: 'user not found in database',
      });
    }
    const validPass = bcryptjs.compareSync(pass, user.pass);
    if (!validPass) {
      return res.status(400).json({
        msg: 'password is not correct',
      });
    }
    const token = await generateJWT(user.id);
    res.json({ token });
  } catch (e) {
    res.status(500).json({
      msg: 'talk to the administrator',
    });
  }
};
