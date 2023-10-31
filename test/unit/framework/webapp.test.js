'use strict';

const WebApp = require('../../../src/lib/framework');
const MiddlewaresManager = require('../../../src/lib/framework/middlewaresManager');
const Server = require('../../../src/lib/framework/server');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('WebApp', () => {
  describe('.constructor', () => {
    it('should set attributes', async () => {
      const webapp = new WebApp();

      assert(webapp.middlewaresManager instanceof MiddlewaresManager);
      assert(webapp.server instanceof Server);
    });
  });

  describe('#use', () => {
    it('should register the function in the middlewareManager', async () => {
      const webapp = new WebApp();
      const fn = () => {};
      webapp.use(fn);

      assert.deepEqual(webapp.middlewaresManager.middlewares, [fn]);
    });
  });

  describe('#start', () => {
    it('should start the server', (t) => {
      const webapp = new WebApp();
      t.mock.method(webapp.server, 'start');

      webapp.start(3030);

      assert.strictEqual(webapp.server.start.mock.calls.length, 1);
      assert.strictEqual(webapp.server.start.mock.calls[0].arguments[0], 3030);

      webapp.server.httpServer.close();
    });
  });
});
