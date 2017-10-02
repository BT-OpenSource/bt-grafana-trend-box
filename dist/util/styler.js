'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Styler = exports.Styler = function () {
  function Styler(options) {
    _classCallCheck(this, Styler);

    this.options = options;
  }

  _createClass(Styler, [{
    key: 'call',
    value: function call(box) {
      box.percentStyle = { 'font-weight': 'bold', 'font-size': this.options.percentSize };
      box.numberStyle = { 'font-size': this.options.numberSize };
    }
  }]);

  return Styler;
}();
