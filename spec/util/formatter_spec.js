import {Formatter} from '../../src/util/formatter'

describe('Formatter', () => {
  let subject
  let format
  let box

  beforeEach(() => {
    let panel = { format: 'custom', decimals: 2 }
    format = jasmine.createSpy().and.returnValue('custom')

    let kbn = { valueFormats: {
      custom: format, percent: () => { return '5%' }
    } }

    subject = new Formatter(panel, kbn)
    box = { number: 5, percent: 10 }
  })

  describe('call', () => {
    it('formats the percent as a percentage', () => {
      subject.call(box)
      expect(box.percent).toEqual('5%')
    })

    it('formats the number with a given format', () => {
      subject.call(box)
      expect(box.number).toEqual('custom')
      expect(format).toHaveBeenCalledWith(5, 2, null)
    })
  })
})
