const models = require("../models");

class ChangeLogController {
  constructor() {}

  static async recordLog(data, transaction) {
    try {
      const changeLog = await models.ChangeLog.create(
        { ...data },
        { transaction: transaction }
      );
      return changeLog;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   * @param {object} data 
   * @param {number} userId 
   * @returns logs as an array of objects
   */
  static async getAllLogs(data) {
    try {
      const user = await models.User.findOne({
        where: { id: data.userId },
        include: [{ model: models.UserRole, as: "userRole" }],
      });
      if (!user) {
        throw new Error("Invalid User");
      }
      if (user.userRole.name === "User") {
        throw new Error('Un Authorized User')
      }
      const logs = await models.ChangeLog.findAndCountAll({});
      return logs;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ChangeLogController;
