module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });

     */
    // await queryInterface.createTable('EventUser', {
    //   userId: Sequelize.INTEGER,
    //   eventId: Sequelize.INTEGER,
    // },
    // )
    await queryInterface.addConstraint('EventUsers', {
      type: 'FOREIGN KEY',
      name: 'FK_Event_Id',
      fields: ['eventId'],
      references: {
        table: 'Events',
        field: 'id',
      },
      onDelete: 'cascade',
    });

    await queryInterface.addConstraint('EventUsers', {
      type: 'FOREIGN KEY',
      name: 'FK_User_Id',
      fields: ['userId'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeConstraint('EventUsers', 'FK_Event_Id');
    await queryInterface.removeConstraint('EventUsers', 'FK_User_Id');
  },
};
