'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sales.belongsTo(models.Client,{
        foreignKey: "clientid"
      });
      Sales.belongsTo(models.Branch,{
        foreignKey: "branchid"
      });
    }
  }
  Sales.init({
    type: DataTypes.STRING,
    date: DataTypes.DATE,
    billamount: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};