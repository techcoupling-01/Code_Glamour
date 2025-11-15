'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockTracker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
         StockTracker.belongsTo(models.Product, { foreignKey: 'productid' });
    }
  }
  StockTracker.init({
    trackerid: DataTypes.INTEGER,
    productid: DataTypes.INTEGER,
    type: DataTypes.STRING,
    referenceid: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StockTracker',
  });
  return StockTracker;
};