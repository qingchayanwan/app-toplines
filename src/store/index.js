import Vue from 'vue'
import Vuex from 'vuex'
// 我们设置完token信息之后需要通过vuex仓库管理来将token实现各个组件之间的共享
// 此时我们需要先导入我们设置好的token信息，我们直接全部导入即可，但是我们是按需导出的
// 要是按需导入的话比较繁琐，因为要导入多个此时我们使用一个通配符，来将我们导出的三个
// 操作都导入进来
// 我们使用通配符*来将三个操作都导入进来，但是*不能作为变量使用，此时我们给他设置一个别名
// 此时的auth则有了三个方法，这三个方法就是我们的哪三个操作
// 我们的这一步叫做将token信息托管给vuex
import * as auth from '@/utils/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 首先我们要先把我们的存储到本地的token在state赋值给我们的user变量，我们需要token的
    // 时候直接全局导入user即可，因为auth带的是三个方法，而我们的获取token有返回值，此时直接调用该
    // 方法把它赋值给user即可
    user: auth.getUser()
  },
  mutations: {
    // 如果想让其他js文件调用mutations中的函数方法需要vuex实例点上一个commit（'方法名',该方法的参数）
    // 即可
    // 此时我们还没有token信息，在用户登录的时候需要把token信息存储到本地，
    // 因为我们是使用vuex来托管数据，所以我们需要在这一步来设置好token信息
    // vuex的特性就是先设置数据容器，再去存储和修改数据，最后一步是请求数据
    // 此时没有token我们需要把获取到的token再复制给我们state中的user，所以我们在
    // 这里设置一个方法，该方法是将获取都的token信息储存到本地，存储到本地的同时把token赋值给
    // state中的user
    // 此时我们设置一个setUser方法，该方法的作用是数据请求到了，就将token赋值给state中的user，顺吧把数
    // 据存储到本地
    // 第一个参数是上下文对象也就是我们说的this，this.user则是获取到state中的user
    // 第二个参数是代表了我们请求数据时获取到的token信息
    // 该操作是修改以及存储我们的token信息
    setUser (state, newuser) {
      // 修改state中的user数据
      state.user = newuser
      // 如果我们不做修改state里面数据的这一操作，我们在页面刷新的时候
      // 他不会去本地拿token，此时user还是旧的数据，所以我们要赋值存储一起做
      // 存储token到本地
      auth.setUser(newuser)
    },
    // 有修改和存储就一定会有删除，用户在退出登录的时候我们还需要做一步删除token信息的操作
    // 我们在vuex将这些都处理好之后就不要再去auth.js里面拿方法了，auth只是一个组件而已
    // 如果用户退出了登录我们直接让我们state里面的数据为空，此时再调用删除token信息的方法即可
    delUser (state) {
      // 先让state里面user等于一个空对象即可
      state.user = {}
      // state数据清空了我们本地存储的数据也一定要清空，此时我们直接调用删除本地tokne的方法即可
      auth.delUser()
    }
    // 此时我们需要配置axios来请求数据，
  },
  // 如果别的js文件想调用actions方法要通过vuex实例点上dispach('actions中的方法名',该方法名里面的
  // 参数 )
  actions: {
  },
  modules: {
  }
})
