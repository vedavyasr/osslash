const Joi = require("joi");

async function listPostsValidation(req, res, next) {
  const schema = {
    userId: Joi.number().error(new Error("userId must be a number")),
  };
  Joi.valid(req.query, schema, (error, value) => {
    if (error) {
      res.status(422).json({
        message: error.message,
      });
    } else {
      next();
    }
  });
}

async function createOrEditPostValidation(req, res, next) {
  const schema = {
    userId: Joi.number().error(new Error("userId must be a number")),
    content: Joi.string()
      .min(1)
      .required()
      .error(new Error("content must not be empty")),
    postId: Joi.number()
      .allow(null)
      .error(new Error("postId must be a number")),
  };
  Joi.valid(req.body, schema, (error, value) => {
    if (error) {
      res.status(422).json({
        message: error.message,
      });
    } else {
      next();
    }
  });
}

async function deletePostValidation(req, res, next) {
  const schema = {
    userId: Joi.number().error(new Error("userId must be a number")),
    postId: Joi.number().required().error(new Error("postId must be a number")),
  };
  Joi.valid(req.body, schema, (error, value) => {
    if (error) {
      res.status(422).json({
        message: error.message,
      });
    } else {
      next();
    }
  });
}

module.exports = {
  listPostsValidation,
  createOrEditPostValidation,
  deletePostValidation,
};
