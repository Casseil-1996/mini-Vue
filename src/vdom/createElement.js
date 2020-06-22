export function createElement (tagName, data = {}, ...children) {
  let { key } = data
  if (key) delete data.key
  return vnode(tagName, data, key, children, undefined)
}

export function createTextNode (text) {
  return vnode(undefined, undefined, undefined, undefined, text)
}

function vnode (tag, data, key, children, text) {
  return { tag, data, key, children, text }
}