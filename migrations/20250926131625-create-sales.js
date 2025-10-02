"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clientid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Clients",
          key: "id",
        },
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      billamount: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      branchid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Branches",
          key: "id",
        },
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM("customer", "dealer"),
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM("booked", "dispatched", "done"),
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
    await queryInterface.dropTable("Sales");
  },
};
