'use strict';

const MiddlewaresManager = require('../../../src/lib/framework/middlewaresManager');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('MiddlewaresManager', () => {
  describe('.constructor', () => {
    it('should set the middlewares array', async () => {
      const middlewaresManager = new MiddlewaresManager();

      assert.deepEqual(middlewaresManager.middlewares, []);
    });
  });
  describe('#register', () => {
    it('should add the function to the middlewares array', async () => {
      const middlewaresManager = new MiddlewaresManager();
      const fn = () => {};
      middlewaresManager.register(fn);

      assert.deepEqual(middlewaresManager.middlewares, [fn]);
    });
  });
  describe('#execute', () => {
    it('should execute the middlewares in order of register', async () => {
      const middlewaresManager = new MiddlewaresManager();
      const handlerA = (object, next) => {
        object.text += 'a';
        next();
      };
      const handlerB = (object, next) => {
        object.text += 'b';
        next();
      };
      middlewaresManager.register(handlerA);
      middlewaresManager.register(handlerB);

      let object = { text: '' };
      middlewaresManager.execute(object);
      assert.strictEqual(object.text, 'ab');
    });
  });
});
