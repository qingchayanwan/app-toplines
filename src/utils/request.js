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
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  // 这一步是我们的数据正常请求，如果不设置这一步，数据则不会发出请求
  return config
  // err这一步是正常处理，这是一个报错的语法糖
}, err => Promise.reject(err))
// 我们请求回来的数据大部分都是res.data或者是res.data.data因为获取数据比较繁琐，此时我们
// 在响应拦截器上直接做设置，让他直接把res.data中的数据给我们这样我们在使用数据的时候就不需要
// res.data.data了
// 设置响应拦截器
// res则代表响应给我们的数据
axios.interceptors.response.use(res => {
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
}, err => Promise.reject(err))
// 以上是请求拦截器和响应拦截器的设置
// 此时我们的请求和响应都设置完毕了
// 设置完毕之后我们需要将axios导出，如果不导出数据则无法请求
// 此时我们导出一个axios请求，我们直接导出即可不需要设置函数名字
export default (url, method, data) => {
  // 导出的时候我们设置三个参数因为上面我们已经设置好了axios实例，此时我们直接
  // 使用该实例即可
  return instance({
    // 根据文档提示，
    url,
    method

  })
}
