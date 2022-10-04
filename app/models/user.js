const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberParticipations: DataTypes.INTEGER,
  }, {
    // freezeTableName: true,
  });

  User.associate = (models) => {
    User.hasMany(models.AuthToken);
  };

  User.authenticate = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }

    throw new Error('invalid password');
  };

  User.prototype.authorize = async function () {
    const { AuthToken } = sequelize.models;
    const user = this;

    const authToken = await AuthToken.generate(this.id);

    // addAuthToken is a generated method provided by
    // sequelize which is made for any 'hasMany' relationships
    await user.addAuthToken(authToken);

    return { user, authToken };
  };

  User.prototype.logout = async (token) => {
    // destroy the auth token
    sequelize.models.AuthToken.destroy({ where: { token } });
  };

  return User;
};
