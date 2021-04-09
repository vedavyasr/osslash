'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Approval extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Approval.init({
    postId: DataTypes.INTEGER,
    approvedBy: DataTypes.INTEGER,
    status: DataTypes.STRING,
    requestedBy: DataTypes.INTEGER,
    actionNotes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Approval',
    tableName: "Approval",
    freezeTableName: true,
  });
  return Approval;
};