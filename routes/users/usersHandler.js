const UserController = require("../../controllers/UserController");
const { successResponse, errorResponse } = require("../../lib/response");

async function getAllUsers(req, res, next) {
  try {
    const posts = await UserController.getAllUsers();
    successResponse(200, posts, res);
  } catch (error) {
    errorResponse(error.statusCode, error, res);
  }
}

module.exports = { getAllUsers };
