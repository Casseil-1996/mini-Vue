import { isObject } from '../utils'

// 把 data 中的数据 都使用 defineProperty 重新定义
// 只能兼容 IE8 以上

class Observer {
  constructor(val) {
    // 递归解析对象中的属性
    // 依次增加 set 和 get 方法
    // 带来过多的空间复杂度

    this.walk(val)
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
  observe(val)
  Object.defineProperty(data, key, {
    get () {
      console.log('data is read')
      return val
    },
    set (newVal) {
      if (newVal === val) return
      val = newVal
      console.log('data is change')
    }
  })
}

export function observe (data) {
  if (!isObject(data)) return
  return new Observer(data)
}

