# Technical assignment - infrastructure team

## Intro

As part of your assessment, we have prepared a technical assignment for you.

When developing RESTful APIs using node.js, developers often rely on popular web frameworks such as express, koa or fastify.
The source provided in this task uses similar patterns to describe and implement a basic 'dummy' REST API.
What's missing is the framework itself. Instead of using one of the popular options, this API will rely on your implementation of such framework.

## Goal

In the following sections, you will find the functional requirements of a barebones web framework. These are needed for the application to function properly.
The provided source code should not be modified in any way (only commenting out the sections of code is allowed for testing purposes).
Only the contents of [lib](./src/lib/) directory can be modified. Your implementation should reside here.
The end result should be a working REST API which runs on a specified port, listens for any incoming messages and processes them as defined by the application.

## General instructions

The assignment is to be completed within seven days from when you start working on it.
If you have any questions related to the assignment, feel free to contact us via <dominik.susmel@cialdnb.com>.
Document your framework and routing middleware in the provided ./lib/**/README.md files. You will find additional tips there.

Initialize a local git repository for the development purposes.
Use git during your development - create branches and commits, write meaningful commit messages and follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). 
Once you are done, make sure your `main` branch is up-to-date.
The final code (together with a .git directory) should be zipped and submitted as a solution.

You are allowed to use the latest LTS version of node.js. 
Feel free to use ES2022 features (such as private fields and methods), but make sure they are implemented in the selected node.js version.
If you are using any of the ES2022 features, be sure to set up the linter accordingly.

Besides using the native node.js API, you are allowed to use the following npm packages as project (dev-)dependencies:
- [`path-to-regexp`](https://github.com/component/path-to-regexp) or equivalent for route path handling
- `eslint` and related linting tools/plugins
- various utility packages you consider necessary (ie. `lodash`)

You are not allowed to use any existing third-party frameworks and develop "wrappers" around them, but you are allowed to browse their open-source repositories for inspiration.

Each TODO item in the provided source code is `[numbered]` to easily locate the additional info provided in the list below.

## Functional requirements

### WebApp (`src/lib/framework/index.js`)

WebApp represents a minimal web framework. It builds and runs a basic middleware-based web application.
This class should implement the following features:

  1. a `constructor`
    - configures the initial state of the framework instance (field values, dynamically generated methods (if any), etc.)
  2. the `use` method
    - receives a single parameter which should always be a function representing a specific middleware
    - the `use` method should register the provided `middleware` function and keep track of the registration order
    - by convention, this `middleware` function always receives three parameters: `req`, `res` and `next`.
      * `req` is an extended instance of node's `http.IncomingMessage` object. Extensions imply additions of properties such as `body`
      * `res` is an extended instance of node's `http.ServerResponse` object. Extensions imply additions of properties such as `body`
      * `next` is a function which triggers the execution of the next registered middleware in the middleware stack
    - to better understand what middleware implementation looks like, refer to [auth middleware](./src/middleware/auth.js)
    - `use` method can be called multiple times to register additional middleware and should be chainable.
    - registered middleware functions should execute in the order of registration upon receiving a request.
  3. the `start` method
    - forwards the parameters to the node's `http.Server.listen()` method
    - returns a running instance of node's `http.Server`
  4. enrichment of node's `http.IncomingMessage` (`req`) and `http.ServerResponse` (`res`) objects
    - as mentioned in point 2, `req` and `res` should be extended with additional properties such as:
      * `req.body` - for all HTTP methods which support incoming data via request body
      * `res.body` - should be used to send the final response data after middleware execution
  5. basic error-handling wrapper for registered middleware
    - for any errors thrown from the middleware, `res.statusCode` should be set to `error.statusCode` (if such field exists in the error object) and errors should be logged to stderr.
    - if a thrown error has no `statusCode` property, it should be considered a 500 Internal Server Error.

### Router (`src/lib/router/index.js`)

Router represents a basic implementation of the url-based routing middleware *builder*.
This class should implement the following functionalities:

  6. a `constructor`
    - configures the initial state of the router builder instance (field values, dynamically generated methods (if any), etc.)
  7. a set of route registration methods used to register the routes and their corresponding handlers (one for each supported HTTP method)
    - registration methods should be chainable.
  8. enrichment of node's `http.IncomingMessage` (`req`) and `http.ServerResponse` (`res`) objects
    - `req` and/or `res` should be extended with additional router-specific properties such as:
      * `req.params` - an object containing route parameters (for paths which specify them, ie. `GET /documents/:documentId` => `{ documentId: 'N' }`)
  9. the `routes` method
    - receives a single parameter which should be an object. This should be used for any final router configuration, such as defining the optional `prefix`.
    - this method should compile the final routing middleware from all the registered routes. It should return a single function compliant with definition in point 2.

### Dockerfile (bonus)

Once your application is up and running, create a dockerfile and deploy this project as a container on your local machine.
Provide us with the docker build/deployment instructions in the ["documentation" section below](#technical-assignment---documentation).

## Limitations and bonuses due to time constraints

- *do not overcomplicate* the solution. We are not expecting you to develop a next release of Express.js framework!
- only `application/json` will be used with this framework. There is no need to implement any additional parsers.
- there is no need for query string processing (if you implement it, make sure that the key-value pairs end up in `req.queryParams` object) *
- hierarchical middleware registration is not necessary (ie. registering additional middleware for specific route prefix) *
- we will not test for resilience to duplicate routes or prefixes *
- try to implement at least GET and POST route registration. Supporting all HTTP methods would be ideal.
- feel free to leave the unimplemented sections of the provided source commented out. Make sure that the application still runs.
- if you don't manage to implement certain features, take some time to describe your ideas in README files.

`*` considered bonus if solved

## Review

Other than checking if the application (or part of it) is running, we will also:
- review the code quality, style and consistency
- check the code for any linting errors
- use a suite of unit and integration tests to thoroughly test the code
- read through the documentation
- check the git repo history to review your usage of git
- check if the docker image is buildable and deployable (if provided)

Good luck! :rocket:

# Technical assignment - documentation

## Running the application

The application is built with Node.js and already has all environment configured with docker. To start the application you will need `docker` and `docker compose` installed on the machine. Having that you may run:

```shell
docker compose up
```

And then the application be started:

```shell
Starting nodedocker_app_1 ...
Starting nodedocker_app_1 ... done
```

The application will be avaible on *PORT 3000*

### Using postman to use the API

import the `Documents.postman_collection.json` into postman and have access to the 5 routes available in the api

## Running the tests

To run the tests using docker you just have to run the following command:

```shell
docker-compose -f docker-compose.test.yml up
```

And then all tests will be ran and the status exit code will be 0 or 1 that means true or false.