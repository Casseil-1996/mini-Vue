import { isObject, def } from '../utils/index'
import { arrayMethods } from './array'
import { Dep } from './dep'
// 把 data 中的数据 都使用 defineProperty 重新定义
// 只能兼容 IE8 以上

class Observer {
  constructor(val) {
    // 不能这么写
    // val.__ob__ = this
    def(val, '__ob__', this)
    if (Array.isArray(val)) {
      val.__proto__ = arrayMethods
      // 由于直接监听数组下标性能过差
      // 所以需要重写 Array 原型上的一些方法
      this.observeArray(val)

    } else {

      // 递归解析对象中的属性
      // 依次增加 set 和 get 方法
      // 带来过多的空间复杂度
      this.walk(val)
    }
  }

  observeArray (arr) {
    arr.forEach(item => observe(item))
  }

  walk (data) {
    let keys = Object.keys(data)
    keys.forEach(key => {
      let val = data[key]
      defineReactive(data, key, val)
    })
  }
}

function defineReactive (data, key, val) {
  // @TODO  查阅 MDN , 学习 Object.defineProperties
  let dep = new Dep()
  observe(val)
  Object.defineProperty(data, key, {
    get () {
      if (Dep.target) {
        dep.depend()  // 意味着要将watcher存起来
      }
      return val
    },
    set (newVal) {
      if (newVal === val) return
      observe(newVal)
      val = newVal
      dep.notify()
    }
  })
}

export function observe (data) {
  if (!isObject(data) && !Array.isArray(data)) return
  return new Observer(data)
}

