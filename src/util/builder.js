import _ from 'lodash'

export class Builder {
  constructor (options) {
    this.options = options
  }

  call (seriesList = []) {
    var cleanedSeries = _.map(seriesList, this._cleanup)

    return { oldestValue: this._oldestValueFor(cleanedSeries),
      latestValue: this._latestValueFor(cleanedSeries) }
  }

  _cleanup (series) {
    return _.filter(series.datapoints, (point) => point[0] != null)
  }

  _oldestValueFor (cleanedSeries) {
    return _.reduce(cleanedSeries, (memo, points) => {
      var point = points[0]
      return memo + (point ? point[0] : 0)
    }, 0)
  }

  _latestValueFor (cleanedSeries) {
    return _.reduce(cleanedSeries, (memo, points) => {
      var point = points[points.length - 1]
      return memo + (point ? point[0] : 0)
    }, 0)
  }
}
