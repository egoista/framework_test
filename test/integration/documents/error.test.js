'use strict';
const request = require('supertest');
const app = require('../../../src');
const { describe, it } = require('node:test');

describe('GET /throw-error', () => {
  it('should receive 500', async () => {
    await request(app.server.httpServer)
      .get('/documents/throw-error')
      .set('authorization', 'auth')
      .expect(500);
  });
});
