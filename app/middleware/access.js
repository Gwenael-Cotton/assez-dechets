const jwt = require('jsonwebtoken');
const { WRONG_TOKEN, LOGIN_MANDATORY } = require('../constants');

const setDecodedToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization.split(' ');
    const token = header[1];
    if (token) {
      const tokenDecoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      req.user = tokenDecoded;
    }
  } catch (e) {
    return res.status(401).json({ error: WRONG_TOKEN });
  }

  next();
};

const checkUserIsLogged = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({
      error: LOGIN_MANDATORY,
    });
  }
};

module.exports = {
  setDecodedToken,
  checkUserIsLogged,
};
