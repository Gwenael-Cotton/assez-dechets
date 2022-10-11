const jwt = require('jsonwebtoken');
const { JWT_ISSUER, UNAUTHORIZED, JWT_ERROR } = require('../constants');

module.exports = {
  signAccessToken: async (userId) => new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '1h',
      issuer: JWT_ISSUER,
      audience: userId.toString(),
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      resolve(token);
    });
  }),

  verifyAccessToken: async (req, res, next) => {
    if (!req.headers.authorization) return next();
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message = err.name === JWT_ERROR ? UNAUTHORIZED : err.message;
        return next(message);
      }
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: async (userId) => new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: '1w',
      issuer: JWT_ISSUER,
      audience: userId.toString(),
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(err);
      }
      resolve(token);
    });
  }),

  verifyRefreshToken: async (refreshToken) => new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) return reject(err);
        const userId = payload.aud;
      },
    );
  }),
};
