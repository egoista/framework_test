const MiddlewaresManager = require('./middlewaresManager');
const Server = require('./server');

/* The WebApp class manages middlewares and starts a server. */
class WebApp {
  /**
   * The constructor function initializes a MiddlewaresManager and a Server, with the
   * MiddlewaresManager's execute method being passed as a callback to the Server.
   */
  constructor() {
    this.middlewaresManager = new MiddlewaresManager();
    this.server = new Server((...args) =>
      this.middlewaresManager.execute(...args),
    );
  }

  /**
   * The "use" function registers a middleware handler in the middlewaresManager.
   * @param handler - The "handler" parameter is a function or middleware that you want to register
   * with the middlewares manager.
   * @returns WebApp instance
   */
  use(handler) {
    this.middlewaresManager.register(handler);

    return this;
  }

  /**
   * The start function starts a server on the specified port.
   * @param port - The `port` parameter is the number that specifies the port on which the server
   * should listen for incoming requests.
   * @returns node Server.httpServer with the specified port.
   */
  start(port) {
    return this.server.start(port);
  }
}

module.exports = WebApp;
