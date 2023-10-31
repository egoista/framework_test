'use strict';

const Response = require('../../../../src/lib/framework/server/response');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('Response', () => {
  describe('#buildJsonResponse', () => {
    it('should build a json response', (t) => {
      const response = new Response({});
      response.body = { test: 'test' };
      t.mock.method(response, 'end');
      t.mock.method(response, 'setHeader');
      response.buildJsonResponse();

      assert.strictEqual(response.end.mock.calls.length, 1);
      assert.strictEqual(
        response.end.mock.calls[0].arguments[0],
        '{"test":"test"}',
      );
      assert.strictEqual(response.setHeader.mock.calls.length, 1);
      assert.strictEqual(
        response.setHeader.mock.calls[0].arguments[0],
        'Content-Type',
      );
      assert.strictEqual(
        response.setHeader.mock.calls[0].arguments[1],
        'application/json',
      );
    });
  });
  describe('#buildErrorResponse', () => {
    it('should build an error response', (t) => {
      const response = new Response({});
      const error = new Error('test error');
      t.mock.method(response, 'buildJsonResponse');
      response.buildErrorResponse(error);

      assert(response.statusCode === 500);
      assert(response.body === 'test error');
      assert.strictEqual(response.buildJsonResponse.mock.calls.length, 1);
    });
  });
});
