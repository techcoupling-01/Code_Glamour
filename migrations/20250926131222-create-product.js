"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cateid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      subcateid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "SubCategories",
          key: "id",
        },
      },
      brandid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Brands",
          key: "id",
        },
        
      },
      hsn_code: {
        type: Sequelize.STRING,
      },
      min_stock_level: {
        type: Sequelize.FLOAT,
      },
      model_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      unit: {
        allowNull: false,
        type: Sequelize.ENUM("Sq.Ft", "Bag", "Piece", "Box"),
      },
      desp: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      price_per_unit: {
        allowNull: false,
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("Products");
  },
};
