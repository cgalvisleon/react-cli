'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('getUTCDayOfYear', function () {
  it('returns the day of the year of the given date', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2014, 6 /* Jul */, 2)));
    (0, _powerAssert2.default)(result === 183);
  });

  it('accepts a timestamp', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2014, 0 /* Jan */, 2)).getTime());
    (0, _powerAssert2.default)(result === 2);
  });

  it('handles dates before 100 AD', function () {
    var initialDate = new Date(0);
    initialDate.setUTCFullYear(0, 11 /* Dec */, 31);
    initialDate.setUTCHours(0, 0, 0, 0);
    var result = (0, _2.default)(initialDate);
    (0, _powerAssert2.default)(result === 366);
  });

  it('returns NaN if the given date is invalid', function () {
    var result = (0, _2.default)(new Date(NaN));
    (0, _powerAssert2.default)(isNaN(result));
  });

  it('throws TypeError exception if passed less than 1 argument', function () {
    _powerAssert2.default.throws(_2.default.bind(null), TypeError);
  });
});