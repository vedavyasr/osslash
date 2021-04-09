function successResponse(statusCode, data, res) {
  res.statusCode = statusCode;
  res.send({
    success: true,
    data,
  });
}

function errorResponse(statusCode, error, res) {
  res.statusCode = statusCode || 400;
  res.send({
    success: false,
    error: error.message || error,
    errorCode: error.errorCode  || 'ERROR',
  });
}

module.exports = {
  successResponse,
  errorResponse
};
