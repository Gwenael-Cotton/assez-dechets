const jwt = require('jsonwebtoken');
// const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('AuthToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    // freezeTableName: true
  });

  // set up the associations so we can make queries that include
  // the related objects
  AuthToken.associate = (models) => {
    AuthToken.belongsTo(models.User);
  };

  // generates token and
  // associates it with a user
  AuthToken.generate = async (id) => {
    if (!id) {
      throw new Error('AuthToken requires a user ID');
    }

    const maxAge = 1 * 24 * 60 * 60 * 1000; // 24h

    // eslint-disable-next-line max-len
    const createToken = (userid) => jwt.sign({ userid }, process.env.TOKEN_SECRET_KEY, { expiresIn: maxAge });

    const token = createToken(id);

    return AuthToken.create({ token, id });
  };

  return AuthToken;
};
