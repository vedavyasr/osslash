const router = require("express").Router();

const postsHandler = require("./posts");
const approvalHandler = require("./approval");
router.get('/',(req,res,next)=>{res.send('Yayy!!')})
router.use("/posts", postsHandler);
router.use("/approvals", approvalHandler);
module.exports = exports = router;
