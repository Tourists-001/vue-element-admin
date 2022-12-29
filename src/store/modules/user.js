import { getToken, removeToken, setToken } from '@/utils/auth'
import { login, getInfo, logout } from '@/api/user.js'
import router, { resetRouter } from '@/router'
const state = {
  token: getToken() || '',
  name: '',
  avatar: '',
  introuduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state, introdiction) => {
    state.introdiction = introdiction
  }
}

const actions = {
  /**
   *
   * @param {*} param0
   * @param {用户信息} userInfo
   */
  login({ commit }, userInfo) {
    // 账号密码
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 发送登录请求
      login({ username: username.trim(), password: password })
        .then((res) => {
          const { data } = res
          // 将token存储到vuex
          commit('SET_TOKEN', data.token)
          // 将token写入cookie
          setToken(data.token)
          resolve()
        })
        .catch((error) => {
          // 返回错误信息
          reject(error)
        })
    })
  },
  /**
   *获取用户信息
   * @param {*} param0
   * @param {*} state
   */
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 通过 token 获取用户信息
      getInfo(state.token)
        .then((response) => {
          // 拿取用户信息
          const { data } = response

          if (!data) {
            // 验证失败，重新登录
            reject('Verification failed, please Login again.')
          }
          // 解构用户信息
          const { roles, name, avatar, introduction } = data

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            // 角色权限必须是一个非空数组
            reject('getInfo: roles must be a non-null array!')
          }
          // 用户角色，用户名，用户头像，用户介绍保存到 vuex中
          commit('SET_ROLES', roles)
          // console.log(roles);
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          // 返回数据
          resolve(data)
        })
        .catch((error) => {
          // 返回错误信息
          reject(error)
        })
    })
  },
  /**
   * 退出登录
   * @param {*} param0
   * @param {*} state
   */
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          // dispatch('tagsView/delAllViews', null, { root: true })

          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },
  // removeToken
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
  /**
   * 切换用户登录
   * @param {*} param0
   * @param {*} role
   */
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    const { roles } = await dispatch('getInfo')
    console.log(roles)
    resetRouter()
    // 基于角色生成对应的路由
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    router.addRoutes(accessRoutes)
    // 修改标签的路由展示
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
