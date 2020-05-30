'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
/* eslint-env mocha */

describe('requiredArgs', function () {
  function wrapperFn(required) {
    // $ExpectedMistake
    return function () {
      (0, _2.default)(required, arguments);
    };
  }
  var twoArgsRequired = wrapperFn(2);

  context('with correct number of passed arguments', function () {
    it('does not throw an error', function () {
      _powerAssert2.default.doesNotThrow(function () {
        return twoArgsRequired(1, 2);
      });
    });
  });

  context('with wrong number of arguments', function () {
    it('throws correct error message', function () {
      _powerAssert2.default.throws(function () {
        twoArgsRequired(1);
      }, function (err) {
        return err instanceof TypeError && err.message === '2 arguments required, but only 1 present';
      });
    });
  });
});