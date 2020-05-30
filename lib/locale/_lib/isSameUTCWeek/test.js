'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('isSameUTCWeek', function () {
  it('returns true if the given dates have the same week', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2014, 7 /* Aug */, 31)), new Date(Date.UTC(2014, 8 /* Sep */, 4)));
    (0, _powerAssert2.default)(result === true);
  });

  it('returns false if the given dates have different weeks', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2014, 7 /* Aug */, 30)), new Date(Date.UTC(2014, 8 /* Sep */, 4)));
    (0, _powerAssert2.default)(result === false);
  });

  it('allows to specify which day is the first day of the week', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2014, 7 /* Aug */, 31)), new Date(Date.UTC(2014, 8 /* Sep */, 4)), { weekStartsOn: 1 });
    (0, _powerAssert2.default)(result === false);
  });

  it('allows to specify which day is the first day of the week in locale', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2014, 7 /* Aug */, 31)), new Date(Date.UTC(2014, 8 /* Sep */, 4)), {
      locale: {
        options: { weekStartsOn: 1 }
      }
    });
    (0, _powerAssert2.default)(result === false);
  });

  it('`options.weekStartsOn` overwrites the first day of the week specified in locale', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2014, 7 /* Aug */, 31)), new Date(Date.UTC(2014, 8 /* Sep */, 4)), {
      weekStartsOn: 1,
      locale: {
        options: { weekStartsOn: 0 }
      }
    });
    (0, _powerAssert2.default)(result === false);
  });

  it('implicitly converts options', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2014, 7 /* Aug */, 31)), new Date(Date.UTC(2014, 8 /* Sep */, 4)), { weekStartsOn: '1' });
    (0, _powerAssert2.default)(result === false);
  });

  it('accepts a timestamp', function () {
    var result = (0, _2.default)(Date.UTC(2014, 7 /* Aug */, 31), Date.UTC(2014, 8 /* Sep */, 4));
    (0, _powerAssert2.default)(result === true);
  });

  it('returns false if the first date is `Invalid Date`', function () {
    var result = (0, _2.default)(new Date(NaN), new Date(Date.UTC(1989, 6 /* Jul */, 10)));
    (0, _powerAssert2.default)(result === false);
  });

  it('returns false if the second date is `Invalid Date`', function () {
    var result = (0, _2.default)(new Date(Date.UTC(1987, 1 /* Feb */, 11)), new Date(NaN));
    (0, _powerAssert2.default)(result === false);
  });

  it('returns false if the both dates are `Invalid Date`', function () {
    var result = (0, _2.default)(new Date(NaN), new Date(NaN));
    (0, _powerAssert2.default)(result === false);
  });

  it('throws `RangeError` if `options.weekStartsOn` is not convertable to 0, 1, ..., 6 or undefined', function () {
    var block = _2.default.bind(null, new Date(Date.UTC(2014, 7 /* Aug */, 31)), new Date(Date.UTC(2014, 8 /* Sep */, 4)), { weekStartsOn: NaN });
    _powerAssert2.default.throws(block, RangeError);
  });

  it('throws TypeError exception if passed less than 1 argument', function () {
    _powerAssert2.default.throws(_2.default.bind(null, 1), TypeError);
  });
});