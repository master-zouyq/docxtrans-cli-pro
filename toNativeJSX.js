 'use strict';

 /**
  * 将html代码转为react-native 可用的jsx代码，只使用纯样本，不包含样式
  */
 
 var HTMLtoNativeJSX = function(config) {
   this.config = config || {}; 
   if (this.config.outputName === undefined) {
     this.config.onlyContent = true;
   }
 };
 HTMLtoNativeJSX.prototype = {
   /**
    * Reset the internal state of the converter
    */
   reset: function() {
     this.output = '';
     this._inPreTag = false;
   },
   /**
    * Main entry point to the converter. Given the specified HTML, returns a
    * JSX object representing it.
    * @param {string} html HTML to convert
    * @return {string} JSX
    */
   convert: function(stringArray) {
     this.reset();
     if(this.config.onlyContent){
      this.output = '<View>'
     }else{
       this.output = `import React from 'react'
       import {View,Text} from 'react-native'
       const ${this.config.outputName} = (props)=>{
          return(
            <View>
       `
     }
     if(Array.isArray(stringArray) && stringArray.length>0){
       stringArray.forEach(content=>{
         let innerEl = `  <View><Text>${content}</Text></View>
         `
         this.output+=innerEl
       })
     }
     this.output += '</View>'
     if(this.config.outputName){
      this.output+= `
      )}
      export default ${this.config.outputName}`
     }
     return this.output

   }
  };
 
 module.exports = HTMLtoNativeJSX; 