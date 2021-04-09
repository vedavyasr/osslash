const models = require("../../models");
const PostController = require("../../controllers/PostController");
const { successResponse, errorResponse } = require("../../lib/response");

async function createPost(req, res, next) {
  let transaction = await models.sequelize.transaction();
  try {
    const data = req.body;
    const postController = new PostController();
    const post = await postController.createOrEditPost(data, transaction);
    await transaction.commit();
    successResponse(200, post, res);
  } catch (error) {
    await transaction.rollback();
    errorResponse(error.statusCode, error, res);
  }
}

async function listPosts(req, res, next) {
  try {
    const posts = await PostController.listAllPosts(req.query);
    successResponse(200, posts, res);
  } catch (error) {
    errorResponse(error.statusCode, error, res);
  }
}

async function deletePost(req, res, next) {
  let transaction = await models.sequelize.transaction();
  try {
    const data = req.body;
    const postController = new PostController();
    const post = await postController.deletePost(data, transaction);
    await transaction.commit();
    successResponse(200, post, res);
  } catch (error) {
    await transaction.rollback();
    errorResponse(error.statusCode, error, res);
  }
}

module.exports = {
  createPost,
  deletePost,
  listPosts,
};
