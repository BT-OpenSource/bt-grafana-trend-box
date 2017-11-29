import {Styler} from '../../src/util/styler'

describe('Styler', () => {
  let subject
  let container
  let title
  let box

  beforeEach(() => {
    let panel = { percentSize: 1, numberSize: 1, titleSize: 1 }
    container = jasmine.createSpyObj('container', ['css'])
    title = jasmine.createSpyObj('title', ['css'])
    subject = new Styler(panel)
    box = { color: 'blue' }
  })

  describe('call', () => {
    it('assigns the style for the percentage', () => {
      subject.call(box, container, title)
      expect(box.percentStyle['font-weight']).toEqual('bold')
      expect(box.percentStyle['font-size']).toEqual(1)
    })

    it('assigns the style for the number', () => {
      subject.call(box, container, title)
      expect(box.numberStyle['font-size']).toEqual(1)
    })

    it('sets the style for the container', () => {
      subject.call(box, container, title)
      expect(container.css).toHaveBeenCalledWith('background-color', 'blue')
    })

    it('sets the style for the panel title', () => {
      subject.call(box, container, title)
      expect(title.css).toHaveBeenCalledWith('font-size', 1)
    })
  })
})
