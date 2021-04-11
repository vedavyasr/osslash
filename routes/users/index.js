const router = require("express").Router();
const { getAllUsers } = require("./usersHandler");


router.get("/",  getAllUsers);


module.exports=router