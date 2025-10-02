'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{
        foreignKey: "cateid"
      });
      Product.belongsTo(models.SubCategory,{
        foreignKey: "subcateid"
      });
      Product.belongsTo(models.Brand,{
        foreignKey: "brandid"
      })
    }
  }
  Product.init({
    model_number: DataTypes.STRING,
    unit: DataTypes.STRING,
    desp: DataTypes.TEXT,
    price_per_unit: DataTypes.FLOAT,
    hsn_code: DataTypes.STRING,
    min_stock_level: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};