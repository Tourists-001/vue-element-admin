import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
// 导出的方法有 3 个属性： resolve, keys, id。
// resolve 是一个函数，它返回要查找文件的相对路径
// const a = modulesFiles.resolve(modulesFiles.keys()[0])

// keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
// const arr = modulesFiles.keys()
// id 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// console.log(modules)
const store = new Vuex.Store({
  modules,
  getters
})

export default store
