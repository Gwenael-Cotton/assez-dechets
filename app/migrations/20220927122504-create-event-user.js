module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EventUsers', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      eventId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EventUsers');
  },
};
