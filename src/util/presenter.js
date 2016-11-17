import _ from 'lodash'

export class Presenter {
  constructor (options) {
    this.options = options
  }

  call (box) {
    box.percentChange = this._percentChangeFor(box)
    box.color = this._colorFor(box.percentChange)
  }

  _colorFor (percentChange) {
    var thresholds = this.options.thresholds.concat().sort((a, b) => b.value - a.value)
    var threshold = _.find(thresholds, (threshold) => percentChange >= threshold.value)
    return threshold ? threshold.color : this.options.defaultColor
  }

  _percentChangeFor (box) {
    var change = box.latestValue - box.oldestValue
    return (change / box.oldestValue) * 100
  }
}
