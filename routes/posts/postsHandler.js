const models = require("../../models");
const PostController = require("../../controllers/PostController");
const { successResponse, errorResponse } = require("../../lib/response");

async function createPost(req, res, next) {
  let transaction = models.sequelize.transaction();
  try {
    const data = req.data;
    const postController = new PostController(data.postId, data.userId);
    const post = await postController.createOrEditPost(data, transaction);
    transaction.commit();
    successResponse(200, post, res);
  } catch (error) {
    transaction.rollBack();
    errorResponse(error.statusCode, error, res);
  }
}

async function listPosts(req, res, next) {
  try {
    const posts = await PostController.listAllPosts(req.params);
    successResponse(200, posts, res);
    // call controller from here
  } catch (error) {
    errorResponse(error.statusCode, error, res);
  }
}

async function deletePost(req, res, next) {
  let transaction = models.sequelize.transaction();
  try {
    const data = req.body;
    const postController = new PostController(data.postId, data.userId);
    const post = await postController.deletePost(data, transaction);
    transaction.commit();
    successResponse(200, post, res);
  } catch (error) {
    transaction.rollBack();
    errorResponse(error.statusCode, error, res);
  }
}

module.exports = {
  createPost,
  deletePost,
  listPosts,
};
