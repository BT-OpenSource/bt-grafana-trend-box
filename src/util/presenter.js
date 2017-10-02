import _ from 'lodash'

export class Presenter {
  constructor (options) {
    this.options = options
  }

  call (box) {
    box.color = this._color(box.percent)
  }

  _color (percent) {
    var thresholds = _.sortBy(this.options.thresholds, ['value'])
    var threshold = _.find(_.reverse(thresholds), (t) => percent >= t.value)
    return threshold ? threshold.color : this.options.defaultColor
  }
}
