const ChangeLogController = require("../../controllers/ChangeLogController");
const { successResponse, errorResponse } = require("../../lib/response");

async function getAllLogs(req, res, next) {
  try {
    const logs = await ChangeLogController.getAllLogs(req.query);
    successResponse(200, logs, res);
  } catch (error) {
    errorResponse(error.statusCode, error, res);
  }
}

module.exports = { getAllLogs };
