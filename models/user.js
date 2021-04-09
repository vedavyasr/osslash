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
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      userRoleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "UserRole",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return User;
};
