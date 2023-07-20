const { StatusCodes } = require("http-status-codes");
const { CustomApiError } = require("./custom-error");

class UnAuthorizedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnAuthorizedError;
