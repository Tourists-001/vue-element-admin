import permission from './permission'

const install = function(Vue) {
  Vue.directive('Permission', permission)
}

if (window.Vue) {
  window['permisson'] = permission
  Vue.use(install) // eslint-disable-line
}

permission.install = install
export default permission
