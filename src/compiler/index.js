// 转换成 AST 语法树
// vDOM  =>  用对象描述 DOM 节点
//  AST  =>  用对象描述 原生语法
import { parseHTML } from './parseHTML'
import { generate } from './generate'
export function compileToFunction (template) {
  const root = parseHTML(template)
  let code = generate(root)

  // ps: 所有的模板引擎的实现, 都需要借助 new Function + with 实现
  const renderFn = new Function(`with(this) { return ${code}}`)
  return renderFn
}