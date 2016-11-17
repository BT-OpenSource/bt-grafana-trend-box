import {Presenter} from '../../src/util/presenter'

describe('Presenter', function () {
  beforeEach(function () {
    this.options = {
      defaultColor: 'default', thresholds: []
    }

    this.subject = new Presenter(this.options)
  })

  describe('call', function () {
    beforeEach(function () {
      this.box = { oldestValue: 1, latestValue: 2 }
    })

    describe('using the box values', function () {
      describe('when the values are normal', function () {
        it('calculates the percentage change', function () {
          this.subject.call(this.box)
          expect(this.box.percentChange).toEqual(100)
        })
      })

      describe('when the values are null', function () {
        it('calculates a NaN percentage change', function () {
          this.box.oldestValue = this.box.latestValue = null
          this.subject.call(this.box)
          expect(this.box.percentChange).toEqual(NaN)
        })
      })

      describe('when the values are zero', function () {
        it('calculates a NaN percentage change', function () {
          this.box.oldestValue = this.box.latestValue = 0
          this.subject.call(this.box)
          expect(this.box.percentChange).toEqual(NaN)
        })
      })
    })

    describe('using the percent change', function () {
      describe('when there are no thresholds', function () {
        it('assigns the default color', function () {
          this.subject.call(this.box)
          expect(this.box.color).toEqual('default')
        })
      })

      describe('when the thresholds are too high', function () {
        it('assigns the default color', function () {
          this.options.thresholds.push({ value: 101, color: 'color' })
          this.subject.call(this.box)
          expect(this.box.color).toEqual('default')
        })
      })

      describe('when a threshold value is reached', function () {
        it('assigns the threshold color', function () {
          this.options.thresholds.push({ value: 100, color: 'color' })
          this.subject.call(this.box)
          expect(this.box.color).toEqual('color')
        })
      })

      describe('when several thresholds are reached', function () {
        it('uses the closest threshold color', function () {
          this.options.thresholds.push({ value: 99, color: 'color1' })
          this.options.thresholds.push({ value: 89, color: 'color2' })
          this.subject.call(this.box)
          expect(this.box.color).toEqual('color1')
        })
      })
    })
  })
})
