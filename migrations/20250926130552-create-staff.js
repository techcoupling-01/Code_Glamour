"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Staffs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mobile: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      join_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      leaving_date: {
        type: Sequelize.DATE,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM("Manager","Dispatcher","Receptionist","Worker"),
      },
      salary_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      base_salary: {
        type: Sequelize.FLOAT,
      },
      branchid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Branches",
          key: "id",
        }
      },
      userid: {allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
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
    await queryInterface.dropTable("Staffs");
  },
};
