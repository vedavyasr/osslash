const Joi = require("joi");
const { errorResponse } = require("../../lib/response");

async function listPostsValidation(req, res, next) {
  const schema = Joi.object().keys({
    userId: Joi.number().error(new Error("userId must be an integer")),
  });

  const validation = schema.validate(req.query);
  if (validation.error) {
    errorResponse(400, validation.error.message, res);
    return;
  }
  next();
}

async function createOrEditPostValidation(req, res, next) {
  const schema = Joi.object().keys({
    userId: Joi.number().error(new Error("userId must be an integer")),
    content: Joi.string()
      .min(1)
      .required()
      .error(new Error("content must not be empty")),
    postId: Joi.number()
      .allow(null)
      .error(new Error("postId must be an integer")),
    adminId: Joi.number()
      .allow(null)
      .error(new Error("adminId must be an integer")),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    errorResponse(400, validation.error.message, res);
    return;
  }
  next();
}

async function deletePostValidation(req, res, next) {
  const schema = Joi.object().keys({
    userId: Joi.number().error(new Error("userId must be an integer")),
    adminId: Joi.number()
      .allow(null)
      .error(new Error("adminId must be an integer")),
    postId: Joi.number()
      .required()
      .error(new Error("postId must be an integer")),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    errorResponse(400, validation.error.message, res);
    return;
  }
  next();
}

module.exports = {
  listPostsValidation,
  createOrEditPostValidation,
  deletePostValidation,
};
