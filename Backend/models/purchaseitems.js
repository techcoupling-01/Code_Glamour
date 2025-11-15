'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PurchaseItems.belongsTo(models.Product,{
        foreignKey:"productid"
      });
      PurchaseItems.belongsTo(models.Purchase,{
        foreignKey:"purchaseid"
      })
    }
  }
  PurchaseItems.init({
    quantity: DataTypes.FLOAT,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'PurchaseItems',
  });
  return PurchaseItems;
};