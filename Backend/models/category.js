'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    title: DataTypes.STRING,
    desp: DataTypes.TEXT,
    image: DataTypes.STRING,
    status: DataTypes.STRING,
    hsn_code: DataTypes.STRING,
    min_stock_level: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};