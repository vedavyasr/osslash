"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Post.init(
    {
      content: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      deletedAt: DataTypes.DATE,
      deletedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "Post",
      freezeTableName: true,
      scopes: {
        notDeleted: {
          model: "Post",
          where: {
            deletedAt: null,
            deletedBy: null,
          },
        },
      },
    }
  );
  return Post;
};
