import { pushTarget, popTarget } from "./dep"
let id = 0
export default class Watcher {
  constructor(vm, exprOrFn, callBack, options) {
    this.vm = vm
    this.callBack = callBack
    this.options = options
    this.id = id++
    this.getter = exprOrFn
    this.depsID = new Set()
    this.deps = []

    this.get()
  }

  addDep (dep) {
    let { id } = dep
    if (!this.depsID.has(id)) {
      this.depsID.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }

  get () {
    pushTarget(this)
    this.getter()
    popTarget()
  }

  update () {
    this.get()
  }

}
