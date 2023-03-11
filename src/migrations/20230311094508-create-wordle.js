'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wordles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      nWinR1: {
        type: Sequelize.INTEGER,
      },
      nWinR2: {
        type: Sequelize.INTEGER,
      },
      nWinR3: {
        type: Sequelize.INTEGER,
      },
      nWinR4: {
        type: Sequelize.INTEGER,
      },
      nWinR5: {
        type: Sequelize.INTEGER,
      },
      nWinR6: {
        type: Sequelize.INTEGER,
      },
      nLose: {
        type: Sequelize.INTEGER,
      },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Wordles');
  },
};
