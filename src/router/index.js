import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入vuex实例
import store from '@/store'
// 引入各个组件，设置路由懒加载
// 引入二级路由界面
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/Index')
const Question = () => import('@/views/question/Index')
const Video = () => import('@/views/video/Index')
const User = () => import('@/views/user/Index')
const UserProfile = () => import('@/views/user/Profile')
const UserChat = () => import('@/views/user/Chat')
const Login = () => import('@/views/user/Login')
const Search = () => import('@/views/search/Index')
const SearchResult = () => import('@/views/search/Result')
const Article = () => import('@/views/home/Article')
Vue.use(VueRouter)

const routes = [
  // 配置路由规则
  { path: '/',
    component: Layout,
    // 这些组件都是需要在二级路由页面显示的组件
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/question', name: 'question', component: Question },
      { path: '/video', name: 'video', component: Video },
      { path: '/user', name: 'user', component: User }
    ]
  },
  // 这些是在我们的app一级路由里面显示的组件
  // 这些是我们在user路由里面设置的组件
  { path: '/user/profile', name: 'user-profile', component: UserProfile },
  { path: '/user/chat', name: 'user-chat', component: UserChat },
  // 登录组件写在user里面，但是不需要通过user来启动该组件
  { path: '/login', name: 'login', component: Login },
  // 设置搜索组件的路由规则
  { path: '/search', name: 'search', component: Search },
  { path: '/search/result', name: 'search-result', component: SearchResult },
  { path: '/article', name: 'article', component: Article }

]

const router = new VueRouter({
  routes
})
// 我们设置完路由规则之后，还需要设置登录的路由守卫，如果你没有登录想要访问我们的页面
// 就让他去登录页面进行登录去，而我们需要设置强制登录的页面暂时就三个，所以此时需要设置一个
// 路由守卫，如果你没有登录想访问该页面，则让你去登录去
// 路由守卫也被称为导航前置守卫,我们的路由守卫要设置在实例化路由的下面
// 路由守卫有三个参数，去哪里，从哪里来，是否放行
router.beforeEach((to, from, next) => {
// 我们要先判断是否有token如果没有token就让他去登录页面，如何判断，我们已经将token
// 托管到了vuex里面此时我们需要引入vuex实例，从实例里面获取user信息，判断user信息即可
// 获取token信息
// const { user } = store.state
// 获取到之后进行判断
// 我们有三个组件无token是无法访问的，这三个组件都是user里面的我们可以使用es6的startsWith来进行筛选
// 如果开头是/user还没有token的旧让他登录去
// if (!user.token && to.path.startsWith('/user')) {
// 判断没有token还要访问user组件中的页面，就让他去登录页面，但是如果实在其他组件
// 中被强制登录了，我们在登录完毕之后还需要设置一个回跳的操作
// 使用query来设置一个对象redirectUrl属性,该属性指定了要去的组件
// 我们在进行next操作的时候因为要设置一个回跳操作，所以此时需要传入一个对象
// 此时我们的路径传入一个对象，如果你没有token被强制的推送到了登录页面
// 我们会记录你来的位置，此处我们使用query来进行传参操作，在问好后面记录我们是从哪个组件来的
// 当登录成功后则会回跳到当前的页面此时的query是一个以query的方式进行传参的操作
// 该参数则是你当前的路由地址信息
// 此处的path则是你被强制推送到哪的路由信息
// return next({ path: '/login', query: { redirectUrl: to.path } })
  const { user } = store.state
  const loginConfig = { path: '/login', query: { redirectUrl: to.path } }
  if (to.path.startsWith('/user') && !user.token) return next(loginConfig)
  next()
}

)

export default router
