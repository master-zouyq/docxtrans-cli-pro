/**
 * 本cli工具主要针对的是在将较多内容的docx文档移植到web/app 页面中时较为耗时繁琐，而且没有意义的工作。
 * 通过本工具可以直接读取docx文件，生成jsx文件，根据配置还可生成针对web和native的不同jsx文件。
 * 暂时只支持全文本内容，而且对native只支持文本的创建。
 * todo:1,支持图片内容的移植
 *      2,对native的样式做适当丰富
 *      3,文件路径问题
 */
 下载 npm i docxtrnas
 使用 docxtrans [要转换的docx文件路径] [要输出的文件名] [是否需要native文件(true|false)]