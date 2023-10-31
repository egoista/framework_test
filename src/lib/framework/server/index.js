const http = require('http');
const Request = require('./request');
const Reponse = require('./response');

/* The Server class creates an HTTP server and handles incoming requests by
invoking a handler function. */
class Server {
  /**
   * The constructor function creates an HTTP server with the provided handler and runs a private
   * method when a request is received.
   * @param handler - The `handler` parameter is a function that will be called to handle incoming HTTP
   * requests. It will be passed two arguments: the `req` object representing the incoming request, and
   * the `res` object representing the server response.
   */
  constructor(handler) {
    this.handler = handler;
    const serverOptions = {
      IncomingMessage: Request,
      ServerResponse: Reponse,
    };
    this.httpServer = http.createServer(serverOptions, async (req, res) => {
      this.#run(req, res);
    });
  }

  /**
   * The start function starts the HTTP server and returns the server object.
   * @param port - The `port` parameter is the port number on which the HTTP server will listen for
   * incoming requests.
   * @returns node Server.httpServer.
   */
  start(port) {
    this.httpServer.listen(port);
    return this.httpServer;
  }

  /**
   * The above function is an asynchronous function that runs a request and response handler, catching
   * any errors and building appropriate responses.
   * @param req - The `req` parameter is an object representing the request made by the client. It
   * typically contains information such as the HTTP method, headers, query parameters, and request
   * body.
   * @param res - The "res" parameter is an object that represents the response that will be sent back
   * to the client. It typically contains methods and properties for setting the response status,
   * headers, and body. In this code snippet, it is used to build a JSON response or an error response
   * based on the result of the request.
   */
  async #run(req, res) {
    await req.build();
    try {
      this.handler(req, res);
    } catch (err) {
      res.buildErrorResponse(err);

      return;
    }

    res.buildJsonResponse();
  }
}

module.exports = Server;
