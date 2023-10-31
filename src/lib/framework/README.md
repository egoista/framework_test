# Router middleware

This lib allows you to register middleware that will be executed in order through http.Server.

## Technical details

Webapp is composed of two components, the MiddlewaresManager and the Server.

MiddlewaresManager registers the middleware functions and executes them in order.

Server enriches the request and response and starts http.Server.

Webapp allows you to register middleware functions.
```javascript
const app = new WebApp();
middlewareFunction = (req, res, next) => {
  // do something before
  next();
  // do something after
}

app.use(middlewareFunction)
```
and start the Server
```javascript
 app.start(3000)
```

## Problems encountered

## Possible improvements
