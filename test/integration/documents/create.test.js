'use strict';
const request = require('supertest');
const app = require('../../../src');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('Post /documents', () => {
  it('should create document', async () => {
    await request(app.server.httpServer)
      .post('/documents')
      .send({ id: 'id' })
      .set('authorization', 'auth')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});
