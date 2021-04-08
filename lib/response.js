function successResponse(statusCode, data, res) {
  res.statusCode = statusCode;
  res.send({
    success: true,
    data,
  });
}

function errorResponse(statusCode, error, res) {
  res.statusCode = statusCode;
  res.send({
    success: false,
    error: error,
    errorCode: error.errorCode,
  });
}

module.exports = {
  successResponse,
  errorResponse
};
