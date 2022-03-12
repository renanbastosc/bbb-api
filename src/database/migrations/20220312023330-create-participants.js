'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('participants', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      timesBrickedUp: {
        type: Sequelize.INTEGER
      },
      occupation: {
        type: Sequelize.STRING
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('participants');
  }
};
