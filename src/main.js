import Vue from 'vue'

import Cookie from 'js-cookie'

// 重置样式
import 'normalize.css/normalize.css'

// 导入elementUI
import ElementUI from 'element-ui'
import './styles/element-variables.scss'

// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

// global.css
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

// icon(全局使用icon，必须在main.js中引入)
import './icons'

// 权限
import './permission'

// 展示错误日志
import './utils/error-log'

// 全局过滤器
import * as filters from './filters'

// 模拟数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// use ElementUI
Vue.use(ElementUI, {
  size: Cookie.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// 注册全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
