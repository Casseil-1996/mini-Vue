import { initState } from './state'

export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this // Vue中使用 this.$options 就是用户传进来的属性
    // 使用场景: 数据初始化可以用 this.$options.data.xxx 替代当前的 this.xxx
    vm.$options = options

    // 初始化状态
    initState(vm)
  }
}