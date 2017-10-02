import {Linker} from '../../src/util/linker'

describe('Linker', function () {
  beforeEach(function () {
    this.panel = {
      linkVars: [{ name: 'var1' }], scopedVars: 'scopedVars'
    }

    this.box = { raw: { var1: 'val1' } }
    this.linkSrv = { getPanelLinkAnchorInfo: function () { } }
    this.subject = new Linker(this.panel, this.linkSrv)
  })

  describe('when the panel has no links', function () {
    it('skips assigning the scoped link', function () {
      this.subject.call(this.box)
      expect(this.box.link).toEqual(undefined)
    })
  })

  describe('when the panel link is invalid', function () {
    beforeEach(function () {
      this.panel.links = []
      this.panel.linkIndex = 0
    })

    it('skips assigning the scoped link', function () {
      this.subject.call(this.box)
      expect(this.box.link).toEqual(undefined)
    })
  })

  describe('when the panel has a link', function () {
    beforeEach(function () {
      this.panel.links = ['linkInfo']
      this.panel.linkIndex = 0
    })

    it('calls the linkSrv with the panel scope', function () {
      spyOn(this.linkSrv, 'getPanelLinkAnchorInfo')
      this.subject.call(this.box)
      var linkFn = this.linkSrv.getPanelLinkAnchorInfo
      expect(linkFn).toHaveBeenCalledWith('linkInfo', 'scopedVars')
    })

    it('assigns a scoped link to the box', function () {
      var link = { href: 'http' }
      spyOn(this.linkSrv, 'getPanelLinkAnchorInfo').and.returnValue(link)
      this.subject.call(this.box)
      expect(this.box.link).toEqual(link)
    })

    it('cleans up links with relative URLs', function () {
      var link = { href: 'link' }
      spyOn(this.linkSrv, 'getPanelLinkAnchorInfo').and.returnValue(link)
      this.subject.call(this.box)
      expect(this.box.link.href).toEqual('/link')
    })
  })
})
