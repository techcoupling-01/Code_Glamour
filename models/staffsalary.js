'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StaffSalary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StaffSalary.belongsTo(models.Staff,{
        foreignKey: "staffid"
      })
    }
  }
  StaffSalary.init({
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    paymentdate: DataTypes.DATE,
    amount: DataTypes.FLOAT,
    mode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StaffSalary',
  });
  return StaffSalary;
};