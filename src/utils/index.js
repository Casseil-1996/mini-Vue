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

export const isEmptyArray = (arr) => !arr || !Array.isArray(arr) || !arr.length
export function def (data, key, value) {

  const enumerable = false
  const configurable = false

  Object.defineProperty(
    data,
    key,
    { value, enumerable, configurable }
  )

}