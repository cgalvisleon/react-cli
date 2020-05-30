'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;
var formatRelativeLocale = {
  lastWeek: '[hier] dddd [à] LT',
  yesterday: '[hier à] LT',
  today: '[aujourd’hui à] LT',
  tomorrow: '[demain à] LT',
  nextWeek: 'dddd [à] LT',
  other: 'L'
};

function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}