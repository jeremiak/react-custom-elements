import CustomElement from '../src/CustomElement.js'

const noop = () => {}

describe('CustomElement', () => {
  describe('in usage', () => {
    it('should work', () => {})
  })

  describe('connectedCallback()', () => {
    const base = {
      componentDidMount: noop,
      initDefaultProps: noop,
      initPropAccessors: noop,
      update: noop
    }

    it('should call initDefaultProps', () => {
      const spy = sinon.spy()
      const obj = Object.assign({}, base, {
        initDefaultProps: spy
      })
      const fn = CustomElement.prototype.connectedCallback.bind(obj)
      fn()
      expect(spy.callCount).to.equal(1)
    })

    it('should call initPropAccessors', () => {
      const spy = sinon.spy()
      const obj = Object.assign({}, base, {
        initPropAccessors: spy
      })
      const fn = CustomElement.prototype.connectedCallback.bind(obj)
      fn()
      expect(spy.callCount).to.equal(1)
    })

    it('should call componentDidMount', () => {
      const spy = sinon.spy()
      const obj = Object.assign({}, base, {
        componentDidMount: spy
      })
      const fn = CustomElement.prototype.connectedCallback.bind(obj)
      fn()
      expect(spy.callCount).to.equal(1)
    })
  })

  describe('disconnectedCallback()', () => {
    it('should call componentDidUnmount', () => {
      const spy = sinon.spy()
      const obj = {
        componentDidUnmount: spy
      }
      const fn = CustomElement.prototype.disconnectedCallback.bind(obj)
      fn()
      expect(spy.callCount).to.equal(1)
    })
  })

  describe('render()', () => {
    it('should return a string', () => {
      const obj = { props: {}, state: {} }
      const actual = CustomElement.prototype.render.apply(obj)
      expect(typeof actual).to.equal('string')
    })
  })

  describe('setState()', () => {
    it('should set new state keys without replacing old', () => {
      const obj = { state: { first: 'foo' }, update: () => {} }
      const fn = CustomElement.prototype.setState.bind(obj)
      fn({ second: 'dude' })
      expect(obj.state.first).to.equal('foo')
      expect(obj.state.second).to.equal('dude')
    })

    it('should replace old state keys', () => {
      const obj = { state: { first: 'foo' }, update: () => {} }
      const fn = CustomElement.prototype.setState.bind(obj)
      fn({ first: 'dude' })
      expect(obj.state.first).to.equal('dude')
    })

    it('should call update', () => {
      const spy = sinon.spy()
      const obj = { state: { first: 'foo' }, update: spy }
      const fn = CustomElement.prototype.setState.bind(obj)
      fn({ second: 'dude' })
      expect(spy.callCount).to.equal(1)
    })
  })
})
