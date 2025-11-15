'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SalesItems.belongsTo(models.Product,{
        foreignKey:"productid"
      });
      SalesItems.belongsTo(models.Sales,{
        foreignKey:"salesid"
      });

    }
  }
  SalesItems.init({
    quantity: DataTypes.FLOAT,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'SalesItems',
  });
  return SalesItems;
};