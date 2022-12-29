// 权限
import router from './router'
import store from './store'
import { Message } from 'element-ui'
// 进度条插件
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// 导航守卫
router.beforeEach(async(to, from, next) => {
  // start progress bar
  // 显示进度条
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 通过 cookie 中存储的 token 判断用户是否登录
  const hasToken = getToken()
  if (hasToken) {
    // 已登录
    // 去往登录界面
    if (to.path === '/login') {
      // if is login in ,redirect to the home page
      next({ path: '/' })
      // 进度条完成
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 获取权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        //  获取用户信息
        try {
          // 没用户信息，获取用户信息
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')
          // 根据用户权限生成动态路由
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )
          router.addRoutes(accessRoutes)
          // 设置replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
          // const lastRou = [{ path: '*', redirect: '/404', hidden: true }]
          // router.addRoutes(lastRou)
        } catch (error) {
          // 获取用户信息失败，可能是token过期了
          await store.dispatch('user/resetToken')
          Message.error({ error: error || 'Has Error' })
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有令牌，游客模式只能访问白名单中的路由，访问其他路由让其登录
    // has no token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 确保进度条加载完成
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
