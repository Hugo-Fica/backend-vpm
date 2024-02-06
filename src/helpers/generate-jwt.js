import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: '5d' },
      (err, token) => {
        if (err) {
          reject(new Error('token could not be generated'));
        } else {
          resolve(token);
        }
      },
    );
  });
};
