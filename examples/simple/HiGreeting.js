class HiGreeting extends ReactCustomElements.CustomElement {
  render() {
    const { children, name } = this.props

    return `
      <div>
       <p>Hi ${name}${children}</p>
      </div>
    `
  }
}

HiGreeting.propTypes = {
  name: p => p.trim
}

customElements.define("hi-greeting", HiGreeting)
