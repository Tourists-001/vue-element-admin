import waves from './waves'
import Vue from 'vue'
function install() {
  Vue.directive('waves', waves)
}
if (window.Vue) {
  window.waves = waves
  Vue.use(install) // eslint-disable-line
}

waves.install = install

export default waves
