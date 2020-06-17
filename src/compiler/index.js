// 转换成 AST 语法树
// vDOM  =>  用对象描述 DOM 节点
//  AST  =>  用对象描述 原生语法

// nodeType 
// 1 DOM
// 3 文本

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

function start (tagName, attrs) {
  console.log('标签名：', tagName)
  console.log('属性：', attrs)
}

function end (tagName) {
  console.log('标签名：', tagName)
}

function chars (text) {
  console.log('文本标签')
  console.log(text)
}
function parseHTML (htmlStr) {
  while (htmlStr) {
    let textEnd = htmlStr.indexOf('<')
    if (textEnd === 0) {
      // 获取 TagName, Attrs
      let startTagMatch = parseStartTag(htmlStr)
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }
      let endTagMatch = htmlStr.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        continue
      }
    }
    let text
    if (textEnd > 0) {
      text = htmlStr.split(0, textEnd)
    }
    if (text) {
      advance(text.length)
    }
  }

  function parseStartTag () {
    let start = htmlStr.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)


      let end, attrs
      while (
        !(end = htmlStr.match(startTagClose)) &&
        (attrs = htmlStr.match(attribute))
      ) {
        advance(attrs[0].length)
        match.attrs.push({
          name: attrs[1],
          value: attrs[3] || attrs[4] || attrs[5]
        })
      }
      if (end) advance(end[0].length)


      console.log(`%c${htmlStr}`, 'color: green;')
      console.log(match)
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