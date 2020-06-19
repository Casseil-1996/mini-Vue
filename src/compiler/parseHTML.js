
import { ELEMENT_TYPE, TEXT_TYPE } from '../utils/constant'

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

// 根节点(AST的树根)
let root = null,
  // 父节点
  currentParent = null,
  // 节点栈
  // 遇到相同结束标签, 弹出最后一个元素,
  // 如果整个htmlStr解析完后, 栈中还有内容, 则需要报错
  stack = []


function createASTElement (tagName, attrs) {
  return {
    tagName,
    attrs,
    type: ELEMENT_TYPE,
    children: [],
    parent: currentParent
  }
}



function start (tagName, attrs) {
  // 遇到开始标签, 就创建一个AST元素
  let element = createASTElement(tagName, attrs)
  if (!root) root = element
  currentParent = element
  stack.push(element)
}

function end (tagName) {
  let element = stack.pop()
  if (element.tagName !== tagName) return console.error(`[element.tagName !== tagName]: \n element.tagName: ${element.tagName}\n tagName: ${tagName}`)
  currentParent = stack[stack.length - 1]
  if (currentParent) {
    currentParent.children.push(element)
  }
}

function chars (text) {

  text = text.replace(/\s/g, '')
  if (!text) return
  currentParent.children.push({
    text,
    type: TEXT_TYPE
  })
}
export function parseHTML (htmlStr) {
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
      text = htmlStr.slice(0, textEnd)
      chars(text)
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

      // console.log(`%c${htmlStr}`, 'color: green;')
      return match
    }
  }

  function advance (n) {
    htmlStr = htmlStr.substring(n)
  }

  return root
}