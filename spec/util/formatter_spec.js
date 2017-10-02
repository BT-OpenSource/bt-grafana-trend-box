import {Formatter} from '../../src/util/formatter'

describe('Formatter', function () {
  beforeEach(function () {
    var panel = { format: 'custom', decimals: 2 }
    this.format = jasmine.createSpy().and.returnValue('custom')

    var kbn = { valueFormats: {
      custom: this.format, percent: function () { return '5%' }
    } }

    this.subject = new Formatter(panel, kbn)
    this.box = { number: 5, percent: 10 }
  })

  describe('call', function () {
    it('formats the percent as a percentage', function () {
      this.subject.call(this.box)
      expect(this.box.percent).toEqual('5%')
    })

    it('formats the number with a given format', function () {
      this.subject.call(this.box)
      expect(this.box.number).toEqual('custom')
      expect(this.format).toHaveBeenCalledWith(5, 2, null)
    })
  })
})
