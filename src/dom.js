import morphdom from "morphdom"

export default (html, node, cb) => {
  morphdom(node, html, {})
}
