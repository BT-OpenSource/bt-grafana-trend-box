import {Styler} from '../../src/util/styler'

describe('Styler', function () {
  beforeEach(function () {
    var options = { percentSize: 1, numberSize: 1 }
    this.box = { }
    this.subject = new Styler(options)
  })

  describe('call', function () {
    it('assigns the style for the percentage', function () {
      this.subject.call(this.box)
      expect(this.box.percentStyle['font-weight']).toEqual('bold')
      expect(this.box.percentStyle['font-size']).toEqual(1)
    })

    it('assigns the style for the number', function () {
      this.subject.call(this.box)
      expect(this.box.numberStyle['font-size']).toEqual(1)
    })
  })
})
