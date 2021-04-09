const Joi = require("joi");
const { errorResponse } = require("../../lib/response");

async function approveRequestValidation(req, res, next) {
  const schema = Joi.object().keys({
    requestId: Joi.number()
      .required()
      .error(new Error("requestId must be an integer")),
    status: Joi.string()
      .min(1)
      .required()
      .error(new Error("status must not be empty")),
    userId: Joi.number()
      .required()
      .error(new Error("userId must be an integer")),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    errorResponse(400, validation.error.message, res);
    return;
  }
  next();
}

module.exports = {
  approveRequestValidation,
};
