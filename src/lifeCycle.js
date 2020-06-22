import Watcher from "./observe/watcher"
import { patch } from './vdom/patch'
export function lifeCycleMixin (Vue) {
  Vue.prototype._updata = function (vnode) {
    console.log(vnode)
    const vm = this
    vm.$el = patch(vm.$el, vnode)
  }
}

export function mountComponent (vm, el) {
  vm.$el = el
  // const { $options: options } = vm
  callHook(vm, 'beforeMount')
  let updataComponent = () => {
    vm._updata(vm._render())
  }

  new Watcher(vm, updataComponent, () => { }, true)
  callHook(vm, 'mounted')
}

export function callHook (vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) handlers.forEach(fn => fn.call(vm))
}