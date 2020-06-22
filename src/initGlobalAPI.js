import { mergeOptions } from './utils/index'

export function initGlobalAPI (Vue) {
  Vue.options = {}
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin)
  }
  // 生命周期的合并策略
  // 将同名的生命周期合并到同一个数组中
  Vue.mixin({ a: 1 })
  Vue.mixin({ b: 3 })
  console.log(Vue.options)
}