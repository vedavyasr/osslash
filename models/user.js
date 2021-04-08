"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.UserRole, {
        foreignKey: "userRoleId",
        as: "userRole",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      userRoleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "UserRole",
          key: "id",
        },
      },
      salt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
      freezeTableName: true,
    }
  );
  return User;
};
