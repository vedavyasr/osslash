const models = require("../models");
const ApprovalController = require("./ApprovalController");

class PostController {
  constructor(postId, userId) {
    this.postId = postId;
    this.userId = userId;
  }

  /**
   * this method returns all the active posts of a user
   * @param {object} data
   * @param {integer} userId
   * @returns {count,posts}
   */
  static async listAllPosts(data) {
    try {
      const { count, rows } = await models.Post.scope(
        "notDeleted"
      ).findAndCountAll({ where: { userId: data.userId } });
      return { count, posts: rows };
    } catch (error) {
      throw error;
    }
  }

  /**
   * this method can be used for upsert a post of a user
   * @param {object} data
   * @param {integer} userId
   * @param {string} content
   * @param {integer} postId
   * @param {integer} adminId
   * @param {*} transaction
   */
  async createOrEditPost(data, transaction) {
    try {
      let post;
      if (data.adminId) {
        const admin = await models.User.findOne({
          where: { id: data.adminId },
          transaction,
        });
        if (!admin && admin.userRoleId !== 2) {
          throw new Error("Invalid AdminID");
        }
        data.isApproved = false;
        post = await PostController.upsertPost(data, admin.id, transaction);
      } else {
        post = await PostController.upsertPost(data, data.userId, transaction);
      }
      const request = await models.Approval.findOne({
        where: { postId: post.id },
        transaction,
      });
      if (!request && data.adminId) {
        let approvalPayload = {
          postId: post.id,
          requestedBy: data.adminId,
          status: "Requested",
          actionNotes: "Need approval to Post",
        };
        await ApprovalController.createApprovalRequest(
          approvalPayload,
          transaction
        );
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * this method upserts post
   * @param {*} data
   * @param {integer} userId
   * @param {*} transaction
   */
  static async upsertPost(data, userId, transaction) {
    try {
      let post;
      const ChangeLogController = require("./ChangeLogController");
      if (data.postId) {
        post = await models.Post.findOne({
          where: { id: data.postId },
          transaction,
        });
        if (!post) {
          throw new Error("Post doesnot exist");
        }
        await models.Post.update(
          {
            content: data.content,
            updatedBy: userId,
          },
          {
            where: { id: data.postId },
            returning: true,
            plain: true,
            transaction,
          }
        );
        post = await models.Post.findOne({
          where: { id: data.postId },
          transaction,
        });
      } else {
        post = await models.Post.create(
          { ...data, updatedBy: userId, createdBy: userId },
          transaction
        );
      }
      const payload = {
        postId: post.id,
        action: "Creating a post",
        userId: userId,
      };
      await ChangeLogController.recordLog(payload, transaction);
      return post;
    } catch (error) {
      throw error;
    }
  }
  /**
   * this method deletes a post of a user
   * @param {object} data
   * @param {number} userId
   * @param {number} adminId
   * @param {number} postId
   * @param {*} transaction
   */
  async deletePost(data, transaction) {
    try {
      const post = await models.Post.findOne({
        where: { id: data.postId },
        transaction,
      });
      if (!post) {
        throw new Error("Post does not exist");
      }
      if (post.userId !== Number(data.userId)) {
        throw new Error("No Access");
      }
      if (data.adminId) {
        let approvalPayload = {
          actionNotes: "Delete",
          status: "Requested",
          postId: data.postId,
          requestedBy: data.adminId,
        };
        
        await ApprovalController.createApprovalRequest(
          approvalPayload,
          transaction
        );
      } else {
        await models.Post.update(
          {
            deletedAt: new Date(),
            deletedBy: data.userId,
          },
          {
            where: {
              id: data.postId,
            },
            transaction,
          }
        );
        const payload = {
          postId: data.postId,
          action: "Deleting a post",
          userId: data.userId,
        };
        const ChangeLogController = require("./ChangeLogController");

        await ChangeLogController.recordLog(payload, transaction);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostController;
