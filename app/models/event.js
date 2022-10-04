module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    place: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.STRING,
    status: DataTypes.ENUM('ONGOING', 'UPCOMING', 'DONE'),
    weight: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER,
  }, {});
  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'creatorId',
      onDelete: 'CASCADE',
    });
  };
  return Event;
};
