import Vue from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import settings from '@/settings'
// you can set in settings.js
// errorLog:'production' | ['production', 'development']
// 展示错误日志的环境
const { errorLog: needErrorLog } = settings
/**
 * 检查当前环境是否需要错误日志
 * 错误日志的配置格式为： String or Array
 * @returns Boolean
 */
function checkNeed() {
  // 获取当前环境\
  const env = process.env.NODE_ENV
  console.log(env)
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}
// checkNeed()
if (checkNeed()) {
  // 全局配置错误处理
  Vue.config.errorHandler = function(err, vm, info, a) {
  // Don't ask me why I use Vue.nextTick, it just a hack.
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      store.dispatch('errorLog/addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      })
      console.error(err, info)
    })
  }
}
