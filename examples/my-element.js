class MyElement extends ReactLike {
  constructor() {
    super()
    this.state = { lion: 'yo' }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    console.log('mounted', this, this.innerHTML)
    this.addEventListener('click', this.handleClick)
  }

  componentDidUnmount() {
    this.removeEventListener('click', this.handleClick)
  }

  handleClick(e) {
    console.log('clicked', e.target, 'in', this)
  }

  render() {
    const { children, coolProp } = this.props
    const { lion } = this.state

    return `
      <div>
        <p>${children}</p>
        <b>${lion}</b>
        <ul>
          ${coolProp.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    `
  }
}

MyElement.propTypes = {
  coolProp: p => p.push
}

MyElement.defaultProps = {
  coolProp: [1, 2, 3]
}

customElements.define('my-element', MyElement)
