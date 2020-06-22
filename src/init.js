import { initState } from './state'
import { compileToFunction } from './compiler/index'
import { mountComponent, callHook } from './lifeCycle'
import { mergeOptions } from './utils/index'


export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this // Vue中使用 this.$options 就是用户传进来的属性

    // 使用场景: 数据初始化可以用 this.$options.data.xxx 替代当前的 this.xxx
    // 将用户传入的 options 和全局的 options 进行合并
    vm.$options = mergeOptions(vm.constructor.options, options)
    callHook(vm, 'beforeCreate')

    // 初始化状态
    initState(vm)

    callHook(vm, 'created')
    // 如果 用户传入了 el 属性, 则开始渲染页面
    if (vm.$options.el) vm.$mount(vm.$options.el)
  }


  Vue.prototype.$mount = function (el) {
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    if (!options.render) {
      let template = options.template
      if (!template && el) template = el.outerHTML
      const render = compileToFunction(template)
      options.render = render
    }
    mountComponent(vm, el)
  }
}