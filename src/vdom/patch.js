
export function patch (oldVnode, vnode) {
  const isRealElement = Boolean(oldVnode.nodeType)
  if (isRealElement) {
    const oldElm = oldVnode
    const parentElm = oldElm.parentNode
    let el = createElm(vnode)
    parentElm.insertBefore(el, oldElm.nextSibling)
    parentElm.removeChild(oldElm)

    return el
  }
}

function createElm (vnode) {
  let { tag, data, key, children, text } = vnode
  if (typeof tag === 'string') {
    // 是个标签
    vnode.el = document.createElement(tag)

    if (data) updateProps(vnode)
    children.forEach(child => vnode.el.appendChild(createElm(child)))
  } else {
    vnode.el = document.createTextNode(text)
  }

  return vnode.el
}

function updateProps (vnode) {
  const { data, el } = vnode
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const val = data[key]
      if (key === 'style') {
        for (const styleName in val) {
          el.style[styleName] = val[styleName]
        }
      } else {
        el.setAttribute(key, val)
      }

    }
  }
}