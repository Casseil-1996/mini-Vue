import { isObject, isFunction } from './utils/index'
import { observe } from './observe/index'

export function initState (vm) {
  const opts = vm.$options
  console.log(opts)
  // 初始化 Vue 的状态 
  // vm 的数据来源主要有 data, methods, computed, watch, ...etc
  if (opts.props) {
    initProps(vm)
  }
  if (opts.methods) {
    initMethods(vm)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initProps (vm) {
  console.log('initProps')
}
function initMethods (vm) {
  console.log('initMethods')
}
function initData (vm) {
  const originData = vm.$options.data
  let data
  if (isObject(originData)) data = originData
  if (isFunction(originData)) {
    let res = originData.call(vm)
    if (isObject(res)) data = res
  }
  if (!data) return console.error('Data 格式不正确')
  vm._data = data
  observe(data)
}
function initComputed (vm) {
  console.log('initComputed')
}
function initWatch (vm) {
  console.log('initWatch')
}