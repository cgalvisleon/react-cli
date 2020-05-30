'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('getUTCISOWeek', function () {
  it('returns the ISO week of the given date', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2005, 0 /* Jan */, 2)));
    (0, _powerAssert2.default)(result === 53);
  });

  it('accepts a timestamp', function () {
    var result = (0, _2.default)(new Date(Date.UTC(2008, 11 /* Dec */, 29)).getTime());
    (0, _powerAssert2.default)(result === 1);
  });

  describe('edge cases', function () {
    it('returns the ISO week at 1 January 2016', function () {
      var result = (0, _2.default)(new Date(Date.UTC(2016, 0 /* Jan */, 1)));
      (0, _powerAssert2.default)(result === 53);
    });

    it('returns the ISO week at 1 May 2016', function () {
      var result = (0, _2.default)(new Date(Date.UTC(2016, 4 /* May */, 1)));
      (0, _powerAssert2.default)(result === 17);
    });

    it('returns the ISO week at 2 May 2016', function () {
      var result = (0, _2.default)(new Date(Date.UTC(2016, 4 /* May */, 2)));
      (0, _powerAssert2.default)(result === 18);
    });

    it('returns the ISO week at 31 May 2016', function () {
      var result = (0, _2.default)(new Date(Date.UTC(2016, 4 /* May */, 31)));
      (0, _powerAssert2.default)(result === 22);
    });
  });

  it('handles dates before 100 AD', function () {
    var initialDate = new Date(0);
    initialDate.setUTCFullYear(7, 11 /* Dec */, 30);
    initialDate.setUTCHours(0, 0, 0, 0);
    var result = (0, _2.default)(initialDate);
    (0, _powerAssert2.default)(result === 52);
  });

  it('returns NaN if the given date is invalid', function () {
    var result = (0, _2.default)(new Date(NaN));
    (0, _powerAssert2.default)(isNaN(result));
  });

  it('throws TypeError exception if passed less than 1 argument', function () {
    _powerAssert2.default.throws(_2.default.bind(null), TypeError);
  });
});