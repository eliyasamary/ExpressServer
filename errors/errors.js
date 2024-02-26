/***************************************************************************************
 * ERRORS - custom errors
 ***************************************************************************************/

// Internal Server Error (500)
class ServerError extends Error {
  constructor(action) {
    super(`Internal Server Error (500) - could'nt ${action}`);
    this.name = "Server Error";
    this.statusCode = 500;
  }
}

// Not Found Error (404)
class NotFoundError extends Error {
  constructor(entity) {
    super(`Not Found Error (404) - ${entity}`);
    this.name = "Not Found Error";
    this.statusCode = 404;
  }
}

// Bad Request Error (400)
class BadRequestError extends Error {
  constructor(entity) {
    super(`Bad Request Error (400) - ${entity}`);
    this.name = "Bad Request Error";
    this.statusCode = 400;
  }
}

module.exports = {
  ServerError,
  NotFoundError,
  BadRequestError,
};
