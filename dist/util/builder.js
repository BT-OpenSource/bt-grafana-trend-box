'use strict';

System.register(['lodash'], function (_export, _context) {
  "use strict";

  var _, _createClass, Builder;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
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

      _export('Builder', Builder = function () {
        function Builder(options) {
          _classCallCheck(this, Builder);

          this.options = options;
        }

        _createClass(Builder, [{
          key: 'call',
          value: function call() {
            var seriesList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var cleanedSeries = _.map(seriesList, this._cleanup);

            return { oldestValue: this._oldestValueFor(cleanedSeries),
              latestValue: this._latestValueFor(cleanedSeries) };
          }
        }, {
          key: '_cleanup',
          value: function _cleanup(series) {
            return _.filter(series.datapoints, function (point) {
              return point[0] != null;
            });
          }
        }, {
          key: '_oldestValueFor',
          value: function _oldestValueFor(cleanedSeries) {
            return _.reduce(cleanedSeries, function (memo, points) {
              var point = points[0];
              return memo + (point ? point[0] : 0);
            }, 0);
          }
        }, {
          key: '_latestValueFor',
          value: function _latestValueFor(cleanedSeries) {
            return _.reduce(cleanedSeries, function (memo, points) {
              var point = points[points.length - 1];
              return memo + (point ? point[0] : 0);
            }, 0);
          }
        }]);

        return Builder;
      }());

      _export('Builder', Builder);
    }
  };
});
//# sourceMappingURL=builder.js.map
