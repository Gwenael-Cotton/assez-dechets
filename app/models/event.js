module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    place: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER,
  }, {});
  Event.associate = function (models) {
    Event.belongsTo(models.User, {
      foreignKey: 'creatorId',
      onDelete: 'CASCADE',
    });
  };
  return Event;
};
