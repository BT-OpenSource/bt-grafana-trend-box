'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Linker = exports.Linker = function () {
  function Linker(panel, linkSrv) {
    _classCallCheck(this, Linker);

    this.panel = panel;
    this.linkSrv = linkSrv;
  }

  _createClass(Linker, [{
    key: 'call',
    value: function call(box) {
      this._evaluateLink(box, this);
      this._cleanupLink(box, this);
    }
  }, {
    key: '_evaluateLink',
    value: function _evaluateLink(box) {
      var _linkSrv;

      var links = this.panel.links || [];
      var linkInfo = links[this.panel.linkIndex];

      if (linkInfo === undefined) return;

      var args = [linkInfo, this.panel.scopedVars];
      box.link = (_linkSrv = this.linkSrv).getPanelLinkAnchorInfo.apply(_linkSrv, args);
    }
  }, {
    key: '_cleanupLink',
    value: function _cleanupLink(box) {
      if (box.link === undefined) return;

      if (box.link.href.indexOf('http') === -1) {
        box.link.href = '/' + box.link.href;
      }
    }
  }]);

  return Linker;
}();
