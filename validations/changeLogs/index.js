const Joi = require("joi");
const { errorResponse } = require("../../lib/response");

async function getAllLogsValidation(req, res, next) {
  const schema = Joi.object().keys({
    userId: Joi.number()
      .required()
      .error(new Error("userId must be an integer")),
  });

  const validation = schema.validate(req.query);
  if (validation.error) {
    errorResponse(400, validation.error.message, res);
    return;
  }
  next();
}

module.exports = {
  getAllLogsValidation,
};
