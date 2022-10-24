module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    place: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.STRING,
    status: DataTypes.ENUM('ONGOING', 'UPCOMING', 'DONE'),
    weight: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {});
  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Event;
};
