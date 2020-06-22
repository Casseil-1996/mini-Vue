let id = 0
export class Dep {
  constructor() {
    this.id = id++
    this.subs = []
  }

  addSub (watcher) {
    this.subs.push(watcher)
  }

  depend () {
    // this.subs.push(Dep.target)
    Dep.target.addDep(this)
  }

  notify () {
    this.subs.forEach(watcher => {
      watcher.update()
    })

  }
}
const stack = []
// Dep.target
export function pushTarget (watcher) {
  Dep.target = watcher
  stack.push(watcher)
}
export function popTarget () {
  stack.pop()
  Dep.target = stack[stack.length - 1]
}