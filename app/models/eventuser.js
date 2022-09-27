const User = require('./user');
const Event = require('./event');

module.exports = (sequelize, DataTypes) => {
  const EventUser = sequelize.define('EventUser', {}, { timestamps: false });

  User.belongsToMany(Event, { through: 'EventUser', foreignKey: 'userId' });
  Event.belongsToMany(User, { through: 'EventUser', foreignKey: 'eventId' });

  return EventUser;
};
