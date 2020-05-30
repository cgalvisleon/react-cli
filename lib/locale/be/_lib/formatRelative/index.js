'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;

var _index = require('../../../../_lib/isSameUTCWeek/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accusativeWeekdays = ['нядзелю', 'панядзелак', 'аўторак', 'сераду', 'чацвер', 'пятніцу', 'суботу'];

function _lastWeek(day) {
  var weekday = accusativeWeekdays[day];

  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у мінулую " + weekday + " а' p";
    case 1:
    case 2:
    case 4:
      return "'у мінулы " + weekday + " а' p";
  }
}

function thisWeek(day) {
  var weekday = accusativeWeekdays[day];

  return "'у " + weekday + " а' p";
}

function _nextWeek(day) {
  var weekday = accusativeWeekdays[day];

  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у наступную " + weekday + " а' p";
    case 1:
    case 2:
    case 4:
      return "'у наступны " + weekday + " а' p";
  }
}

var formatRelativeLocale = {
  lastWeek: function lastWeek(date, baseDate, options) {
    var day = date.getUTCDay();
    if ((0, _index2.default)(date, baseDate, options)) {
      return thisWeek(day);
    } else {
      return _lastWeek(day);
    }
  },
  yesterday: "'учора а' p",
  today: "'сёння а' p",
  tomorrow: "'заўтра а' p",
  nextWeek: function nextWeek(date, baseDate, options) {
    var day = date.getUTCDay();
    if ((0, _index2.default)(date, baseDate, options)) {
      return thisWeek(day);
    } else {
      return _nextWeek(day);
    }
  },
  other: 'P'
};

function formatRelative(token, date, baseDate, options) {
  var format = formatRelativeLocale[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
}