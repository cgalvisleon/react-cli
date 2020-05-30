'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCISOWeek;

var _index = require('../toInteger/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../toDate/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../getUTCISOWeek/index.js');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('../requiredArgs/index.js');

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  (0, _index8.default)(2, arguments);

  var date = (0, _index4.default)(dirtyDate);
  var isoWeek = (0, _index2.default)(dirtyISOWeek);
  var diff = (0, _index6.default)(date) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}