'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../fr/_lib/formatDistance/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../fr/_lib/formatRelative/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../fr/_lib/localize/index.js');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('../fr/_lib/match/index.js');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./_lib/formatLong/index.js');

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {Locale}
 * @category Locales
 * @summary French locale (Canada).
 * @language French
 * @iso-639-2 fra
 * @author Jean Dupouy [@izeau]{@link https://github.com/izeau}
 * @author François B [@fbonzon]{@link https://github.com/fbonzon}
 * @author Gabriele Petrioli [@gpetrioli]{@link https://github.com/gpetrioli}
 */
var locale = {
  code: 'fr-CA',
  formatDistance: _index2.default,
  formatLong: _index10.default,
  formatRelative: _index4.default,
  localize: _index6.default,
  match: _index8.default,

  // Unique for fr-CA
  options: {
    weekStartsOn: 0 /* Sunday */
    , firstWeekContainsDate: 1
  }
};

// Unique for fr-CA
// Same as fr
exports.default = locale;