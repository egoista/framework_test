const Router = require('../../../src/lib/router');
const { getRequest } = require('../../helpers/mockRequest');
const { mockResponse } = require('../../helpers/mockResponse');
const { describe, it } = require('node:test');
const assert = require('node:assert');
const {
  NotFoundError,
  RouteConflictError,
} = require('../../../src/lib/router/utils/error');

describe('Router', () => {
  describe('.constructor', () => {
    it('should create http verbs methods', () => {
      const router = new Router();

      assert(router.hasOwnProperty('get'));
      assert(router.get instanceof Function);
      assert(router.hasOwnProperty('post'));
      assert(router.post instanceof Function);
      assert(router.hasOwnProperty('delete'));
      assert(router.delete instanceof Function);
      assert(router.hasOwnProperty('put'));
      assert(router.put instanceof Function);
      assert(router.hasOwnProperty('patch'));
      assert(router.patch instanceof Function);
    });
  });
  describe('when have a pattern conflict', () => {
    it('should thrown an RouteConflictError', () => {
      const router = new Router();
      router.get('/:id');

      try {
        router.get('/:other_param');
      } catch (e) {
        assert(e instanceof RouteConflictError);
        assert.strictEqual(
          e.message,
          'This route "get /:other_param" conflicts with the pattern "get /^\\/(?<id>[\\w-_+:]+)$/"',
        );
      }
    });
  });
  describe('#routes', () => {
    describe('when match a route', () => {
      it('should call the handler', (t) => {
        const mockFn = t.mock.fn();
        const router = new Router();
        router.get('/', mockFn);
        const routeMiddleware = router.routes();
        const req = getRequest('/');
        const res = mockResponse;

        routeMiddleware(req, res, () => {});

        assert(mockFn.mock.calls.length === 1);
      });
      describe('when have prefix', () => {
        it('should call the handler', (t) => {
          const mockFn = t.mock.fn();
          const router = new Router();
          router.get('/', mockFn);
          const routeMiddleware = router.routes({ prefix: '/prefix' });
          const req = getRequest('/prefix');
          const res = mockResponse;

          routeMiddleware(req, res, () => {});

          assert(mockFn.mock.calls.length === 1);
        });
      });
    });
    describe('when dont match a route', () => {
      it('should throw NotFoundError', (t) => {
        const mockFn = t.mock.fn();
        const router = new Router();
        router.get('/', mockFn);
        const routeMiddleware = router.routes();
        const req = getRequest('/foo');
        const res = mockResponse;
        try {
          routeMiddleware(req, res, () => {});
        } catch (e) {
          assert(e instanceof NotFoundError);
          assert.strictEqual(e.message, 'No matching route for GET /foo');
        }
      });
    });
  });
});
