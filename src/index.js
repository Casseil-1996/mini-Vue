// mini-Vue core
// 是Vue的声明, 只起到组织作用
import { initMixin } from './init'
function Vue (options) {
  this._init(options)
}

initMixin(Vue)

export default Vue
