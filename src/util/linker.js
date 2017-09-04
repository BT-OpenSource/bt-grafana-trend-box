export class Linker {
  constructor (panel, linkSrv) {
    this.panel = panel
    this.linkSrv = linkSrv
  }

  call (box) {
    var links = this.panel.links || []
    var linkInfo = links[this.panel.linkIndex]

    if (linkInfo === undefined) return

    var args = [linkInfo, this.panel.scopedVars]
    box.link = this.linkSrv.getPanelLinkAnchorInfo(...args)
  }
}
