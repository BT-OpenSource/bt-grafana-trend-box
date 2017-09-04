'use strict';

System.register(['./module.css!', 'lodash', 'app/core/utils/kbn', 'app/plugins/sdk', './util/builder', './util/presenter', './util/linker'], function (_export, _context) {
  "use strict";

  var _, kbn, MetricsPanelCtrl, Builder, Presenter, Linker, _createClass, panelDefaults, TrendBoxCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_moduleCss) {}, function (_lodash) {
      _ = _lodash.default;
    }, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_utilBuilder) {
      Builder = _utilBuilder.Builder;
    }, function (_utilPresenter) {
      Presenter = _utilPresenter.Presenter;
    }, function (_utilLinker) {
      Linker = _utilLinker.Linker;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      panelDefaults = {
        defaultColor: 'rgb(117, 117, 117)',
        linkIndex: 0,
        displayValue: 'value',
        titleSize: '20px',
        percentSize: '30px',
        numberSize: '14px',
        thresholds: [],
        format: 'none',
        decimals: 2
      };

      _export('PanelCtrl', _export('TrendBoxCtrl', TrendBoxCtrl = function (_MetricsPanelCtrl) {
        _inherits(TrendBoxCtrl, _MetricsPanelCtrl);

        function TrendBoxCtrl($scope, $injector, linkSrv) {
          _classCallCheck(this, TrendBoxCtrl);

          var _this = _possibleConstructorReturn(this, (TrendBoxCtrl.__proto__ || Object.getPrototypeOf(TrendBoxCtrl)).call(this, $scope, $injector));

          _.defaults(_this.panel, panelDefaults);

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('render', _this.onRender.bind(_this));

          _this.builder = new Builder(_this.panel);
          _this.presenter = new Presenter(_this.panel);
          _this.linker = new Linker(_this.panel, linkSrv);

          _this.box = {};
          return _this;
        }

        _createClass(TrendBoxCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/plugins/btplc-trend-box-panel/editor.html');
            this.unitFormats = kbn.getUnitFormats();
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(seriesList) {
            this.seriesList = seriesList;
            this.render();
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            this.box = this.builder.call(this.seriesList);
            this.linker.call(this.box);
            this.presenter.call(this.box);

            this.panelContainer.css('background-color', this.box.color);
            this.panelTitle.css('font-size', this.panel.titleSize);
          }
        }, {
          key: 'onEditorSetFormat',
          value: function onEditorSetFormat(subitem) {
            this.panel.format = subitem.value;
            this.render();
          }
        }, {
          key: 'onEditorAddThreshold',
          value: function onEditorAddThreshold() {
            this.panel.thresholds.push({ value: 0, color: this.panel.defaultColor });
            this.render();
          }
        }, {
          key: 'onEditorRemoveThreshold',
          value: function onEditorRemoveThreshold(index) {
            this.panel.thresholds.splice(index, 1);
            this.render();
          }
        }, {
          key: 'getLink',
          value: function getLink() {
            return this.panel.links[this.panel.linkIndex];
          }
        }, {
          key: 'format',
          value: function format(value) {
            var _format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.panel.format;

            var formatFunc = kbn.valueFormats[_format];
            return formatFunc(value, this.panel.decimals, null);
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            this.panelContainer = elem.find('.panel-container');
            this.panelTitle = elem.find('.panel-title');
          }
        }]);

        return TrendBoxCtrl;
      }(MetricsPanelCtrl)));

      _export('TrendBoxCtrl', TrendBoxCtrl);

      TrendBoxCtrl.templateUrl = 'module.html';

      _export('PanelCtrl', TrendBoxCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
