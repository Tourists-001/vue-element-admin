// 导入 防抖函数
import { debounce } from '@/utils'

export default {
  data() {
    return {
      $_sidebarElm: null,
      $_resizeHandler: null
    }
  },
  mounted() {
    // 为 $_resizeHandler 设置 resize 的防抖函数
    this.$_resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    // 窗口尺寸改变事件，侧边栏改变事件
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  beforeDestroy() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  // 被 keep-alive 缓存的组件激活时调用
  // 该钩子在服务器端渲染期间不被调用。
  // to fixed bug when cached by keep-alive
  // https://github.com/PanJiaChen/vue-element-admin/issues/2116
  activated() {
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  /**
   * 被 keep-alive 缓存的组件失活时调用。
   * 该钩子在服务器端渲染期间不被调用。
   */
  deactivated() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    // 监听窗口尺寸发生改变
    $_initResizeEvent() {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    // 移除监听窗口尺寸发生改变的事件
    $_destroyResizeEvent() {
      window.removeEventListener('resize', this.$_resizeHandler)
    },
    /**
     * 侧边栏尺寸改变
     * @param {*} e
     */
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    },
    /**
     * 初始化侧边栏尺寸改变事件
     * 侧边栏发生改变后，会进行css3的动画过渡，通过监听 transitionend 事件
     * transitionend transitionend 事件会在 CSS transition 结束后触发
     */
    $_initSidebarResizeEvent() {
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    /**
     * 移除事件监听函数
     */
    $_destroySidebarResizeEvent() {
      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    }
  }
}
