// 转换成 AST 语法树
// vDOM  =>  用对象描述 DOM 节点
//  AST  =>  用对象描述 原生语法
import { parseHTML } from './parseHTML'
import { isEmptyArray, def } from '../utils/index'
import { ELEMENT_TYPE, TEXT_TYPE } from '../utils/constant'



// @/compiler/parser/text-parser.js
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function genChildren (el) {
  const { children } = el
  if (isEmptyArray(children)) return ''
  return ',' + children.map(child => gen(child)).join(',')
}

function gen (node) {
  const { type } = node
  if (type === ELEMENT_TYPE) return generate(node)
  if (type === TEXT_TYPE) {
    const { text } = node
    const tokens = []
    let match = [],
      index,
      lastIndex

    index = lastIndex = defaultTagRE.lastIndex = 0
    // @TODO 查看 RegExp.exec()
    while (match = defaultTagRE.exec(text)) {
      index = match.index
      if (index > lastIndex) tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
      console.log(index, match)
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join('+')})`
  }
}

function generate (el) {
  const children = genChildren(el)
  let code = `_c('${el.tagName}',${genAttrs(el.attrs)}${children})`
  return code
}

function genAttrs (attrs) {
  if (isEmptyArray(attrs)) return undefined
  const res = {}
  attrs.forEach(attr => {
    // @TODO 查阅 str.replace 相关内容
    if (attr.name === 'style') {
      let obj = {}
      attr.value.split(';').forEach(item => {
        let [key, val] = item.split(':').map(i => i.trim())
        key = key.split("-").map((part, idx) => {
          if (idx === 0) return part
          return part.slice(0, 1).toUpperCase() + part.slice(1)
        }).join('')
        obj[key] = val
      })
      attr.value = obj
    }
    if (attr.name === 'class') attr.name = 'className'
    res[attr.name] = attr.value
  })
  console.log(attrs, res, 54564564)
  return JSON.stringify(res)
}

export function compileToFunction (template) {
  const root = parseHTML(template)
  console.log(root)
  let code = generate(root)
  console.log(code, 123423354)

  // ps: 所有的模板引擎的实现, 都需要借助 new Function + with 实现
  const renderFn = new Function(`with(this) { return ${code}}`)
  return renderFn
}