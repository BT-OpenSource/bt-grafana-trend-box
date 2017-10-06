'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Presenter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Presenter = exports.Presenter = function () {
  function Presenter(panel) {
    _classCallCheck(this, Presenter);

    this.panel = panel;
  }

  _createClass(Presenter, [{
    key: 'call',
    value: function call(box) {
      box.color = this._color(box.percent);
    }
  }, {
    key: '_color',
    value: function _color(percent) {
      var _this = this;

      var ts = _lodash2.default.sortBy(this.panel.thresholds, function (t) {
        return _this._value(t);
      });
      var threshold = _lodash2.default.find(_lodash2.default.reverse(ts), function (t) {
        return percent >= _this._value(t);
      });
      return threshold ? threshold.color : this.panel.defaultColor;
    }
  }, {
    key: '_value',
    value: function _value(threshold) {
      return parseFloat(threshold.value);
    }
  }]);

  return Presenter;
}();
