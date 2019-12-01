// 如果我们需要在我们运行项目的时候给他一个自定义的监听端口号，和自动帮我们打开浏览器的配置
// 我们可以自己建立一个vue.config的文件，因为有些时候我们使用vue-cli创建项目的时候没有该文件
// 如果没有我们就可以自己创建一个
module.exports = {
  // 这句的意思是取消eslint的验证，我们要设置false，否则会报错
  lintOnSave: false,
  // 底下的配值是是否帮我们自动的打开浏览器和设置监听的端口号
  devServer: {
    open: true,
    port: 12306
  },
  // 我们需要在这里对vant按钮的颜色进行修改，根据笔记提示来修改，我们不能够使用webpack修改的方式来修改
  // 具体见笔记
  css: {
    // loaderOptions这一个加载选项对象，我们在打包之前需要将内容进行修改
    loaderOptions: {
      // 我们要修改的是vant的less文件中的按钮样式。所以此时就跟我们在webpack里面基本一致了
      less: {
        // modifyVars该值为修改less中的变量，因为所有的按钮颜色样式是less通过变量来进行修改的
        // 我们直接修改less的变量就可以替换掉所有按钮的颜色
        modifyVars: {
          blue: '#3296fa'
        }
      }
    }
  }
}
