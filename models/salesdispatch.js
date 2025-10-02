'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesDispatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    SalesDispatch.belongsTo(models.Staff,
       { foreignKey: 'dispatcherid'

        });
    SalesDispatch.belongsTo(models.Sales, 
      { foreignKey: 'salesid' 
        
      });
    }
  }
  SalesDispatch.init({
    disid: DataTypes.INTEGER,
    date: DataTypes.DATE,
    dispatcherid: DataTypes.INTEGER,
    salesid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SalesDispatch',
  });
  return SalesDispatch;
};