import {Linker} from '../../src/util/linker'

describe('Linker', () => {
  let subject
  let panel
  let box
  let linkSrv

  beforeEach(() => {
    panel = {
      linkVars: [{ name: 'var1' }], scopedVars: 'scopedVars'
    }

    box = { raw: { var1: 'val1' } }
    linkSrv = { getPanelLinkAnchorInfo: () => { } }
    subject = new Linker(panel, linkSrv)
  })

  describe('when the panel has no links', () => {
    it('skips assigning the scoped link', () => {
      subject.call(box)
      expect(box.link).toEqual(undefined)
    })
  })

  describe('when the panel link is invalid', () => {
    beforeEach(() => {
      panel.links = []
      panel.linkIndex = 0
    })

    it('skips assigning the scoped link', () => {
      subject.call(box)
      expect(box.link).toEqual(undefined)
    })
  })

  describe('when the panel has a link', () => {
    beforeEach(() => {
      panel.links = ['linkInfo']
      panel.linkIndex = 0
    })

    it('calls the linkSrv with the panel scope', () => {
      spyOn(linkSrv, 'getPanelLinkAnchorInfo')
      subject.call(box)
      let linkFn = linkSrv.getPanelLinkAnchorInfo
      expect(linkFn).toHaveBeenCalledWith('linkInfo', 'scopedVars')
    })

    it('assigns a scoped link to the box', () => {
      let link = { href: 'http' }
      spyOn(linkSrv, 'getPanelLinkAnchorInfo').and.returnValue(link)
      subject.call(box)
      expect(box.link).toEqual(link)
    })

    it('cleans up links with relative URLs', () => {
      let link = { href: 'link' }
      spyOn(linkSrv, 'getPanelLinkAnchorInfo').and.returnValue(link)
      subject.call(box)
      expect(box.link.href).toEqual('/link')
    })
  })
})
