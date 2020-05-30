'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('assign', function () {
  it('assigns properties of the second argument to the first argument', function () {
    var object = {};
    (0, _2.default)(object, { a: 1, b: 2, c: 3 });
    _powerAssert2.default.deepEqual(object, { a: 1, b: 2, c: 3 });
  });

  it('the object passed as 2nd argument remains unchanged when the result is mutated', function () {
    var object = { a: 1, b: 2, c: 3 };
    var result = (0, _2.default)({}, object);
    result.c = 4;
    _powerAssert2.default.deepEqual(object, { a: 1, b: 2, c: 3 });
  });

  it('returns the first argument when the second argument is `undefined`', function () {
    var original = { a: 1, b: 2, c: 3 };
    var result = (0, _2.default)(original, undefined);
    (0, _powerAssert2.default)(original === result);
  });

  it('throws TypeError exception if the first argument is `undefined', function () {
    _powerAssert2.default.throws(_2.default.bind(null, undefined, { a: 1, b: 2, c: 3 }), TypeError);
  });
});