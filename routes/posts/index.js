const router = require("express").Router();
const { createPost, listPosts, deletePost } = require("./postsHandler");
const {
  createOrEditPostValidation,
  listPostsValidation,
  deletePostValidation,
} = require("../../validations/posts");

// router.use('authentcator')

router.post("/", createOrEditPostValidation, createPost);
router.get("/", listPostsValidation, listPosts);
router.delete("/", deletePostValidation, deletePost);
