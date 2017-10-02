export class Styler {
  constructor (panel) {
    this.panel = panel
  }

  call (box) {
    box.percentStyle = { 'font-weight': 'bold', 'font-size': this.panel.percentSize }
    box.numberStyle = { 'font-size': this.panel.numberSize }
  }
}
