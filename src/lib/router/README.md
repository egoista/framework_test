# Router middleware

This library allows you to register routes, http verbs and functions and returns a middleware function that searches for them through the request parameters.

## Technical details
The router has a method for each http verb that allows you to register a route and a handler.

This route can be defined statically
```javascript
router.get('/path')
```
or with parameters
```javascript
router.get('/path/:param')
```
which will be available within `req.params`

If you set routes that conflict it ll throw an RouteConflictError
```javascript
router.get('/path/:param')
router.get('/path/:other_param') // throw RouteConflictError
```

Inside the utils folder there is a class that helps with regex
```javascript
PathToRegExp.convert
PathToRegExp.addPrefix
```

the routes method can receive options
```json
{
  prefix: 'a prefix for registered routes'
}
```
## Problems encountered
I had problems using the lib `path-to-regexp`
## Possible improvements
- have a global record of routes to be able to check duplication between different routers
- being able to register specific middleware for routes