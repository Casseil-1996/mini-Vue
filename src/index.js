// mini-Vue core
// 是Vue的声明, 只起到组织作用
import { initMixin } from './init'
import { renderMixin } from './render'
import { lifeCycleMixin } from './lifeCycle'
import { initGlobalAPI } from './initGlobalAPI'

function Vue (options) {
  this._init(options)
}

initMixin(Vue)
renderMixin(Vue)
lifeCycleMixin(Vue)

// 初始化全局的API
initGlobalAPI(Vue)

export default Vue
