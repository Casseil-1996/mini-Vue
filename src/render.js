import { createElement, createTextNode } from './vdom/createElement'

export function renderMixin (Vue) {

  Vue.prototype._c = function (...args) {
    return createElement(...args)
  }
  Vue.prototype._v = function (text) {
    return createTextNode(text)
  }
  Vue.prototype._s = function (val) {
    if (val == null) return ''
    if (typeof val === 'object') return JSON.stringify(val)
    return val
  }

  Vue.prototype._render = function () {
    const vm = this
    const { render } = vm.$options

    let vnode = render.call(vm)
    return vnode
  }

}