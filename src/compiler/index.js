// 转换成 AST 语法树
// vDOM  =>  用对象描述 DOM 节点
//  AST  =>  用对象描述 原生语法

<<<<<<< HEAD
=======

>>>>>>> d3920f75fce18aa01e4e9f1aa1e1db8dd4751077
// nodeType 
// 1 DOM
// 3 文本

<<<<<<< HEAD
=======


>>>>>>> d3920f75fce18aa01e4e9f1aa1e1db8dd4751077
// 源码复制下来的, 正则我也搞不太懂。。。
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/   // 匹配属性
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`  // newSpaceName 
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)  // 捕获到了 开始标签 的 标签名 (TagName)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

// @/compiler/parser/text-parser.js
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function parseHTML (htmlStr) {
  while (htmlStr) {
    let textEnd = htmlStr.indexOf('<')
    if (textEnd === 0) {
      // 获取 TagName, Attrs
      let startTagMatch = parseStartTag(htmlStr)
    }
    break
  }

  function parseStartTag () {
    let start = htmlStr.match(startTagOpen)
    if (start) {
      console.log(start)
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)
      console.log(htmlStr)
    }
  }

  function advance (n) {
    htmlStr = htmlStr.substring(n)
  }
}

export function compileToFunction (template) {
  const root = parseHTML(template)

  return function render () {

  }
}