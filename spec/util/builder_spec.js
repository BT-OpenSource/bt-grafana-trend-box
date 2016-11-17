import {Builder} from '../../src/util/builder'

describe('Builder', function () {
  beforeEach(function () {
    this.subject = new Builder({})
  })

  describe('call', function () {
    it('builds a box summarising all of the series', function () {
      var seriesList = [
        { target: 'a', datapoints: [[1, 'ts'], [2, 'ts']] },
        { target: 'b', datapoints: [[2, 'ts'], [3, 'ts']] }
      ]

      var expected = { oldestValue: 3, latestValue: 5 }
      expect(this.subject.call(seriesList)).toEqual(expected)
    })

    it('copes with null values within the series', function () {
      var seriesList = [
        { target: 'a', datapoints: [[null, 'ts'], [null, 'ts']] }
      ]

      var expected = { oldestValue: 0, latestValue: 0 }
      expect(this.subject.call(seriesList)).toEqual(expected)
    })
  })
})
