<script>
export default {
  name: 'MenuItem',
  /**
   *  若一个组件只用于展示数据，所有动态数据都从父组件传递进来（只有props），
   *  内部没有逻辑交互（无methods方法、也没有mounted等任何生命周期处理函数），
   *  没有状态修改(无data)，则推荐使用函数式组件来提升vue的性能
   */
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  // 渲染icon
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
    if (icon) {
      if (icon.includes('el-icon')) {
        // 使用的是elementUi的icon
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        // 使用的是svg图标
        vnodes.push(<svg-icon icon-class={icon} />) // 在render函数中插入组件，无需引入
      }
    }

    if (title) {
      // 添加的title
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style  scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
