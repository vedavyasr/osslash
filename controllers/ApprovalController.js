const models = require("../models");

class ApprovalController {
  constructor() {}

  /**
   * this method creates an approval request
   * @param {object} data
   * @param {number} postId
   * @param {number} approvedBy
   * @param {number} requestedBy
   * @param {string} status
   * @param {string} actionNotes
   */
  static async createApprovalRequest(data, transaction) {
    let inputTransaction =
      transaction || (await models.sequelize.transaction());
    const ChangeLogController = require("./ChangeLogController");
    try {
      await models.Approval.create(data, { transaction: inputTransaction });
      const payload = {
        postId: data.postId,
        action: "approving a post",
        userId: data.approvedBy,
      };
      await ChangeLogController.recordLog(payload, inputTransaction);
      return true;
    } catch (error) {
      if (!transaction) await models.sequelize.rollback();
      throw error;
    }
  }

  /**
   *
   * @returns approval requests
   */
  static async getApprovalRequests() {
    try {
      const requests = await models.Approval.findAll({});
      return requests;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {object} data
   * @param {number} requestId
   * @param {number} userId
   * @param {string} status
   * @param {*} transaction
   */
  static async approveRequest(data, transaction) {
    try {
      let request = await models.Approval.findOne({
        where: { id: data.requestId },
        transaction,
      });
      if (!request) {
        throw new Error("Invalid Approval Request");
      }
      const user = await models.User.findOne(
        { where: { id: data.userId } },
        transaction
      );
      if (!user || user.userRoleId !== 3) {
        throw new Error("Not a valid admin");
      }
      request = await models.Approval.update(
        {
          ...request,
          approvedBy: data.userId,
          status: data.status,
          actionNotes: "Accepted",
        },
        {
          where: {
            id: data.requestId,
          },
          returning: true,
          plain: true,
          transaction,
        }
      );
      const approvalRecord = await models.Approval.findOne(
        { where: { id: data.requestId } },
        transaction
      );
      const post = await models.Post.findOne({
        where: { id: approvalRecord.postId },
        transaction,
      });
      const PostController = require("./PostController");

      await PostController.upsertPost(
        { ...post, postId: post.id, isApproved: true },
        post.updatedBy,
        transaction
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ApprovalController;
