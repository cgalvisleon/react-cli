'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('setUTCISOWeek', function () {
  it('sets the ISO week', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2004, 7 /* Aug */, 7)), 53);
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2005, 0 /* Jan */, 1)));
  });

  it('accepts a timestamp', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2009, 11 /* Dec */, 2)).getTime(), 1);
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2008, 11 /* Dec */, 31)));
  });

  it('converts a fractional number to an integer', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2004, 7 /* Aug */, 7)), 53.53);
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2005, 0 /* Jan */, 1)));
  });

  it('implicitly converts number arguments', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2004, 7 /* Aug */, 7)), '53');
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2005, 0 /* Jan */, 1)));
  });

  it('does not mutate the original date', function () {
    var date = new Date(Date.UTC(2014, 6 /* Jul */, 2));
    (0, _2.default)(date, 52);
    _powerAssert2.default.deepEqual(date, new Date(Date.UTC(2014, 6 /* Jul */, 2)));
  });

  it('handles dates before 100 AD', function () {
    var initialDate = new Date(0);
    initialDate.setUTCFullYear(4, 0 /* Jan */, 4);
    initialDate.setUTCHours(0, 0, 0, 0);
    var expectedResult = new Date(0);
    expectedResult.setUTCFullYear(4, 11 /* Dec */, 26);
    expectedResult.setUTCHours(0, 0, 0, 0);
    var result = (0, _2.default)(initialDate, 52);
    _powerAssert2.default.deepEqual(result, expectedResult);
  });

  it('returns `Invalid Date` if the given date is invalid', function () {
    var result = (0, _2.default)(new Date(NaN), 53);
    (0, _powerAssert2.default)(result instanceof Date && isNaN(result));
  });

  it('returns `Invalid Date` if the given amount is NaN', function () {
    var result = (0, _2.default)(new Date(2004, 7 /* Aug */, 7), NaN);
    (0, _powerAssert2.default)(result instanceof Date && isNaN(result));
  });

  it('throws TypeError exception if passed less than 1 argument', function () {
    _powerAssert2.default.throws(_2.default.bind(null, 1), TypeError);
  });
});