'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('startOfUTCISOWeekYear', function () {
  it('returns the date with the time set to 00:00:00 and the date set to the first day of an ISO year', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2009, 0 /* Jan */, 1, 16, 0)));
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2008, 11 /* Dec */, 29, 0, 0, 0, 0)));
  });

  it('accepts a timestamp', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2005, 0 /* Jan */, 1, 6, 0)).getTime());
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2003, 11 /* Dec */, 29, 0, 0, 0, 0)));
  });

  it('does not mutate the original date', function () {
    var date = new Date(Date.UTC(2014, 6 /* Jul */, 2));
    (0, _2.default)(date);
    _powerAssert2.default.deepEqual(date, new Date(Date.UTC(2014, 6 /* Jul */, 2)));
  });

  it('handles dates before 100 AD', function () {
    var initialDate = new Date(0);
    initialDate.setUTCFullYear(9, 0 /* Jan */, 1);
    initialDate.setUTCHours(0, 0, 0, 0);
    var expectedResult = new Date(0);
    expectedResult.setUTCFullYear(8, 11 /* Dec */, 29);
    expectedResult.setUTCHours(0, 0, 0, 0);
    var result = (0, _2.default)(initialDate);
    _powerAssert2.default.deepEqual(result, expectedResult);
  });

  it('correctly handles years in which 4 January is Sunday', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2009, 6 /* Jul */, 2)));
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2008, 11 /* Dec */, 29)));
  });

  it('returns `Invalid Date` if the given date is invalid', function () {
    var result = (0, _2.default)(new Date(NaN));
    (0, _powerAssert2.default)(result instanceof Date && isNaN(result));
  });

  it('throws TypeError exception if passed less than 1 argument', function () {
    _powerAssert2.default.throws(_2.default.bind(null), TypeError);
  });
});