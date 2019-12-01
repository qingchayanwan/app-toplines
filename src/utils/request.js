// 我们在这个文件里面需要干五件事
// 第一件，处理最大数值，
// 第二件，请求携带token
// 第三件，设置相应拦截器截取我们想要的数据
// 第四件，刷新token
// 第五件，导出axios数据请求函数

// 我们的token信息设置完毕之后我们还需要设置数据请求的方法
// 我们采取组件方法封装的形式来完成该项目封装的目的：复用，导出一个调用请求的函数。
// 我们封装完毕之后，我们在vuex里面进行配置，配置完毕每个组件想用直接导入即可
// 减少了代码的重复操作性
// 首先我们在数据请求的时候最先处理的就是js数值最大值的设置，js中数值一旦过大则不稳定
// 此时我们需要一个插件来确保js最大数据的稳定性yarn add json-bigint来进行下载
// 因为我们是要做数据请求操作，此时还需要下载yarn add axios
// 下载完毕只有我们把这两个插件导入进来
// 导入数值最大化的处理程序
import JSONBIGINT from 'json-bigint'
// 导入axios数据请求插件
import axios from 'axios'
// 我们还需要将vuex文件引入进来，引入该文件的目的就是存储token和带着token请求数据的操作
import store from '@/store'
// 我们以往配置axios的时候就是直接配置，此时我们学一个新的方法
// 我们创建一个axios实例，如果每次请求的地址都不一样我们则可以创建多个axios实例来请求数据
// 创建axios是通过axios.create来创建，我们创建成功之后在里面做相应的配置操作
// 我们要刷新token此时需要将router引入进来
import router from '@/router'
// import { publicDecrypt } from 'crypto'
const instance = axios.create({
// 首先我们要先设置一个请求地址的公共地址，
// 使用baseURL来设置请求地址的根地址，就是请求的数据地址的公共部分
// 此时我们是在实例化对象里面所以设置什么都需要以对象的格式来设置才行
// 根据文档拿到我们的公共地址部分
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 设置完公共地址之后我们需要设置js数值最大值设置，js最大值的设置
  // 必须是在第一首数据的回调上，就是数据转换阶段，我们在数据转换阶段来设置
  // json-bigint即可，根据官方完档提示我们设置一个方法，transformResponse根据该方法来配置相应的信息
  // 该方法对应数组的目的就是，可能有多个数据需要处理，多个数据处理函数之间用逗号隔开
  // 所以此时我们需要设置一个数组,在数组里面设置一个函数
  // 函数里面的有一个参数,为data,该参数是服务器返回给我们客服端的第一手数据
  transformResponse: [(data) => {
    // 拿到这第一首数据之后，我们需要进行一个判断，因为该数据有可能是空数据，对于空数据我们去处理
    // 可能会导致报错，此时我们需要设置一个判断，如果有数据我们进行处理如果为空数组我们则直接return即可
    // if (data) {
    // 如果有数据我们就让数据进来，并进行处理
    // 我们直接使用我们引入进来的json-bigint来对数据处理即可
    // return JSONBIGINT.parse(data)
    // }
    // 如果为空数据，我们则直接让他返回即可
    // return data
    // 还有一种写法是try..catch
    // 我们也可以使用这种方法来对数据进行处理
    try {
      // 如果有数据进行处理。如果没有则直接返回
      return JSONBIGINT.parse(data)
    } catch (e) {
      return data
    }
  }]
})

// 数值最大值我们设置完毕了，但是携带token我们还没有实现，我们想携带token请求数据
// 该操作需要在请求拦截器和响应拦截器上进行操作
// 请求拦截器我们携带token
// 先设置请求拦截器，我们的axios实例已经设置好了我们直接通过该实例进行操作即可
// 根据文档提示interceptors.request.use则是请求拦截器
// 设置完interceptors.request.use里面有一个函数，函数有一个参数为config
instance.interceptors.request.use(config => {
// 我们需要在数据请求的时候携带token来请求数据，此时我们已经把vuex引入进来了
// vuex中的state状态里面就有我们设置好的token我们直接尽心判断，如果有token则带着tokne来请求数据
// store.state.user.token该代码为获取token
  if (store.state.user.token) {
  // 如果有tokne我们则在config请求的请求头上传入我们的token，让请求在发送的时候携带着token
  // headers.Authorization则是我们请求数据时的请求头
  // 我们需要根据文档提示来携带token
  // 我们这里为什么是store.state.user.token呢是因为我们在获取token信息的时候服务器端给我们的token信息是
  // 一个对象格式的信息，该对象里面是有两个token信息的，而我们在设置存储token的时候，只是给这个对象设置
  // 了一个名称而已
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  // 这一步是我们的数据正常请求，如果不设置这一步，数据则不会发出请求
  return config
  // err这一步是错误处理，这是一个报错的语法糖
  // 上面的函数是拦截成功后我们需要做的事，底下这个错误是拦截失败所做的事
}, err => {
  return Promise.reject(err)
})
// 我们请求回来的数据大部分都是res.data或者是res.data.data因为获取数据比较繁琐，此时我们
// 在响应拦截器上直接做设置，让他直接把res.data中的数据给我们这样我们在使用数据的时候就不需要
// res.data.data了
// 设置响应拦截器
// res则代表响应给我们的数据
// 响应拦截器 （响应成功：剥离无效数据，响应失败：刷新token）
instance.interceptors.response.use(res => {
// 此时我们需要设置一个判断，但是该判断我们使用try..catch来进行判断
// 如果返回的数据是res.data.data格式的我们就直接让他把数据给我们
// 如果不是我们则让他把res返回给我们
  try {
    // 如果是res.data.data格式的直接给我们返回数据
    return res.data.data
  } catch (e) {
    // 如果不是则把全部数据返回给我们
    return res
  }
}, async err => {
  // 此时我们在相应拦截器里面设置刷新token的设置，token刷新一般是有两种请况
  // 第一种情况是本来就没有token，第二种情况是token失效了
  // 我们这里设置token失效的设置代码
  // 实现token失效处理
  // 1. 判断是否是401状态
  // 2. 如果未登录（拦截到登录页面，预留回跳功能）
  // 3. token失效，发请求给后台刷新token
  // 3.1 刷新成功  更新vuex中token和本地存储的token
  // 3.2 刷新成功  把原本失败的请求继续发送出去
  // 3.3 刷新失败  删除vuex中token和本地存储的token （拦截到登录页面，预留回跳功能）
  // 首先我们要先判断返回的状态是否是401如果是401则代表token失效了
  // 为了确保安全，我们在进行判断的时候把请求相应的数据也加进来，如果是token失效了
  // 则会返回一些失效的信息所以我们既要判断状态嘛也要判断失败返回来的数据信息
  // 我们是访问一些需要登录的页面才需要去强制登录，此时我们需要设置一个回跳的操作
  // 当用户访问页面是token失效此时就需要刷新token，当用户在访问页面时需要登录才能访问
  // 此时也需要登录，但这些登录都需要设置一个回跳操作，增加用户体验
  // 所以我们在这里设置回调操作
  // 在组件中$router.path能获得需要回调的地址，而在我们的模块中，router只是一个实例对象
  // 我们可以通过该路由实例的currentRoute 来获取当前的路由信息
  // 由此能得到一个结论，组件中$router.path === router.currentRoute.path
  // 所以我们在模块中可以通过router.currentRoute.path来获取当前的路由信息
  // 我们把获取过来的路由信息用一个变量保存起来即可
  // 此时我们直接跳转该loginConfig即可
  // 这句话的意思是，如果你是从别的页面被强制的推送到了登录页面，此时当你登录成功后
  // 我们则进行一个地址回跳，query: { redirectUrl: router.currentRoute.path }则记录了你
  // 从哪里来，登录成功了又将把你送到那去
  // redirectUrl意思就是重定向地址也叫做返回地址，从登录页面返回到哪里去
  // 如果你是在其他的页面失去了token或者说你是在其他页面需要token此时都会来到登录页面
  // 当你从别的页面来到登录页面之后redirectUrl会记录该地址，可是怎么记录呢，此时就通过
  // router.currentRoute.path来记录你当前的地址
  // 我们这里是query传参。传递的参数则是需要回调的路由信息，该 query是一个传参的方式
// params传参是传在地址后面也叫做路径后面。而query传参是传递在地址的问号后面的
// query传参传入一个redirectUrl路由重定向，在这个路由重定向里面有一个地址，该地址则是
// 当前的路由地址，
  const loginConfig = { path: '/login', query: { redirectUrl: router.currentRoute.path } }
  // 此时如果我们的token刷新失败了，那我们则统一的跳转到登录页面，
  // 此时我们需要try和catch来进行异常处理
  // 如果我们的代码出现了意外，我们都会让他去登录页面
  // 此时就是我们设置try和catch的原因
  try {
    if (err.response && err.response.status === 401) {
      // 导入我们在vuex里面托管的user中的tokne信息
      const { user } = store.state
      // 如果进到if里面则代表token失效了
      // 如果token失效了我们让用户再进行登录即可，如果用户是在别的界面被强制登录的
      // 那么在登录成功之后让他在会跳一下即可
      if (!user.token || !user.refresh_token) {
        // 以上的情况是我们对没有登录的一些处理
        // 如果用户没有登录我们则让用户去登录页面即可
        // 我们上边已经声明好了路由回跳，此时我们直接进行回跳即可
        router.push(loginConfig)
        // 在prosime中如果想终止一个事件的执行我们单单使用return是无法组织代码继续执行的
        // 如果想阻止代码的继续执行必须返回一个prosime错误的对象信息才行
        // 此时如果用户没有登录，我们则让他去登录界面，并阻止代码的继续执行，
        // 阻止代码的继续执行我们则返回一个promise对象即可
        return Promise.reject(err)
      }
      // 此时如果是token过期了我们需要再一次的对refresh_token进行请求
      // 我们在请求的过程中之前的我们封装好的instance已经无法使用了，因为我们已经做了一些处理了
      // 此时我们需要重新定义一个axios来做数据请求操作
      // 直接使用axios来请求数据即可
      // 请求数据的时候我们还需要接受一个数据的返回值此时我们需要一个变量来接受
      // 我们直接使用asyanc和await来处理数据
      const res = await axios({
      // 我们的err已经设置了async了此时我们直接设置await即可
      // 我们在请求的时候需要输入的是一个完整的地址，之前设置的公共地址不是在我们这个请求里面
      // 所以我们需要根据文档需求来设置一个完整的请求地址
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        // 根据文档需求请求方式是put
        method: 'put',
        // 根据文档需求我们在发送请求的时候需要在请求头里面携带我们之前的refresh_token才可以
        // 此时我们设置氢气头的信息
        headers: {
        // 请求头设置数据是以对象格式来设置的，我们需要设置 Authorization，在请求头里面
        // 该 Authorization是根据文档需求来的
        // token的有限时间是两个小时，而refresh_token的有限时间是十四天
        // 我们这里做的操作是通过refresh_token来获取新的token信息，因为之前的token已经过期了
        // 所以我们的请求头中必须携带refresh_token才可以
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 我们使用之前的refresh_token获取到了新的token信息，我们需要把新的token信息
      // 同步到本地储存和vuex数据托管上面，此时我们直接调用
      // vuex中的setUser方法即可，调用该方法是vuex的实例点上一个commit才能够调用vuex中mutations里面
      // 的方法
      store.commit('setUser', {
        // 这两句的意思是更新本地的token和vuex里面的token
        token: res.data.data.token,
        // 该两句的解释是我们在vuex的setUser方法里面设置了一个参数，但是该参数是一个对象格式的参数
        // 因为我们在设置state中的user时该user需要存的值是两个值，一个是token一个是refresh_token
        // 把该对象存储到了本地以及state中的user里面，所以这里传的参数是一个对象
        // 我们第一句话的意思就是把该token对象存储到了vuex的state的user里面
        // 第二句话的意思就是我们需要将之前请求到的refresh_token进行一个保留操作
        // 我们之前设置state中的user时提示到有两个值需要传入，第一个值是token第二个值是refresh_token
        // 所以我们这里是传值传的是两个token值
        // 后端只是给了我们一个新的token值并没有给我们一个新的refresh_token值
        // 我们之前的refresh_token只需要进行保留即可不需要做更新处理
        // 如果我们不做这第二步操作我们的refresh_token会被刷新掉
        refresh_token: user.refresh_token
      })
      // 我们设置完token值之后需要继续发送之前token过期时发送的信息
      // 该信息在我们错误处理的config里面
      // 我们通过打印err.config时发现，这里面有一些我们因为token失效而发的请求信息
      // 因为是token失效了。所以请求响应为401，为401时我们才做的这些操作
      // 现在我们的操作做完了，此时需要再一次的发送请求，来请求数据
      //  return instance(err.config)
      return instance(err.config)
    }
  } catch (e) {
    // 不管你是在那个页面token失效的或者说我们的刷新token失败了
    // 我都会让你去登录页面，然后设置一个重定项操作
    router.push(loginConfig)
    // 如果异常先去登录页面，然后再返回异常信息即可
    return Promise.reject(err)
  }
  return Promise.reject(err)
})
// 以上是请求拦截器和响应拦截器的设置
// 此时我们的请求和响应都设置完毕了
// 设置完毕之后我们需要将axios导出，如果不导出数据则无法请求
// 此时我们导出一个axios请求，我们直接导出即可不需要设置函数名字
export default (url, method, data) => {
  // 导出的时候我们设置三个参数因为上面我们已经设置好了axios实例，此时我们直接
  // 使用该实例即可
  // 此时我们的请求方式是最完整的请求方式，我们以往进行数据请求时axios.get 或者是
  // axios.post 此时我们这里使用的是axios({})来进行数据请求
  // axios进行的数据请求返回的是一个promise对象
  return instance({
    // 根据文档提示，
    url,
    method,
    // 如果动态的往对象里面添加一个属性，此时就需要使用中括号来进行相应的判断
    // 使用中括号来确定判断
    // 比方，如果我们有一个值往对象里面穿，但是不知道是把该值赋值给name还是赋值给age此时我们就需要
    // 中括号来进行判断
    // obj.name = 10 这个是我们写死的此时值一定会给name,此时我们就需要来进行判断
    // obj[能存放一个变量 | 也能存放js表达式] = 10 此时我们通过中括号来进行表达
    // 如果是数字我们就存放给age，如果是非数字我们就存放给name
    // 此时我们的axios函数也可以这样写，如果method为get我们就以params进行传参，如果非get我们就以
    // data来进行传参
    // 我们用来将method进行判断，使用三运运算符的方式来进行判断，如果为get我们就使用params来进行传值
    // 如果不为get肯定就是其他的一些请求方式，此时我们则使用data来进行传参
    // 我们这里设置一个toLowerCase()不管你的请求方式是大写还是小写这里我们都给你转成小写的方式
    [ method.toLowerCase() === 'get' ? 'params' : 'data' ]: data
  })
}
