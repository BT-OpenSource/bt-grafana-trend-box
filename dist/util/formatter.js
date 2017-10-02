'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Formatter = exports.Formatter = function () {
  function Formatter(panel, kbn) {
    _classCallCheck(this, Formatter);

    this.panel = panel;
    this.kbn = kbn;
  }

  _createClass(Formatter, [{
    key: 'call',
    value: function call(box) {
      box.percent = this._format(box.percent, 'percent');
      box.number = this._format(box.number, this.panel.format);
    }
  }, {
    key: '_format',
    value: function _format(value, format) {
      var formatFunc = this.kbn.valueFormats[format];
      return formatFunc(value, this.panel.decimals, null);
    }
  }]);

  return Formatter;
}();
