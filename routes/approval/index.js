const router = require("express").Router();
const { approveRequest, getRequests } = require("./approvalHandler");
const { approveRequestValidation } = require("../../validations/approval");

router.put("/", approveRequestValidation, approveRequest);
router.get("/", getRequests);

module.exports = router;
