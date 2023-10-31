'use strict';
const request = require('supertest');
const app = require('../../../src');
const { describe, it } = require('node:test');

describe('GET /documents', () => {
  it('should list documents', async () => {
    await request(app.server.httpServer)
      .get('/documents')
      .set('authorization', 'auth')
      .expect(200, [])
      .expect('Content-Type', /json/);
  });
});
