import {Builder} from '../../src/util/builder'

describe('Builder', function () {
  beforeEach(function () {
    this.subject = new Builder()
  })

  describe('call', function () {
    it('builds a box summarising all of the series', function () {
      var seriesList = [
        { target: 'a', datapoints: [[1, 'ts'], [2, 'ts']] },
        { target: 'b', datapoints: [[1, 'ts'], [2, 'ts']] }
      ]

      var expected = { number: 4, percent: 100 }
      expect(this.subject.call(seriesList)).toEqual(expected)
    })

    it('copes with null values within the series', function () {
      var seriesList = [
        { target: 'a', datapoints: [[null, 'ts'], [null, 'ts']] }
      ]

      var expected = { number: 0, percent: NaN }
      expect(this.subject.call(seriesList)).toEqual(expected)
    })

    it('copes if the series lists are undefined', function () {
      var expected = { number: 0, percent: NaN }
      expect(this.subject.call([])).toEqual(expected)
    })
  })
})
