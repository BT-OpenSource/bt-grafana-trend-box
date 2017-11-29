import {Builder} from '../../src/util/builder'

describe('Builder', () => {
  let subject

  beforeEach(() => {
    subject = new Builder()
  })

  describe('call', () => {
    it('builds a box summarising all of the series', () => {
      let seriesList = [
        { target: 'a', datapoints: [[1, 'ts'], [2, 'ts']] },
        { target: 'b', datapoints: [[1, 'ts'], [2, 'ts']] }
      ]

      let expected = { number: 4, percent: 100 }
      expect(subject.call(seriesList)).toEqual(expected)
    })

    it('copes with null values within the series', () => {
      let seriesList = [
        { target: 'a', datapoints: [[null, 'ts'], [null, 'ts']] }
      ]

      let expected = { number: 0, percent: NaN }
      expect(subject.call(seriesList)).toEqual(expected)
    })

    it('copes if the series lists are undefined', () => {
      let expected = { number: 0, percent: NaN }
      expect(subject.call([])).toEqual(expected)
    })
  })
})
