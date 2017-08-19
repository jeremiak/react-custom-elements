class MyOtherElement extends ReactLike {
  constructor() {
    super()
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
    const { children, x } = this.props

    return `
      <div>
      ${x}
      </div>
    `
  }
}

MyOtherElement.propTypes = {
  x: p => p.trim
}

MyOtherElement.defaultProps = {
  x: 'a'
}

customElements.define('my-other-element', MyOtherElement)
