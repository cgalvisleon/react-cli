'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var crypto = require('crypto');
var format = require('date-fns/format');
var getUnixTime = require('date-fns/getUnixTime');
var differenceInMinutes = require('date-fns/differenceInMinutes');

var _require = require('./locale/index'),
    esLA = _require.esLA;

var fs = require('fs');
var path = require('path');
var uuidV4 = require('uuid/v4');
var mime = require('./mime');
var $ = require('jquery');

var valid = function valid(a, b) {
  var result = false;
  var typea = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var typeb = typeof b === 'undefined' ? 'undefined' : _typeof(b);
  if (typea === typeb) {
    if (typea === 'object' && Array.isArray(a)) {
      for (var i = 0; i < a.length; i++) {
        var vala = a[i];
        var valb = b[i];
        result = valid(vala, valb);
        if (result) {
          break;
        }
      }
    } else if (typeb === 'object') {
      var bKeys = Object.keys(b).sort();
      for (var _i = 0; _i < bKeys.length; _i++) {
        var key = bKeys[_i];
        var _vala = a[key];
        var _valb = b[key];
        result = valid(_vala, _valb);
        if (result) {
          break;
        }
      }
    } else {
      result = a !== b;
    }
  }
  return result;
};

var equal = function equal(a, b) {
  var result = false;
  var msg = '';
  var typea = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var typeb = typeof b === 'undefined' ? 'undefined' : _typeof(b);
  if (typea === typeb) {
    if (typea === 'object' && Array.isArray(a)) {
      for (var i = 0; i < a.length; i++) {
        var vala = a[i];
        var valb = b[i];
        result = equal(vala, valb);
        if (!result.result) {
          result = result.result;
          msg = result.msg;
          break;
        }
      }
    } else if (typea === 'object') {
      var aKeys = Object.keys(a).sort();
      var bKeys = Object.keys(b).sort();
      if (aKeys.length !== bKeys.length) {
        result = false;
        msg = 'Different Schema';
      } else if (aKeys.join('') !== bKeys.join('')) {
        result = false;
        msg = 'Different Schema';
      } else {
        for (var _i2 = 0; _i2 < aKeys.length; _i2++) {
          var aKey = aKeys[_i2];
          var bKey = bKeys[_i2];
          var _vala2 = a[aKey];
          var _valb2 = b[bKey];
          result = equal(_vala2, _valb2);
          if (!result.result) {
            result = result.result;
            msg = { aKey: aKey };
            break;
          }
        }
      }
    } else {
      result = a === b;
      if (!result) {
        msg = { a: a, b: b };
      }
    }
  } else {
    msg = { msg: 'Different type', typea: typea, typeb: typeb };
  }
  return { result: result, msg: msg };
};

var cryptoMd5 = function cryptoMd5(value) {
  return crypto.createHash('md5').update(value).digest('hex');
};

var emptyValue = function emptyValue(data, fieldName, _default) {
  if (data === undefined || data === null) {
    return _default;
  } else if (data[fieldName] === undefined || data[fieldName] === null || data[fieldName] === '' || Object.keys(data[fieldName]).length === 0) {
    return _default;
  } else {
    return data[fieldName];
  }
};

var getValue = function getValue(data, fieldName, _default) {
  _default = _default || '';
  if (data === undefined || data === null) {
    return _default;
  } else if (data[fieldName] === undefined || data[fieldName] === null) {
    return _default;
  } else {
    return data[fieldName];
  }
};

var getData = function getData(result, fieldName, _default) {
  var data = getValue(result, '_data', {});
  return getValue(data, fieldName, _default);
};

var getStringify = function getStringify(data, fieldName, _default) {
  _default = _default || [];
  var result = '';
  if (data === undefined || data === null) {
    result = _default;
  } else if (data[fieldName] === undefined || data[fieldName] === null) {
    result = _default;
  } else {
    result = data[fieldName];
  }
  return JSON.stringify(result);
};

var getArray = function getArray(data, fieldName) {
  if (data === undefined || data === null) {
    return '[]';
  } else if (data[fieldName] === undefined || data[fieldName] === null) {
    return '[]';
  } else {
    var result = data[fieldName];
    return '\'' + result + '\'';
  }
};

var getDateValue = function getDateValue(data, fieldName, _default) {
  _default = _default || new Date();
  var date = getValue(data, fieldName, _default);
  try {
    if (date === '') {
      return _default;
    } else {
      return new Date(date);
    }
  } catch (err) {
    return date;
  }
};

var getDateTime = function getDateTime(data, fieldName, _default) {
  _default = _default || new Date();
  var date = getValue(data, fieldName, _default);
  try {
    return formatDate(new Date(date), "yyyy-MM-dd'T'HH:mm:ss");
  } catch (err) {
    return date;
  }
};

var getDate = function getDate(data, fieldName, _default) {
  _default = _default || new Date();
  var date = getValue(data, fieldName, _default);
  try {
    return formatDate(new Date(date), 'yyyy-MM-dd');
  } catch (err) {
    return date;
  }
};

var getDateFormat = function getDateFormat(data, fieldName, _format, _default) {
  _format = _format || 'yyyy-MM-dd';
  _default = _default || '';
  var date = getValue(data, fieldName, _default);
  if (date === _default) {
    return date;
  } else {
    try {
      return formatDate(new Date(date), _format);
    } catch (err) {
      return date;
    }
  }
};

var getTime = function getTime(data, fieldName, _default) {
  _default = _default || new Date();
  var date = getValue(data, fieldName, _default);
  try {
    return formatDate(new Date(date), 'HH:mm:ss');
  } catch (err) {
    return date;
  }
};

var getDateDifference = function getDateDifference(data, fieldDateInt, fieldDateEnd, exclude) {
  var now = new Date();
  exclude = exclude || false;
  var dateInt = getDateValue(data, fieldDateInt, now);
  var dateEnd = getDateValue(data, fieldDateEnd, now);
  try {
    if (exclude) {
      return differenceInMinutes(dateEnd, dateInt);
    } else {
      return differenceInMinutes(dateEnd, dateInt);
    }
  } catch (err) {
    return 0;
  }
};

var getDifferenceInDays = function getDifferenceInDays(data, fieldName, literal) {
  var now = new Date();
  var value = getValue(data, fieldName, now);
  try {
    value = new Date(value);
    var days = 0;
    if (value > now) {
      days = differenceInDays(new Date(value), now);
    } else {
      days = differenceInDays(now, new Date(value));
    }
    if (literal) {
      return days === 1 ? '1 día' : days + ' d\xEDas';
    } else {
      return days;
    }
  } catch (err) {
    return 0;
  }
};

var getNumber = function getNumber(data, fieldName, _default) {
  var value = getValue(data, fieldName, _default);
  if (typeof value == 'number') {
    return formatNumber(value, 2);
  } else {
    return value;
  }
};

var getMoney = function getMoney(data, fieldName, _default) {
  var value = getValue(data, fieldName, _default);
  if (typeof value == 'number') {
    return formatMoney(value);
  } else {
    return value;
  }
};

var getPassword = function getPassword(data, fieldName) {
  if (data === undefined || data === null) {
    return '';
  } else if (data[fieldName] === undefined) {
    return '';
  } else {
    return cryptoMd5(data[fieldName]);
  }
};

var getPayload = function getPayload(value) {
  var payload = Buffer.from(value, 'base64').toString();
  return JSON.parse(payload);
};

var getId = function getId(data) {
  if (data === undefined || data === null) {
    return genId('-1');
  } else if (data['_id'] === undefined || data['_id'] === null) {
    return genId('-1');
  } else {
    return data['_id'];
  }
};

var genId = function genId(id) {
  if (id === '-1' || id === 'new') {
    return uuidV4();
  } else {
    return id;
  }
};

var genFileName = function genFileName(name, ext, size) {
  var now = new Date();
  var payload = {
    name: name,
    ext: ext,
    size: size,
    iat: getUnixTime(now)
  };
  var result = JSON.stringify(payload);
  return Buffer.from(result, 'utf8').toString('base64');
};

var genImgBase64 = function genImgBase64(fileName) {
  var file = fs.readFileSync(fileName);
  var ext = path.extname(fileName);
  var base64 = file.toString('base64');
  return 'data:image/' + ext.split('.').pop() + ';base64,' + base64;
};

var getItem = function getItem(list, index) {
  if (list === undefined) {
    return {};
  } else if (list[index] === undefined) {
    return {};
  } else {
    return list[index];
  }
};

var getRow = function getRow(list, index, fieldName, _default) {
  if (list === undefined) {
    return _default;
  } else if (list[index] === undefined) {
    return _default;
  } else if (list[index][fieldName] === undefined) {
    return _default;
  } else if (list[index][fieldName] === null) {
    return _default;
  } else {
    return list[index][fieldName];
  }
};

var getRowNumber = function getRowNumber(list, index, fieldName, _default) {
  _default = _default === undefined ? 0 : _default;
  var value = getRow(list, index, fieldName, _default);
  if (value === '') {
    return _default;
  } else {
    return formatNumber(value);
  }
};

var getRowMoney = function getRowMoney(list, index, fieldName, _default) {
  _default = _default === undefined ? 0 : _default;
  var value = getRow(list, index, fieldName, _default);
  if (value === '') {
    return _default;
  } else {
    return formatMoney(value);
  }
};

var validStr = function validStr(val, len) {
  len = len || 0;
  if (val === null) {
    return false;
  } else if (val === undefined) {
    return false;
  } else if (val.length === 0) {
    return false;
  } else if (len > 0) {
    return val.length >= len;
  } else {
    return true;
  }
};

var validEmail = function validEmail(value) {
  return (/^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(value)
  );
};

var validCellPhone = function validCellPhone(value) {
  return (/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value)
  );
};

var validValue = function validValue(data, fieldName, valid, _default) {
  var value = getValue(data, fieldName, _default);
  if (value === valid) {
    return _default;
  } else {
    return value;
  }
};

var now = function now(_format) {
  var date = new Date();
  _format = _format === undefined ? 'dd/MM/yyyy HH:mm:SSSS' : _format;
  return formatDate(date, _format);
};

var div = function div(divisor, dividendo) {
  if (dividendo === 0) {
    return divisor;
  } else {
    return divisor / dividendo;
  }
};

var number = function number(value) {
  var result = Number(value);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
};

var chart = function chart(str, int) {
  return str.charAt(int);
};

var formatDate = function formatDate(value, formato) {
  formato = formato || 'dd/MM/yyyy'; /** 'dd/MM/yyyy HH:mm a' */
  try {
    return format(new Date(value), formato, { locale: esLA });
  } catch (err) {
    return value;
  }
};

var formatFloat = function formatFloat(value, precision) {
  precision = precision || 2;
  if (value === undefined) {
    return '0';
  } else {
    value = number(value);
    value = value.toLocaleString('es-us', {
      maximumFractionDigits: precision,
      minimumFractionDigits: precision
    });
    return '' + value;
  }
};

var formatNumber = function formatNumber(value) {
  if (value === undefined) {
    return '0';
  } else {
    value = number(value);
    value = value.toLocaleString('es-CO', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
    return '' + value;
  }
};

var formatInteger = function formatInteger(value) {
  value = formatNumber(value);
  value = value.toString().split(',')[0];
  return value;
};

var formatMoney = function formatMoney(value) {
  if (value === undefined) {
    return '$ 0';
  } else {
    value = number(value);
    value = value.toLocaleString('es-CO', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
    return '$ ' + value;
  }
};

var formatDHM = function formatDHM(value) {
  var d = Math.trunc(value / 1440);
  var h = Math.trunc((value - d * 1440) / 60);
  var m = Math.trunc(value - d * 1440 - h * 60);
  return d + 'D ' + h + 'H ' + m + 'M';
};

var setValue = function setValue(data, fieldName, value) {
  if (data === undefined || data === null) {
    data = {};
    data[fieldName] = value;
  } else if (data[fieldName] === undefined || data[fieldName] === null) {
    data[fieldName] = value;
  } else {
    data[fieldName] = value;
  }
  return data;
};

var setFocus = function setFocus(id) {
  setTimeout(function () {
    focus(id);
  }, 1000);
};

var focus = function focus(id) {
  $('#' + id).focus();
};

var toggle = function toggle(id) {
  $('#' + id).toggle();
};

var style = function style(id, attr, value) {
  $('#' + id).css(attr, value);
};

var showModal = function showModal(id) {
  $('#' + id).modal({
    backdrop: 'static',
    keyboard: false,
    show: true
  });
  setFocus(id + '_caption');
};

var hideModal = function hideModal(id) {
  $('#' + id).modal('hide');
};

var jsonToString = function jsonToString(value) {
  return JSON.stringify(value);
};

var jsonBlank = function jsonBlank(value) {
  return JSON.stringify(value) === '{}';
};

var respond = function respond(status, data, msg, message) {
  if (Object.keys(data).length === 0) {
    return {
      status: status || 200,
      results: {
        msg: 'NOTFIND',
        message: 'Dato no encontrado',
        data: data || {}
      }
    };
  } else {
    return {
      status: status || 200,
      results: {
        msg: msg || '',
        message: message || '',
        data: data || {}
      }
    };
  }
};

var section = function section(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

var capitalize = function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/(?:^|\s)\S(?!^|\s)/g, function (a) {
    return a.toUpperCase();
  });
};

var phone = function phone(s) {
  var cleaned = ('' + s).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/);
  if (match) {
    return ['(+', match[1], ') ', match[2], '-', match[3]].join('');
  } else {
    match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return ['(', match[1], ') ', match[2], '-', match[3]].join('');
    }
  }
  return cleaned;
};

var float = function float(s) {
  s = s.toString();
  var a = s.split('.');
  if (a.length > 1) {
    s = a[0] + '.' + a[1];
  }
  s = s.replace(/[a-zA-Z-*+/=<>,:;?^${}()|[\]\\`~!@#%&]/g, '');
  return s;
};

var minicount = function minicount(value) {
  if (value > 999999999) {
    var v = value / 1000000000;
    var i = v.toString().split('.')[0];
    var d = (v.toString().split('.')[1] || 0).toString().substring(0, 1) || 0;
    return i + '.' + d + 'B';
  } else if (value > 999999) {
    var _v = value / 1000000;
    var _i3 = _v.toString().split('.')[0];
    var _d = (_v.toString().split('.')[1] || 0).toString().substring(0, 1) || 0;
    return _i3 + '.' + _d + 'M';
  } else if (value > 999) {
    var _v2 = value / 1000;
    var _i4 = _v2.toString().split('.')[0];
    var _d2 = (_v2.toString().split('.')[1] || 0).toString().substring(0, 1) || 0;
    return _i4 + '.' + _d2 + 'K';
  } else if (value <= 0 || !value) {
    return '';
  } else {
    return formatInteger(value);
  }
};

var appendStr = function appendStr(str, add, space) {
  str = str || '';
  add = add || '';
  space = space || ' ';
  if (add.length === 0) {
    return str;
  } else if (str.length === 0) {
    return add;
  } else {
    return '' + str + space + add;
  }
};

var MIME = function MIME(ext) {
  return mime[ext] || '';
};

var clone = function clone(json) {
  return JSON.parse(JSON.stringify(json));
};

var join = function join(list, add, key) {
  list = list || [];
  var result = list;
  add.map(function (item) {
    var index = list.findIndex(function (element) {
      return element[key] === item[key];
    });
    if (index === -1) {
      result.push(item);
    }
    return result;
  });
  return result;
};

var updateList = function updateList(list, item) {
  var filter = function filter(select) {
    return select._id === item._id;
  };
  var result = list;
  var index = result.list.findIndex(filter);
  if (index === -1) {
    if (item._state === result.state || result.state === 'ALL') {
      result.all = result.all + 1;
      result.end = result.end + 1;
      result.rows = result.rows + 1;
      result.count = result.count + 1;
      result.list.unshift(item);
    }
  } else {
    if (item._state === result.state || result.state === 'ALL') {
      result.list[index] = item;
    } else if (result.list[index].delete) {
      result.all = result.all + 1;
      result.end = result.end + 1;
      result.rows = result.rows + 1;
      result.count = result.count + 1;
      result.list[index] = item;
    } else {
      result.all = result.all - 1;
      result.end = result.end - 1;
      result.rows = result.rows - 1;
      result.count = result.count - 1;
      result.list[index] = item;
      result.list[index].delete = true;
    }
  }
  return result;
};

var normalizeName = function normalizeName(str) {
  return str.replace(/ /g, '_').toLowerCase();
};

var charCode = function charCode(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    result = '' + result + c;
  }
  return result;
};

module.exports = {
  equal: equal,
  valid: valid,
  cryptoMd5: cryptoMd5,
  emptyValue: emptyValue,
  getValue: getValue,
  getData: getData,
  getStringify: getStringify,
  getArray: getArray,
  getDateValue: getDateValue,
  getDateTime: getDateTime,
  getDate: getDate,
  getDateFormat: getDateFormat,
  getTime: getTime,
  getDateDifference: getDateDifference,
  getDifferenceInDays: getDifferenceInDays,
  getNumber: getNumber,
  getMoney: getMoney,
  getPassword: getPassword,
  getPayload: getPayload,
  getId: getId,
  genId: genId,
  genFileName: genFileName,
  genImgBase64: genImgBase64,
  getItem: getItem,
  getRow: getRow,
  getRowNumber: getRowNumber,
  getRowMoney: getRowMoney,
  validStr: validStr,
  validEmail: validEmail,
  validCellPhone: validCellPhone,
  validValue: validValue,
  now: now,
  div: div,
  number: number,
  chart: chart,
  formatDate: formatDate,
  formatFloat: formatFloat,
  formatNumber: formatNumber,
  formatInteger: formatInteger,
  formatMoney: formatMoney,
  formatDHM: formatDHM,
  setValue: setValue,
  setFocus: setFocus,
  focus: focus,
  toggle: toggle,
  style: style,
  showModal: showModal,
  hideModal: hideModal,
  jsonToString: jsonToString,
  jsonBlank: jsonBlank,
  respond: respond,
  section: section,
  capitalize: capitalize,
  phone: phone,
  float: float,
  minicount: minicount,
  appendStr: appendStr,
  MIME: MIME,
  clone: clone,
  join: join,
  updateList: updateList,
  normalizeName: normalizeName,
  charCode: charCode
};