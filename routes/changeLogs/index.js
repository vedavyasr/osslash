const router = require("express").Router();
const { getAllLogs } = require("./changeLogHandler");
const { getAllLogsValidation } = require("../../validations/changeLogs");

router.get("/", getAllLogsValidation, getAllLogs);

module.exports = router;
