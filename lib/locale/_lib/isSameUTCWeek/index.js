'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameUTCWeek;

var _index = require('../startOfUTCWeek/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../requiredArgs/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function isSameUTCWeek(dirtyDateLeft, dirtyDateRight, options) {
  (0, _index4.default)(2, arguments);

  var dateLeftStartOfWeek = (0, _index2.default)(dirtyDateLeft, options);
  var dateRightStartOfWeek = (0, _index2.default)(dirtyDateRight, options);

  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}