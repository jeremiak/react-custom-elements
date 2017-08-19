import morphdom from 'morphdom'

class ReactLike extends HTMLElement {
  get observedAttributes() {
    return Object.keys(this.constructor.propTypes)
  }

  constructor() {
    super()
    const defaultProps = this.constructor.defaultProps || {}
    this.state = {}
    this.props = Object.keys(defaultProps)
      .map(prop => ({
        key: prop,
        value: this.getAttribute(prop) || defaultProps[prop]
      }))
      .filter(prop => prop.value)
      .reduce(
        (accum, next) => {
          return Object.assign({}, accum, {
            [next.key]: next.value
          })
        },
        {
          children: this.innerHTML.trim()
        }
      )
    this.innerHTML = ''
    this.root = document.createElement('div')
    this.appendChild(this.root)

    this.initDefaultProps = this.initDefaultProps.bind(this)
    this.initPropAccessors = this.initPropAccessors.bind(this)
    this.render = this.render.bind(this)
    this.update = this.update.bind(this)
  }

  connectedCallback() {
    const cb = this.componentDidMount
    this.initPropAccessors()
    this.initDefaultProps()
    this.update()
    if (cb) cb.apply(this)
  }

  attributeChangedCallback(attr, old, value) {
    console.log('attr changed', attr, old, value)
    this.update()
  }

  disconnectedCallback() {
    const cb = this.componentDidUnmount
    if (cb) cb.apply(this)
  }

  initDefaultProps() {
    const defaultProps = this.constructor.defaultProps || {}
    Object.keys(defaultProps).map(prop => {
      this.setAttribute(prop, defaultProps[prop])
    })
  }

  initPropAccessors() {
    const defaultProps = this.constructor.defaultProps || {}
    const propTypes = this.constructor.propTypes || {}
    Object.keys(propTypes).map(prop => {
      Object.defineProperty(this, prop, {
        get: () => this.props[prop],
        set: value => {
          const propType = propTypes[prop]
          if (propType(value)) {
            const oldValue = this.props[prop]
            this.props[prop] = value
            super.setAttribute(prop, value)
            this.attributeChangedCallback(prop, oldValue, value)
          } else {
            throw new Error(
              `${prop} should be of type ${propType}. it is currently a ${typeof value}`
            )
          }
        }
      })
    })
  }

  addEventListener(eventType, handler) {
    window.addEventListener(eventType, handler)
  }

  removeEventListener(eventType, handler) {
    window.removeEventListener(eventType, handler)
  }

  setAttribute(attr, value) {
    const defaultProps = Object.keys(this.constructor.defaultProps)
    if (!defaultProps.includes(attr)) {
      return super.setAttribute(attr, value)
    }
    this[attr] = value
    return value
  }

  setState(stateUpdate) {
    this.state = Object.assign({}, this.state, stateUpdate)
    this.update()
  }

  update() {
    morphdom(this.root, `<div>${this.render().trim()}</div>`, {
      onElUpdated: el => console.log('onElUpdated el', el),
      onBeforeElUpdated: (from, to) => {
        console.log('onBeforeElUpdated from to', from.innerHTML, to.innerHTML)
      }
    })
  }

  render() {
    return ''
  }
}

export default ReactLike
