'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Staff.belongsTo(models.Branch,{
        foreignKey: "branchid"
      });
      Staff.belongsTo(models.User,{
        foreignKey: "userid"
      })
    }
  }
  Staff.init({
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    address: DataTypes.STRING,
    join_date: DataTypes.DATE,
    leaving_date: DataTypes.DATE,
    type: DataTypes.STRING,
    salary_type: DataTypes.STRING,
    base_salary: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};