// 保存 Array 的原生方法
const oldArrMethods = Array.prototype

export const arrayMethods = Object.create(oldArrMethods)

const methods = [
  'push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'
]

// 装饰器 / AOP
methods.forEach(m => {
  arrayMethods[m] = function (...args) {
    console.log('user has done push')
    const res = oldArrMethods[m].apply(this, args)
    let inserted
    let ob = this.__ob__
    switch (m) {
      case 'push':
      case 'unshift':
        inserted = args
        break;

      case 'splice':
        inserted = args.splice(2)
        break;
      default:
        break;
    }
    if (inserted) console.log(this.__ob__.observeArray(inserted))
    return res
  }
})

