/* The MiddlewaresManager class allows for the registration and execution of middleware functions. */
class MiddlewaresManager {
  /**
   * The constructor function initializes an empty array called "middlewares".
   */
  constructor() {
    this.middlewares = [];
  }

  /**
   * The register function adds a middleware function to an array of middlewares.
   * @param fn - The parameter "fn" is a function that will be added to the "middlewares" array.
   */
  register(fn) {
    this.middlewares.push(fn);
  }

  /**
   * The "execute" function applies a series of middlewares to a set of arguments in reverse order.
   * @param args - The `args` parameter is an array of arguments that will be passed to each middleware
   * function.
   */
  execute(...args) {
    this.middlewares.reduceRight(
      (done, next) => () => next(...args, done),
      () => {},
    )(...args);
  }
}

module.exports = MiddlewaresManager;
