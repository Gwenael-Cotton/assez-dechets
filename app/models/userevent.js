module.exports = (sequelize, DataTypes) => {
  const { User, Event } = sequelize.models;
  const UserEvent = sequelize.define('UserEvent', {}, { timestamps: false });

  User.belongsToMany(Event, { through: UserEvent });
  Event.belongsToMany(User, { through: UserEvent });

  // UserEvent.associate = (models) => {
  //   UserEvent.hasMany(models.AuthToken, {
  //     foreignKey: 'userId',
  //   });
  // };

  return UserEvent;
};
