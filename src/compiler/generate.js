
import { isEmptyArray } from '../utils/index'
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
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join('+')})`
  }
}

export function generate (el) {
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
  return JSON.stringify(res)
}
