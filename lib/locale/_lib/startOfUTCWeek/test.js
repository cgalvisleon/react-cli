'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('startOfUTCWeek', function () {
  it('returns the date with the time set to 00:00:00 and the date set to the first day of a week', function () {
    var date = new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0));
    var result = (0, _2.default)(date);
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2014, 7 /* Aug */, 31)));
  });

  it('allows to specify which day is the first day of the week', function () {
    var date = new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0));
    var result = (0, _2.default)(date, { weekStartsOn: 1 });
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2014, 8 /* Sep */, 1)));
  });

  it('allows to specify which day is the first day of the week in locale', function () {
    var date = new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0));
    var result = (0, _2.default)(date, {
      locale: {
        options: { weekStartsOn: 1 }
      }
    });
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2014, 8 /* Sep */, 1)));
  });

  it('`options.weekStartsOn` overwrites the first day of the week specified in locale', function () {
    var date = new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0));
    var result = (0, _2.default)(date, {
      weekStartsOn: 1,
      locale: {
        options: { weekStartsOn: 0 }
      }
    });
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2014, 8 /* Sep */, 1)));
  });

  it('implicitly converts options', function () {
    var date = new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0));
    var result = (0, _2.default)(date, { weekStartsOn: '1' });
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2014, 8 /* Sep */, 1)));
  });

  it('accepts a timestamp', function () {
    var date = new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0)).getTime();
    var result = (0, _2.default)(date);
    _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2014, 7 /* Aug */, 31)));
  });

  it('does not mutate the original date', function () {
    var date = new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0));
    (0, _2.default)(date);
    _powerAssert2.default.deepEqual(date, new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0)));
  });

  describe('edge cases', function () {
    context('when the given day is before the start of a week', function () {
      it('it returns the start of a week', function () {
        var date = new Date(Date.UTC(2014, 9 /* Oct */, 6));
        var result = (0, _2.default)(date, { weekStartsOn: 3 });
        _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2014, 9 /* Oct */, 1)));
      });
    });

    context('when the given day is the start of a week', function () {
      it('it returns the start of a week', function () {
        var date = new Date(Date.UTC(2014, 9 /* Oct */, 8));
        var result = (0, _2.default)(date, { weekStartsOn: 3 });
        _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2014, 9 /* Oct */, 8)));
      });
    });

    context('when the given day is after the start of a week', function () {
      it('it returns the start of a week', function () {
        var date = new Date(Date.UTC(2014, 9 /* Oct */, 10));
        var result = (0, _2.default)(date, { weekStartsOn: 3 });
        _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2014, 9 /* Oct */, 8)));
      });
    });

    it('handles the week at the start of a year', function () {
      var date = new Date(Date.UTC(2014, 0 /* Jan */, 1));
      var result = (0, _2.default)(date);
      _powerAssert2.default.deepEqual(result, new Date(Date.UTC(2013, 11 /* Dec */, 29)));
    });
  });

  it('returns `Invalid Date` if the given date is invalid', function () {
    var result = (0, _2.default)(new Date(NaN));
    (0, _powerAssert2.default)(result instanceof Date && isNaN(result));
  });

  it('throws `RangeError` if `options.weekStartsOn` is not convertable to 0, 1, ..., 6 or undefined', function () {
    var block = _2.default.bind(null, new Date(Date.UTC(2014, 8 /* Sep */, 2, 11, 55, 0)), { weekStartsOn: NaN });
    _powerAssert2.default.throws(block, RangeError);
  });

  it('throws TypeError exception if passed less than 1 argument', function () {
    _powerAssert2.default.throws(_2.default.bind(null), TypeError);
  });
});