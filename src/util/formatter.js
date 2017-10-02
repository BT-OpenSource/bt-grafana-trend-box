export class Formatter {
  constructor (options, kbn) {
    this.options = options
    this.kbn = kbn
  }

  call (box) {
    box.percent = this._format(box.percent, 'percent')
    box.number = this._format(box.number, this.options.format)
  }

  _format (value, format) {
    var formatFunc = this.kbn.valueFormats[format]
    return formatFunc(value, this.options.decimals, null)
  }
}
