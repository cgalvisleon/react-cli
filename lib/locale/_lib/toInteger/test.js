'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('toInteger', function () {
  it('truncates positive numbers', function () {
    var result = (0, _2.default)(10.99);
    (0, _powerAssert2.default)(result === 10);
  });

  it('truncates negative numbers', function () {
    var result = (0, _2.default)(-5.5);
    (0, _powerAssert2.default)(result === -5);
  });

  it('converts convertable strings', function () {
    var result = (0, _2.default)('-10.75');
    (0, _powerAssert2.default)(result === -10);
  });

  it('returns NaN for non-convertable strings', function () {
    var result = (0, _2.default)('Foobar');
    (0, _powerAssert2.default)(typeof result === 'number' && isNaN(result));
  });

  it('returns NaN for false', function () {
    var result = (0, _2.default)(false);
    (0, _powerAssert2.default)(typeof result === 'number' && isNaN(result));
  });

  it('returns NaN for true', function () {
    var result = (0, _2.default)(true);
    (0, _powerAssert2.default)(typeof result === 'number' && isNaN(result));
  });

  it('returns NaN for null', function () {
    var result = (0, _2.default)(null);
    (0, _powerAssert2.default)(typeof result === 'number' && isNaN(result));
  });

  it('returns NaN for undefined', function () {
    var result = (0, _2.default)(undefined);
    (0, _powerAssert2.default)(typeof result === 'number' && isNaN(result));
  });

  it('returns NaN for NaN', function () {
    var result = (0, _2.default)(NaN);
    (0, _powerAssert2.default)(typeof result === 'number' && isNaN(result));
  });

  it('converts convertable objects', function () {
    // eslint-disable-next-line no-new-wrappers
    var result = (0, _2.default)(new Number(123));
    (0, _powerAssert2.default)(result === 123);
  });

  it('returns NaN for non-convertable objects', function () {
    // eslint-disable-next-line no-new-wrappers
    var result = (0, _2.default)({});
    (0, _powerAssert2.default)(typeof result === 'number' && isNaN(result));
  });
});