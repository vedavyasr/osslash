const models = require("../models");

class ChangeLogController {
  constructor() {}

  static async recordLog(data, transaction) {
    try {
      await models.ChangeLog.create(
        {
          postId: data.postId,
          userId: data.userId,
          action: data.action,
        },
        transaction
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ChangeLogController;
