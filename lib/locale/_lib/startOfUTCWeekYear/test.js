'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('startOfUTCWeekYear', function () {
  it('returns the date with the time set to 00:00:00 and the date set to the first day of a week year', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2005, 6 /* Jul */, 2)));
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2004, 11 /* Dec */, 26, 0, 0, 0, 0)));
  });

  it('accepts a timestamp', function () {
    var result = (0, _2.default)(Date.UTC(2005, 0 /* Jan */, 1, 6, 0));
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2004, 11 /* Dec */, 26, 0, 0, 0, 0)));
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
    expectedResult.setUTCFullYear(8, 11 /* Dec */, 28);
    expectedResult.setUTCHours(0, 0, 0, 0);
    var result = (0, _2.default)(initialDate);
    _powerAssert2.default.deepEqual(result, expectedResult);
  });

  it('returns `Invalid Date` if the given date is invalid', function () {
    var result = (0, _2.default)(new Date(NaN));
    (0, _powerAssert2.default)(result instanceof Date && isNaN(result));
  });

  it('allows to specify `weekStartsOn` and `firstWeekContainsDate` in locale', function () {
    var date = new Date(Date.UTC(2005, 6 /* Jul */, 2));
    var result = (0, _2.default)(date, {
      locale: {
        options: { weekStartsOn: 1, firstWeekContainsDate: 4 }
      }
    });
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2005, 0 /* Jan */, 3, 0, 0, 0, 0)));
  });

  it('`options.weekStartsOn` overwrites the first day of the week specified in locale', function () {
    var date = new Date(2005, 6 /* Jul */, 2);
    var result = (0, _2.default)(date, {
      weekStartsOn: 1,
      firstWeekContainsDate: 4,
      locale: {
        options: { weekStartsOn: 0, firstWeekContainsDate: 1 }
      }
    });
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2005, 0 /* Jan */, 3, 0, 0, 0, 0)));
  });

  it('throws `RangeError` if `options.weekStartsOn` is not convertable to 0, 1, ..., 6 or undefined', function () {
    var block = _2.default.bind(null, new Date(2007, 11 /* Dec */, 31), { weekStartsOn: NaN });
    _powerAssert2.default.throws(block, RangeError);
  });

  it('throws `RangeError` if `options.firstWeekContainsDate` is not convertable to 1, 2, ..., 7 or undefined', function () {
    var block = _2.default.bind(null, new Date(2007, 11 /* Dec */, 31), { firstWeekContainsDate: NaN });
    _powerAssert2.default.throws(block, RangeError);
  });

  it('throws TypeError exception if passed less than 1 argument', function () {
    _powerAssert2.default.throws(_2.default.bind(null), TypeError);
  });
});