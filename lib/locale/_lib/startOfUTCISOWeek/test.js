'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('startOfUTCISOWeek', function () {
  it('returns the date with the time set to 00:00:00 and the date set to the first day of an ISO week', function () {
    var date = new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0));
    var result = (0, _2.default)(date);
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2014, 8 /* Sep */, 1)));
  });

  it('accepts a timestamp', function () {
    var date = new Date(Date.UTC(2014, 1 /* Feb */, 11, 11, 55, 0)).getTime();
    var result = (0, _2.default)(date);
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2014, 1 /* Feb */, 10)));
  });

  it('does not mutate the original date', function () {
    var date = new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0));
    (0, _2.default)(date);
    _powerAssert2.default.deepEqual(date, new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0)));
  });

  it('returns `Invalid Date` if the given date is invalid', function () {
    var result = (0, _2.default)(new Date(NaN));
    (0, _powerAssert2.default)(result instanceof Date && isNaN(result));
  });

  it('throws TypeError exception if passed less than 1 argument', function () {
    _powerAssert2.default.throws(_2.default.bind(null), TypeError);
  });
});