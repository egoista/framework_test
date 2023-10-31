'use strict';
const request = require('supertest');
const app = require('../../src');
const { describe, it } = require('node:test');

describe('Authorization', () => {
  describe('when dont have authorization header', () => {
    it('should return 401', () => {
      request(app.server.httpServer)
        .get('/documents')
        .expect(401)
        .end(function (err) {
          if (err) throw err;
        });
    });
  });

  describe('when have authorization token', () => {
    it('should return route response', () => {
      request(app.server.httpServer)
        .get('/documents')
        .set('authorization', 'auth')
        .expect(200)
        .end(function (err) {
          if (err) throw err;
        });
    });
  });
});
