'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/buildFormatLongFn/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// CLDR #1846 - #1849
var dateFormats = {
  full: 'EEEE, d MMMM, y',
  long: 'd MMMM, y',
  medium: 'd MMM, y',
  short: 'd/M/yy'

  // CLDR #1850 - #1853
}; // Ref: https://www.unicode.org/cldr/charts/32/summary/ta.html

var timeFormats = {
  full: 'a h:mm:ss zzzz',
  long: 'a h:mm:ss z',
  medium: 'a h:mm:ss',
  short: 'a h:mm'
};

var dateTimeFormats = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
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