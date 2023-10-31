'use strict';

const Request = require('../../../../src/lib/framework/server/request');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('Request', () => {
  describe('#build', () => {
    it('should build the request', async () => {
      const request = new Request({});
      request.url = '/path?param=value';
      request.method = 'GET';

      await request.build();

      assert.strictEqual(request.path, '/path');
      assert.strictEqual(request.queryParams.param, 'value');
      assert(request.params instanceof Object);
      assert.strictEqual(request.body, null);
    });
  });
});
