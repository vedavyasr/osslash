const router = require("express").Router();

const postsHandler = require("./posts");
const approvalHandler = require("./approval");
const logHandler = require("./changeLogs");
const usersHandler = require("./users");

router.get("/", (req, res, next) => {
  res.send("Yayy!!");
});
router.use("/posts", postsHandler);
router.use("/approvals", approvalHandler);
router.use("/logs", logHandler);
router.use("/users", usersHandler);
module.exports = exports = router;
