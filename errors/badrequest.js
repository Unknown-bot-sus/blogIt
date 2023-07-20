const { StatusCodes } = require("http-status-codes");
const { CustomApiError } = require("./custom-error");

class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
