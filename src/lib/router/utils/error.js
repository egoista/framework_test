/* The `RouterError` class is a subclass of the `Error` class in JavaScript that represents an error
with a message, statusCode, and statusMessage. */
class RouterError extends Error {
  /**
   * The function is a constructor that initializes an object with a message, statusCode, and
   * statusMessage.
   * @param message - The `message` parameter is a string that represents the error message or
   * description. It is typically used to provide more information about the error that occurred.
   * @param statusCode - The `statusCode` parameter is used to specify the HTTP status code for the
   * response. It is typically a number that indicates the status of the request, such as 200 for a
   * successful request or 404 for a not found error.
   * @param [statusMessage=null] - The `statusMessage` parameter is an optional parameter that
   * represents the status message associated with the given `statusCode`. It is set to `null` by
   * default, but can be provided with a custom status message if desired.
   */
  constructor(message, statusCode, statusMessage = null) {
    super(message);
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
  }
}

/* The NotFoundError class is a subclass of RouterError that represents a route not found error with a
default message of "route not found" and a status code of 404. */
class NotFoundError extends RouterError {
  /**
   * The constructor function sets the default message, status code, and status text for a route not
   * found error.
   * @param [message=null] - The `message` parameter is an optional parameter that represents the error
   * message. If no message is provided, the default value is set to `'route not found'`.
   */
  constructor(message = null) {
    super(message ?? 'route not found', 404, 'not found');
  }
}

class RouteConflictError extends RouterError {
  constructor(message = null) {
    super(
      message ?? 'already have a matching route for this pattern',
      500,
      'route conflict',
    );
  }
}

module.exports = {
  NotFoundError,
  RouteConflictError,
};
