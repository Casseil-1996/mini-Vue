export default class Watcher {
  constructor(vm, exprOrFn, callBack, options) {
    this.vm = vm
    this.callBack = callBack
    this.options = options

    this.getter = exprOrFn
    this.get()
  }
  get () {
    pushTarget(this)
    this.getter()
  }
}