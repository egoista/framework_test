const { NotFoundError, RouteConflictError } = require('./utils/error');
const { convert, addPrefix } = require('./utils/pathToRegExp');

/* The Router class helps with routing HTTP requests by mapping routes to
corresponding handlers. */
class Router {
  static methods = ['get', 'post', 'delete', 'put', 'patch'];
  #routesMap = {};

  /**
   * Initializes the Router class, setting up methods for each HTTP verb.
   *
   */
  constructor() {
    Router.methods.forEach((method) => {
      this.#routesMap[method] = [];

      this[method] = (path, handler) => {
        let route;
        if ((route = this.#findRoute(method, path))) {
          throw new RouteConflictError(
            `This route "${method} ${path}" conflicts with the pattern "${method} ${route.regex}"`,
          );
        }

        this.#routesMap[method].push({
          regex: convert(path),
          handler,
        });

        return this;
      };
    });
  }

  /**
   * The `routes` function builds routes based on the provided options and returns a middleware
   * function that finds the appropriate route handler for each incoming request.
   * @param options - The `options` parameter is an object that contains the configuration options for
   * the routes. It can include properties such as `prefix` for each route.
   * @returns The `routes` function is returning a middleware function that takes in `req`, `res`, and
   * `next` as parameters. Inside this middleware function, it builds the routes based on the provided
   * options and then finds the appropriate route handler for the incoming request. It then calls the
   * handler with `req` and `res` and finally calls `next()` to pass control to the next middleware
   */
  routes(options) {
    this.#build(options);

    return (req, res, next) => {
      const route = this.#findRoute(req.method, req.path);

      if (!route)
        throw new NotFoundError(
          `No matching route for ${req.method} ${req.path}`,
        );

      this.#setRequestParams(req, route.regex);
      route.handler(req, res);

      next();
    };
  }

  /**
   * The function finds a route based on the request method and path, and returns the matching route
   * along with the extracted parameters from the path.
   * @param req - The `req` parameter is an object that represents the HTTP request. It typically
   * contains information such as the HTTP method (e.g., GET, POST, etc.) and the path of the requested
   * resource.
   * @returns The `findRoute` function is returning the `route` object.
   */
  #findRoute(method, path) {
    const route = this.#routesMap[method.toLowerCase()].find(({ regex }) =>
      regex.test(path),
    );
    return route;
  }

  #setRequestParams(request, regex) {
    request.params = request.path.match(regex).groups;
  }

  /**
   * The `build` function adds a prefix to the regular expressions in the `routesMap` object.
   * @param [options] - An object containing the options for building the routes.
   */
  #build(options = {}) {
    const { prefix } = options;

    if (prefix) {
      Router.methods.forEach((method) => {
        this.#routesMap[method] = this.#routesMap[method].map(
          ({ regex, handler }) => ({
            regex: addPrefix(regex, prefix),
            handler,
          }),
        );
      });
    }
  }
}

module.exports = Router;
