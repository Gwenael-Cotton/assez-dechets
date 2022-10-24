const jwt = require('jsonwebtoken');

const setDecodedToken = async(req, _, next) => {
  // CHECK HEADER CONNARD
  try {
    console.log(req.headers);
    const { cookie } = await req.headers;
    console.log("COOKIE HEADER : ",cookie.split(' '));
    const token = cookie.split(' ');
    console.log("TOKEN SPLIT : ",token[0]);
    if (token) {
      const tokenDecoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
      req.user = tokenDecoded;
    }
  } catch (e) {
    console.log('bad token', e);
  }

  next();
};

const checkUserIsLogged = (req, res, next) => {
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
