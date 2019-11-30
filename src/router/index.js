import Vue from 'vue'
import VueRouter from 'vue-router'
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

export default router
