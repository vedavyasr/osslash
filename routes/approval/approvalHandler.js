const models = require("../../models");
const ApprovalController = require("../../controllers/ApprovalController");
const { successResponse, errorResponse } = require("../../lib/response");

async function approveRequest(req, res, next) {
  let transaction = await models.sequelize.transaction();
  try {
    const data = req.body;

    const result = await ApprovalController.approveRequest(data, transaction);
    await transaction.commit();
    successResponse(200, result, res);
  } catch (error) {
    await transaction.rollback();
    errorResponse(error.statusCode, error, res);
  }
}

async function getRequests(req, res, next) {
  try {
    const post = await ApprovalController.getApprovalRequests();
    successResponse(200, post, res);
  } catch (error) {
    errorResponse(error.statusCode, error, res);
  }
}
module.exports = {
  approveRequest,
  getRequests,
};
