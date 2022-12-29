import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 全局使用SvgIcon
Vue.component('svg-icon', SvgIcon)
// require.context：前端工程化引入文件
/**
  directory:表示检索的目录
  useSubdirectories：表示是否检索子文件夹
  regExp:匹配文件的正则表达式,一般是文件名
  mode:加载模式，同步/异步
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => {
  // console.log(requireContext.keys().map(requireContext))
  return requireContext.keys().map(requireContext)
}
requireAll(req)

