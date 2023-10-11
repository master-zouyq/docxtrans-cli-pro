#!/usr/bin/env node

const fs = require("fs")
var mammoth = require("mammoth")
var HTMLtoJSX = require("htmltojsx")
const htmlparser2 = require("htmlparser2")
var HTMLtoNativeJSX = require("./toNativeJSX")

const filePath = process.argv[2] //docx文件路径
const jsxFileName = process.argv[3] //输出的文件名称
const useNative = process.argv[4] //是否输出native文件

var converterJSX = new HTMLtoJSX({
  createClass: false,
  outputClassName: jsxFileName || "AwesomeJSX",
})

var converter2Native = new HTMLtoNativeJSX({
  outputName: jsxFileName ? jsxFileName + "Native" : undefined,
})

mammoth
  .convertToHtml({ path: filePath || "./test.docx" })
  .then(function (result) {
    var html = result.value // The generated HTML
    var messages = result.messages // Any messages, such as warnings during conversion
    console.log("messages", messages)
    if (html) {
      var fileName = jsxFileName ? jsxFileName + "Native" : "AwesomeNativeJSX"
      let outputJsx = converterJSX.convert(html)
      var finalString = `
            import React from 'react';
            const ${fileName} = ()=>{
              return(
                ${outputJsx}
              )
            }
          `
      fs.writeFile(
        `./${jsxFileName || "AwesomeJSX"}.jsx`,
        finalString,
        (err) => {
          if (err) {
            console.log("generate jsx file error:", err)
            return
          }
        }
      )
      // var handler=new htmlparser2.DomHandler(function(error,dom){
      //   console.log('dom',dom)
      // });
      if (useNative) {
        let allStringArray = []
        var parser = new htmlparser2.Parser({
          ontext(text) {
            allStringArray.push(text)
          },
          onend() {
            var output = converter2Native.convert(allStringArray)
            fs.writeFile(
              `./${
                jsxFileName ? jsxFileName + "Native" : "AwesomeNativeJSX"
              }.jsx`,
              output,
              (err) => {
                if (err) {
                  console.log("generate native file error:", err)
                  return
                }
              }
            )
          },
        })
        parser.write(html)
        parser.done()
      }
    }
  })
  .done()
