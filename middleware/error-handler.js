const { StatusCodes } = require("http-status-codes");
const { CustomApiError } = require("../errors/index");

async function errorHandler(err, req, res, next) {
  if (err instanceof CustomApiError) {
    return res.status(err.status).send({
      err: {
        message: err.message,
      },
    });
  }

  const customError = {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Internal server error",
  };

  return res.status(customError.status).json({
    err: {
      mesage: customError.msg,
    },
  });
}

module.exports.errorHandler = errorHandler;
