import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding // 传入自定义指令的 value
  const roles = store.getters && store.getters.roles // 存入 vuex里的roles （当前用户的权限）
  // console.log(value)
  if (value && value instanceof Array) {
    // value有值
    if (value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role)
      })
      // console.log(hasPermission, ' d')
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
        // console.log(el.parentNode, el.parentNode.removeChild(el))
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
