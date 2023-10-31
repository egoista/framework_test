'use strict';
const PathToRegExp = require('../../../../src/lib/router/utils/pathToRegExp');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('PathToRegExp', () => {
  describe('.convert', () => {
    describe('when the path doesnt have a :param', () => {
      it('should returns a regex without a capture group', () => {
        const path = '/path';

        assert.strictEqual(PathToRegExp.convert(path).source, '^\\/path$');
      });
    });
    describe('when the path have a :param', () => {
      it('should returns a regex with a capture group', () => {
        const path = '/path/:param';

        assert.strictEqual(
          PathToRegExp.convert(path).source,
          '^\\/path\\/(?<param>[\\w-_+:]+)$',
        );
      });
    });
  });
  describe('.addPrefix', () => {
    describe('when the path is just /', () => {
      it('shoul adds the prefix and remove the /', () => {
        const previousRegex = PathToRegExp.convert('/');
        const regex = PathToRegExp.addPrefix(previousRegex, '/prefix');

        assert.strictEqual(regex.source, '^\\/prefix$');
      });
    });
    describe('when the path is more then /', () => {
      it('shoul adds the prefix', () => {
        const previousRegex = PathToRegExp.convert('/path');
        const regex = PathToRegExp.addPrefix(previousRegex, '/prefix');

        assert.strictEqual(regex.source, '^\\/prefix\\/path$');
      });
    });
  });
});
