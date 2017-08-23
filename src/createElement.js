const getAttributeString = props => {
  return Object.keys(props).map(prop => `${prop}="${props[prop]}"`).join(' ')
}

const getInnerHTML = (component, attrs, children) =>
  `<${component} ${attrs}>${children}</${component}>`

export default (component, props, ...children) => {
  const container = document.createElement('div')
  const attrs = getAttributeString(props)
  container.innerHTML = getInnerHTML(component, attrs, children)
  return container.querySelector(component)
}
