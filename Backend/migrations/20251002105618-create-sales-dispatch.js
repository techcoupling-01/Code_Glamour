'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SalesDispatches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
          allowNull: false,
        type: Sequelize.DATE
      },
      dispatcherid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Staffs",
          key: "id",
        },
      },
      salesid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Sales",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SalesDispatches');
  }
};