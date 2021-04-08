'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
    }
  };
  UserRole.init({
    name: DataTypes.STRING,
    permissions: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'UserRole',
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt:false
  });
  return UserRole;
};