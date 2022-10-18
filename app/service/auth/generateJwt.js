const jwt = require('jsonwebtoken');

const generateUserToken = async (user) => {
  const accessToken = jwt.sign({
    id: user.id,
  }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: '1h',
  });

  const refreshToken = jwt.sign({
    id: user.id,
  }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: '7d',
  });

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

module.exports = {
  generateUserToken,
};
