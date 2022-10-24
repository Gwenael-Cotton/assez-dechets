const jwt = require('jsonwebtoken');

const setDecodedToken = async (req, _, next) => {
  try {
    const header = req.headers.authorization.split(' ');
    const token = header[1];
    if (token) {
      const tokenDecoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      req.user = tokenDecoded;
    }
  } catch (e) {
    console.log('bad token', e);
  }

  next();
};

const checkUserIsLogged = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      error: 'Vous devez être connecter',
    });
  }
};

module.exports = {
  setDecodedToken,
  checkUserIsLogged,
};
