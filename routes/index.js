const router = require("express").Router();

const postsHandler = require("./posts");
const approvalHandler = require("./approval");
router.use("/posts", postsHandler);
router.use("/approvals", approvalHandler);
module.exports = exports = router;
