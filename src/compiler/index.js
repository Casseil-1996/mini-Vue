// 转换成 AST 语法树
// vDOM  =>  用对象描述 DOM 节点
//  AST  =>  用对象描述 原生语法
import { parseHTML } from './parseHTML'

export function compileToFunction (template) {
  const root = parseHTML(template)
  console.log(root)
  return function render () {

  }
}