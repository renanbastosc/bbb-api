'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('elimination_house_guests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      elimination_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'eliminations',
          },
          key: 'id'
        },
        allowNull: false
      },
      house_guest_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'house_guests',
          },
          key: 'id'
        },
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('elimination_house_guests');
  }
};