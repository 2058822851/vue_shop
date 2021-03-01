import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('views/login/login.vue')
const Home = () => import('views/home/home.vue')

const routes = [
  {
    path: '/',
    redirect: './login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 从哪个路径来
  //next 是一个函数，表示放行
  if(to.path == '/login') return next()//登录页直接放行，没有权限
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')//token不存在说明没登陆，强制跳转到登录页
  next()


})

export default router
