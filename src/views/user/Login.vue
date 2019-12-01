<template>
  <!-- div的class类名是根据笔记来写的 -->
  <div class="container">
    <!-- flxed是固定定位， left-arrow是一个x的字体图标， click-left是左边的点击按钮title是标题 -->
    <van-nav-bar left-arrow @click-left="$router.back()" title="登录"></van-nav-bar>
    <!-- 我们登陆界面的标题设置完之后我们还需要对页面进行布局操作 -->
    <van-cell-group>
      <!-- 我们使用vant组件库里面的标签来进行简单的布局 -->
      <!-- 我们vant跟elementui不一样，他自身没有表单验证的功能但是他有表单报错的功能、 -->
      <!-- 我们需要进行表单验证此时我们需要使用组件库中的error-message来进行表单的验证操作 -->
      <!-- 我们采取属性绑定的方式来使用它 -->
      <!-- 此时我们给表单设置一个事件，当失去焦点的时候则提示验证信息 -->
      <!-- 我们使用blur来声明失去焦点事件 -->
      <van-field
        label="验证码"
        placeholder="请输入验证码"
        v-model="loginForm.mobile"
        :error-message="errmsg.mobile"
        @blur="validMobile"
      />
      <!-- 我们使用双向数据绑定的方式来获取表单中的内容 -->
      <van-field
        label="验证码"
        placeholder="请输入验证码"
        v-model="loginForm.code"
        :error-message="errmsg.code"
        @blur="validCode"
      >
        <!-- 我们给一些按钮设置了一些简单的样式 -->
        <!-- 我们在发送验证嘛的按钮上设置一个点击事件该事件提示我们的是验证码 -->
        <van-button class="p5" slot="button" size="mini" type="primary" @click="yz">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn_box">
      <van-button type="info" @click="login" block round>登 录</van-button>
    </div>
  </div>
</template>

<script>
// 按需导入我们登录页面的请求api接口操作
import { login } from '@/api/user'
// 我们还需要导入vuex的一个方法mapMutations
// 当我们的登录操作完成是我们需要将token保存到本地以及vuex托管上面
// 而我们已经在vuex中设置了该方法，此时我们只需要将token信息传入到该方法即可
// 该方法是在Mutations里面。所以我们要引入一个mapMutations来使用该方法
import { mapMutations } from 'vuex'
export default {
  // 登录组件
  name: 'login',
  // 我们在引入结构后发现，颜色跟我们的颜色不一样为了追求标准我们需要对vant的框架颜色进行修改
  // 此时我们不能从别的地方去修改只能从less文件里面来修改，我们在less打包的过程中将颜色修改掉
  // 因为我们是cli搭建的项目，此时webpack文件不能使用，我们需要在vue.congfig文件中对vant颜色
  // 进行修改
  // 简单的结构搭建完毕之后我们还需要进行表单的验证操作，对输入的error内容进行校验
  data () {
    return {
      loginForm: {
        // 手机号码信息
        mobile: '',
        // 验证码信息
        code: ''
      },
      // 我们在上边声明了一个报错对象，此时我们需要在data里面讲那些报错对象的值进行一下声明
      errmsg: {
        // 验证手机号码信息
        mobile: '',
        // 验证码信息
        code: ''
      }
    }
  },
  methods: {
    yz () {
      // 我们使用vant组件库中的确认弹框用来做验证码确认的操作
      this.$dialog
        .alert({
          title: '验证码',
          message: '246810'
        })
        .then(() => {
          // on close
        })
    },
    // 手机号码的验证操作，失去焦点事件
    validMobile () {
      // 我们先要获取表单内的值，再根据值来书写报错提示信息
      // 如果没有值则提示请输入信息，再使用正则的方式来对手机格式进行判断
      // 获取我们验证表单的值
      const value = this.loginForm.mobile
      // 根据表单内的值进行判断，如果为空，则为true我们就给我们在data里面声明的报错变量
      // 进行赋值，用来提示用户输入手机号
      if (!value) {
        this.errmsg.mobile = '请输入手机号码'
        return false
        // 如果用户输入信息了，此时我们使用正则进行判断，如果手机号不符合要求
        // 我们就提示他手机号格式不正确即可我们这句正则的意思是前边的是验证规则，点后边的是需要
        // 验证的信息
      } else if (!/^1[3-9]\d{9}$/.test(value)) {
        this.errmsg.mobile = '手机号码格式不正确'
        return false
      } else {
        // 如果用户都输入正确了，我们则不提示信息
        this.errmsg.mobile = ''
      }
    },
    // 以上是手机号码的验证，现在我们开始验证验证码
    validCode () {
      // 首先要先获取表单里面验证码的值
      const value = this.loginForm.code
      // 如果验证码为空，则提示用户请输入验证码的操作
      if (!value) {
        this.errmsg.code = '请输入验证码'
        return false
        // 判断完为空之后，此时还需要进行正则操作，如果验证码不为6位那么则提示用户验证码为6位数字
      } else if (!/^\d{6}$/.test(value)) {
        this.errmsg.code = '验证码为6位数字'
        return false
      } else {
        // 如果都输入正确了我们则不进行提示操作
        this.errmsg.code = ''
      }
    },
    // 我们使用...mapMutations(['setUser'])将setuser方法导入到我们的methods方法里面
    // 此时我们的methods就多了一个setUser方法
    // 该方法需要传入一个参数，传递的参数就是token信息
    ...mapMutations(['setUser']),
    async login () {
      // 当我们在进行登录操作的时候需要进行整体校验，此时我们直接调用这两个方法即可
      this.validMobile()
      this.validCode()
      // 调用其方法之后对这两个方法里面的错误表单提示进行判断如果里面有值则直接返回
      // 就是return不让代码继续执行即可，如果没有值则进行登录的数据请求即可
      // if (this.error.code || this.error.mobile) return false
      if (!this.errmsg.mobile && !this.errmsg.code) {
      // 如果有一个有值那就是验证不通过此时直接return false，阻止代码继续执行即可
      // 我们的登录请求需要后台接口来请求数据，此时我们把api接口作为一个封装，
      // 只要是接口我们就进行一个封装操作即可，这样方便代码的维护
      // 如果数据能走到这一步说明验证已经通过了，此时我们需要进行登录的数据请求操作
      // 我们已经将封装好的api接口引入了进行此时直接调用该接口即可
      // 为了以防万一，我们使用try...catch的方式来进行登录和存储token的数据请求操作
        try {
        // 我们用的是axios发送的请求，此时返回的是一个prosime对象，所以我们采取async和await的
        // 方式来获取该信息的回调信息
        // 我们使用一个变量来接受请求回来的值
        // 我么在设置api的时候需要将登陆的信息当参数进行传递，此时我们把我们的表单对象传入了进来
          // 校验成功
        // 1. 基于request封装登录的API
        // 2. 导入API
        // 3. 调用即可
        // 4. 获取用户信息
        // 5. 更新vuex中的user数据
        // 6. 根据地址栏进行跳转
        // 7. 提示 成功
        // 8. 失败 错误提示
          const data = await login(this.loginForm)
          // 因为我们已经在相应拦截器中做了处理，此时返回的应该是一个对象
          // 该对象里面包括了token信息，而我们需要将token信息存储起来，此时我们已经在vuex设置好了一个存储token
          // 信息的方法我们也将他引入了进行，此时我们将data直接当参数传递给setUser即可，则代表了存储token
          // 储存token是一边储存到了本地，一边储存到了vuex中
          // 此时我们的...mapMutations已经将我们的setUser导入到了我们的methods方法中，我们直接采取this进行
          // 调用即可，如果是在组件中我们采取...mapMutations的方法来调用vuex中的方法，如果实在模块中
          // 我们需要使用vuex的是点上commit才能调用vuex中的方法
          this.setUser(data)
          // 当我们登录成功后有两种情况，第一种就是直接进行的登录，第二种就是从其他的页面被强制的
          // 跳到了该页面需要登录，所以我们登录成功需要进行路由跳转的时候需要设置一个路由回跳操作
          // 此时我们设置两种结果第一种则是路由回跳的操作，第二则是直接登录我们就直接返回我的页面
          // this.$router.query.redirectUrl 可以获取我们当前的地址信息
          // 如果没有拿到我们当前地址的信息我们就让他跳转到user页面去
          // 切记router和route是有区别的
          // $route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。
          // 包含当前的路径，参数，query对象等。
          // $router对象是全局路由的实例，是router构造方法的实例。
          // 2.route是一个跳转的路由对象，每一个路由都会有一个route对象
          // ，是一个局部的对象，可以获取对应的name,path,params,query等
          // 1.router是VueRouter的一个对象，通过Vue.use(VueRouter)和VueRouter构造函数得到一个router的实例对象，
          // 这个对象中是一个全局的对象，他包含了所有的路由包含了许多关键的对象和属性。
          this.$router.push(this.$route.query.redirectUrl || '/user')
          // 该是vant的一个提示框
          this.$toast.success('登录成功')
        } catch (e) {
        // 如果接口调用失败我们则会给出一个错误提示信息
          this.$toast.fail('用户名或验证码错误')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.p5 {
  padding: 0 5px;
}
.btn_box {
  padding: 10px;
  .van-button {
    height: 32px;
    line-height: 30px;
  }
}
</style>
