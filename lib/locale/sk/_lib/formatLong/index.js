'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/buildFormatLongFn/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://www.unicode.org/cldr/charts/32/summary/sk.html?hide#1986
var dateFormats = {
  full: 'EEEE d. MMMM y',
  long: 'd. MMMM y',
  medium: 'd. M. y',
  short: 'd. M. y'

  // https://www.unicode.org/cldr/charts/32/summary/sk.html?hide#2149
};var timeFormats = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'

  // https://www.unicode.org/cldr/charts/32/summary/sk.html?hide#1994
};var dateTimeFormats = {
  full: '{{date}}, {{time}}',
  long: '{{date}}, {{time}}',
  medium: '{{date}}, {{time}}',
  short: '{{date}} {{time}}'
};

var formatLong = {
  date: (0, _index2.default)({
    formats: dateFormats,
    defaultWidth: 'full'
  }),

  time: (0, _index2.default)({
    formats: timeFormats,
    defaultWidth: 'full'
  }),

  dateTime: (0, _index2.default)({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};

exports.default = formatLong;