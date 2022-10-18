module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    numberParticipations: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {});

  User.associate = (models) => {
    User.hasMany(models.Event, {
      foreignKey: 'userId',
    });
  };

  return User;
};
