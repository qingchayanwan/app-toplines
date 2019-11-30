// 该js文件主要是存放token信息，我们每次登陆的时候都需要带着token来请求数据，此时我们把每次从本地储存
// 的token信息进行一个封装，每次需要用token的时候我们只需要导入该文件即可
// 首先我们要先获取token信息，把第一次登陆成功时候的token来保存到我们的本地储存上面
// 我们想要保存token就需要先设置一个k，通过k来获取token信息，我们设置一个k为user_key代表了
// 用户的键，此时我们把获取到的token存储到该键里面即可
// 此时我们的键就设置好了
const USER_KEY = 'hm-toplines-87'
// 设置好键之后我们还需要导出三个操作，存储token获取token和删除token
// 用户登录的时候我们把token存储到本地，为获取token
// 用户请求数据的时候需要带着token去请求数据，此时我们需要获取token
// 用户退出登录的时候则需要删除token
// 我们不需要一下获取三个个操作，而是需要哪个就用哪个，此时我们采取按需导出的方式
// 来把这三个操作进行导出
// 首先我们要先设置token，我们设置一个参数，该参数代表的是我们从服务器获取过来的token信息
export const setUser = (user) => {
  // 因为我们是要将登陆请求的token'存储到我们的本地存储，所以此时我们不需要return
  // 本地存储只能存储一些json格式的字符串，所以我们在储存token的时候需要将他进行转换
  // 转换为json格式的字符串即可
  // 存储完毕后我们就可以通过user_key来获取t存储到本地的token信息了
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
}
// 第二个操作是我们需要获取token，带着token来发送请求，此时我们在获取token发送请求时候有两种情况
// 第一种是有token我们带着token来发送请求来请求数据
// 第二种是没有token，此时没有token我们在获取token的时候不会去报undefined，而是会报错
// 所以我们在获取token的时候分为两种情况。如果有token我们带着token发送请求，如果没有token
// 我们就给他返回一个空的对象，避免报错
export const getUser = () => {
  // 此时我们需要返回一个token信息而不是设置。所以需要return，
  // 把我们获取的token转换为对象格式的，用user_key来获取我们存储的token信息
  return JSON.parse(window.localStorage.getItem(USER_KEY) || '{}')
}
// 第三个操作是用户退出了登录，此时我们需要来删除token
export const delUser = () => {
  // 删除token，我们直接删除存储token的属性名即可（user_key）
  window.localStorage.removeItem(USER_KEY)
}
