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

export function proxy (vm, source, key) {
  Object.defineProperty(vm, key, {
    get () {
      return vm[source][key]
    },
    set (newVal) {
      vm[source][key] = newVal
    }

  })
}
export function def (data, key, value) {

  const enumerable = false
  const configurable = false

  Object.defineProperty(
    data,
    key,
    { value, enumerable, configurable }
  )

}
const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestory',
  'destoryed',
]
let strats = {

}

LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})
function mergeHook (parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal)
    } else {
      return [childVal]
    }
  } else {
    return parentVal
  }
}

export function mergeOptions (parent, child) {
  const options = {}

  for (const key in parent) {
    mergeField(key)
  }

  for (const key in child) {
    // 只合并 parent 中没有的
    if (!parent.hasOwnProperty(key)) mergeField(key)
  }

  function mergeField (key) {
    const strat = strats[key]
    if (strat) options[key] = strat(parent[key], child[key])
    else if (isObject(parent[key]) && isObject(child[key])) {
      options[key] = {
        ...parent[key],
        ...child[key]
      }
    }
    else if (!child[key]) {
      options[key] = parent[key]
    }
    else {
      options[key] = child[key]
    }
  }

  return options
} 