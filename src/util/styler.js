export class Styler {
  constructor (options) {
    this.options = options
  }

  call (box) {
    box.percentStyle = { 'font-weight': 'bold', 'font-size': this.options.percentSize }
    box.numberStyle = { 'font-size': this.options.numberSize }
  }
}
