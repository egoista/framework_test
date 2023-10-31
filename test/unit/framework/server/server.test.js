'use strict';

const request = require('supertest');
const Server = require('../../../../src/lib/framework/server');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('Server', () => {
  describe('when pass a handler without errors', () => {
    it('should give a 200 json response', async () => {
      const handler = (req, res) => {
        res.body = { result: 'success' };
      };
      const server = new Server(handler);

      await request(server.httpServer)
        .get('/')
        .expect(200, { result: 'success' });
    });
  });

  describe('when pass a handler wich throw an errors', () => {
    it('should give a 500 error response', async () => {
      const handler = () => {
        throw new Error('handler error');
      };
      const server = new Server(handler);

      const result = await request(server.httpServer).get('/').expect(500);

      assert.equal(result.body, 'handler error');
    });
  });
});
