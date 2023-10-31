const { ServerResponse } = require('http');

/* The Response class is used to handle and build JSON responses for server errors. */
class Response extends ServerResponse {
  /* The line `body = null;` is initializing the `body` property of the `Response` class to `null`.
  This property is used to store the body content of the response. By default, it is set to `null`
  until it is assigned a value when building an error response or a JSON response. */
  body = null;

  /**
   * The function builds an error response object with a status code and message, and logs the error.
   * @param err - The `err` parameter is an object that represents an error. It typically contains
   * properties such as `statusCode` and `message`.
   */
  buildErrorResponse(err) {
    this.statusCode = err.statusCode || 500;
    this.body = err.message;
    this.buildJsonResponse();
    console.log(err);
  }

  /**
   * The function builds a JSON response with the specified content type and body.
   */
  buildJsonResponse() {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(this.body));
  }
}

module.exports = Response;
