import variables from '@/styles/element-variables.scss'
// 导入默认全局配置
import defaultSettings from '@/settings'

// 结构配置文件
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings
const state = {
  theme: variables.theme, // 主题色
  showSettings: showSettings, // 显示设置
  tagsView: tagsView, // 标签视图
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo // 侧边栏显示 logo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
