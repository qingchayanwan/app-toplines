import Vue from 'vue'
import App from './App.vue'
// 引入路由文件
import router from './router'
// 引入vuex文件
import store from './store'
// 引入vue移动端的布局插件vant，我们在这里是采取完整引入的方式以便于项目的需要
import 'amfe-flexible'
import Vant from 'vant'
// 完整的引入后我们还需要将vant的css文件引入进来
// 因为我们要框架的颜色进行修改此时css要被修改为less
import 'vant/lib/index.less'
// 都引入完毕后我们开始在vue中来使用它
// 在vant插件中，它的默认取值是px但是我们做的是移动端，此时需要把vant的px单位换成
// rem单位才行，此时我们需要下载两个插件npm i postcss-pxtorem -D和npm i amfe-flexible -S
// 第一个是后处理器，是在我们开发阶段使用的，第二个是rem修改插件，是我们在项目打包的之后使用的
// 我们的less是一个预编译处理插件，但是我们还有一个后处理编译插件，后处理编译插件是在我们编写完css代码之后
// 为我们干的事，这里我们把我们编译好的代码交给后处理器，通过后处理器帮我们来把px替换成rem
// 我们该项目要使用yarn来下载插件，此时我们是使用yarn来下载,这两个插件下载完毕后会出现一个postcss.config.js
// 如果没有出现该文件，我们需要自己手动创建一个，并在里面做配置
// 我们配置完替换rem的config文件夹之后开始吧import 'amfe-flexible'插件进行引入
// 该属性的意思是根据屏幕的大小动态的设置rem值，基础是37.5rem

// 引入全局公共样式和覆盖vant样式的css文件
import '@/styles/index.less'
// import 'amfe-flexible'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
