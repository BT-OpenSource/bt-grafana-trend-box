'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Styler = exports.Styler = function () {
  function Styler(panel) {
    _classCallCheck(this, Styler);

    this.panel = panel;
  }

  _createClass(Styler, [{
    key: 'call',
    value: function call(box, container, title, header, menu) {
      container.css('background-color', box.color);
      title.css('font-size', this.panel.titleSize);
      header.css('max-height', '27px');
      menu.css('font-size', '13px');

      box.percentStyle = this._percentStyle();
      box.numberStyle = this._numberStyle();
    }
  }, {
    key: '_percentStyle',
    value: function _percentStyle() {
      return { 'font-weight': 'bold', 'font-size': this.panel.percentSize };
    }
  }, {
    key: '_numberStyle',
    value: function _numberStyle() {
      return { 'font-size': this.panel.numberSize };
    }
  }]);

  return Styler;
}();
