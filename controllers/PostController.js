const models = require("../models");

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
    } catch (error) {}
  }

  /**
   * this method can be used for upsert a post of a user
   * @param {object} data
   * @param {integer} userId
   * @param {string} content
   * @param {integer} postId
   * @param {*} transaction
   */
  async createOrEditPost(data, transaction) {
    try {
      if (data.postId) {
        const post = await models.Post.findOne({
          where: { id: data.postId },
          transaction,
        });
        if (!post) {
          throw new Error("Post doesnot exist");
        }
        await models.Post.update(
          {
            content: data.content,
          },
          {
            where: { id: data.postId },
            transaction,
          }
        );
      } else {
        await models.Post.create(data, transaction);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * this method deletes a post of a user
   * @param {object} data
   * @param {number} userId
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
        throw new Error("Post doesnot exist");
      }
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
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostController;
