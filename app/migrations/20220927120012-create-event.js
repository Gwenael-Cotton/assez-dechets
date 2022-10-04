module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      place: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['ONGOING', 'UPCOMING', 'DONE'],
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      // creatorId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'Users',
      //     key: 'id',
      //   },
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('events');
  },
};
