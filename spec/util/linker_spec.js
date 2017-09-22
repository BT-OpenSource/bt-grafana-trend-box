import {Linker} from '../../src/util/linker'

describe('Linker', function () {
  beforeEach(function () {
    this.panel = { scopedVars: 'vars' }
    this.box = { }
    this.linkSrv = { getPanelLinkAnchorInfo: function () { } }
    this.subject = new Linker(this.panel, this.linkSrv)
  })

  describe('call', function () {
    describe('when the panel has no links', function () {
      it('skips assiging the box link', function () {
        this.subject.call(this.box)
        expect(this.box.link).toEqual(undefined)
      })
    })

    describe('when the panel link is invalid', function () {
      beforeEach(function () {
        this.panel.links = []
        this.panel.linkIndex = 0
      })

      it('skips assiging the box link', function () {
        this.subject.call(this.box)
        expect(this.box.link).toEqual(undefined)
      })
    })

    describe('when the panel has a link', function () {
      beforeEach(function () {
        this.panel.links = ['linkInfo']
        this.panel.linkIndex = 0
      })

      it('calls the linkSrv with scoped vars', function () {
        spyOn(this.linkSrv, 'getPanelLinkAnchorInfo')
        this.subject.call(this.box)
        var linkFn = this.linkSrv.getPanelLinkAnchorInfo
        expect(linkFn).toHaveBeenCalledWith('linkInfo', 'vars')
      })

      it('assigns the scoped link to the box', function () {
        spyOn(this.linkSrv, 'getPanelLinkAnchorInfo').and.returnValue('link')
        this.subject.call(this.box)
        expect(this.box.link).toEqual('link')
      })
    })
  })
})
