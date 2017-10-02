'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Builder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = exports.Builder = function () {
  function Builder() {
    _classCallCheck(this, Builder);
  }

  _createClass(Builder, [{
    key: 'call',
    value: function call() {
      var seriesList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var cleanedSeries = _lodash2.default.map(seriesList, this._cleanup);
      var oldestValue = this._oldestValue(cleanedSeries);
      var latestValue = this._latestValue(cleanedSeries);
      var percent = this._change(oldestValue, latestValue);
      return { number: latestValue || 0, percent: percent };
    }
  }, {
    key: '_change',
    value: function _change(oldestValue, latestValue) {
      var change = latestValue - oldestValue;
      return change / oldestValue * 100;
    }
  }, {
    key: '_oldestValue',
    value: function _oldestValue(cleanedSeries) {
      return _lodash2.default.reduce(cleanedSeries, function (memo, points) {
        return memo + points[0];
      }, 0);
    }
  }, {
    key: '_latestValue',
    value: function _latestValue(cleanedSeries) {
      return _lodash2.default.reduce(cleanedSeries, function (memo, points) {
        return memo + points[points.length - 1];
      }, 0);
    }
  }, {
    key: '_cleanup',
    value: function _cleanup(series) {
      return _lodash2.default.filter(_lodash2.default.map(series.datapoints, function (p) {
        return p[0];
      }));
    }
  }]);

  return Builder;
}();
