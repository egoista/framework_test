'use strict';
const request = require('supertest');
const app = require('../../../src');
const { describe, it } = require('node:test');

describe('DELETE /documents/:id', () => {
  describe('when documents doesnt exist', () => {
    it('should return 404 not found', async () => {
      await request(app.server.httpServer)
        .delete('/documents/id')
        .set('authorization', 'auth')
        .expect(404);
    });
  });
  describe('when documents exist', () => {
    it('should return 204', async () => {
      await createDocument();
      await request(app.server.httpServer)
        .delete('/documents/id')
        .set('authorization', 'auth')
        .expect(204);
    });
  });
});

async function createDocument() {
  await request(app.server.httpServer)
    .post('/documents')
    .send({ id: 'id' })
    .set('authorization', 'auth');
}
