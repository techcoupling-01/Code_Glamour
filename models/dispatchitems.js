'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DispatchItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     DispatchItems.belongsTo(models.SalesDispatch, { foreignKey: 'disid' });
    DispatchItems.belongsTo(models.SalesItems, { foreignKey: 'sitems' });
    }
  }
  DispatchItems.init({
    disid: DataTypes.INTEGER,
    sitems: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DispatchItems',
  });
  return DispatchItems;
};