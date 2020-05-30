'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('cloneObject', function () {
  it('makes a copy of an object', function () {
    var result = (0, _2.default)({ a: 1, b: 2, c: 3 });
    _powerAssert2.default.deepEqual(result, { a: 1, b: 2, c: 3 });
  });

  it('the copy remains unchanged when the original is changed', function () {
    var original = { a: 1, b: 2, c: 3 };
    var copy = (0, _2.default)(original);
    original.c = 4;
    _powerAssert2.default.deepEqual(copy, { a: 1, b: 2, c: 3 });
  });

  it('the original remains unchanged when the copy is changed', function () {
    var original = { a: 1, b: 2, c: 3 };
    var copy = (0, _2.default)(original);
    copy.c = 4;
    _powerAssert2.default.deepEqual(original, { a: 1, b: 2, c: 3 });
  });

  it('returns an empty object when argument is `undefined`', function () {
    var result = (0, _2.default)(undefined);
    _powerAssert2.default.deepEqual(result, {});
  });
});