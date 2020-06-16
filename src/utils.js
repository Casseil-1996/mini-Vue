function checkType (type, data) {
  return Object.prototype.toString.call(data) === `[object ${type}]`
}
function curry (fn, ...args) {
  return function (...innerArgs) {
    return fn.apply(this, [...args, ...innerArgs])
  }
}
export const isObject = curry(checkType, 'Object')
export const isArray = curry(checkType, 'Array')
export const isNum = curry(checkType, 'Number')
export const isFunction = curry(checkType, 'Function')  