'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('getUTCWeek', function () {
  it('returns the local week of year of the given date', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2005, 0 /* Jan */, 2)));
    (0, _powerAssert2.default)(result === 2);
  });

  it('accepts a timestamp', function () {
    var result = (0, _2.default)(Date.UTC(2008, 11 /* Dec */, 29));
    (0, _powerAssert2.default)(result === 1);
  });

  it('handles dates before 100 AD', function () {
    var initialDate = new Date(0);
    initialDate.setUTCFullYear(7, 11 /* Dec */, 30);
    initialDate.setUTCHours(0, 0, 0, 0);
    var result = (0, _2.default)(initialDate);
    (0, _powerAssert2.default)(result === 1);
  });

  it('returns NaN if the given date is invalid', function () {
    var result = (0, _2.default)(new Date(NaN));
    (0, _powerAssert2.default)(isNaN(result));
  });

  it('allows to specify `weekStartsOn` and `firstWeekContainsDate` in locale', function () {
    var date = new Date(Date.UTC(2005, 0 /* Jan */, 2));
    var result = (0, _2.default)(date, {
      locale: {
        options: { weekStartsOn: 1, firstWeekContainsDate: 4 }
      }
    });
    (0, _powerAssert2.default)(result === 53);
  });

  it('`options.weekStartsOn` overwrites the first day of the week specified in locale', function () {
    var date = new Date(Date.UTC(2005, 0 /* Jan */, 2));
    var result = (0, _2.default)(date, {
      weekStartsOn: 1,
      firstWeekContainsDate: 4,
      locale: {
        options: { weekStartsOn: 0, firstWeekContainsDate: 1 }
      }
    });
    (0, _powerAssert2.default)(result === 53);
  });

  it('throws `RangeError` if `options.weekStartsOn` is not convertable to 0, 1, ..., 6 or undefined', function () {
    var block = _2.default.bind(null, new Date(2007, 11 /* Dec */, 31), {
      weekStartsOn: NaN
    });
    _powerAssert2.default.throws(block, RangeError);
  });

  it('throws `RangeError` if `options.firstWeekContainsDate` is not convertable to 1, 2, ..., 7 or undefined', function () {
    var block = _2.default.bind(null, new Date(2007, 11 /* Dec */, 31), {
      firstWeekContainsDate: NaN
    });
    _powerAssert2.default.throws(block, RangeError);
  });

  it('throws TypeError exception if passed less than 1 argument', function () {
    _powerAssert2.default.throws(_2.default.bind(null), TypeError);
  });
});