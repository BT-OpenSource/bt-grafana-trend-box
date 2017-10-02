export class Linker {
  constructor (panel, linkSrv) {
    this.panel = panel
    this.linkSrv = linkSrv
  }

  call (box) {
    this._evaluateLink(box, this)
    this._cleanupLink(box, this)
  }

  _evaluateLink (box) {
    var links = this.panel.links || []
    var linkInfo = links[this.panel.linkIndex]

    if (linkInfo === undefined) return

    var args = [linkInfo, this.panel.scopedVars]
    box.link = this.linkSrv.getPanelLinkAnchorInfo(...args)
  }

  _cleanupLink (box) {
    if (box.link === undefined) return

    if (box.link.href.indexOf('http') === -1) {
      box.link.href = '/' + box.link.href
    }
  }
}
