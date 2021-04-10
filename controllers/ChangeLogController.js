const models = require("../models");

class ChangeLogController {
  constructor() {}

  static async recordLog(data, transaction) {
    try {
      const changeLog = await models.ChangeLog.create(
        {...data},
        { transaction: transaction }
      );
      return changeLog;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ChangeLogController;
