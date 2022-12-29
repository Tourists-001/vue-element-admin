<template>
  <!-- wheel 滚轮事件接口 -->
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script>
const tagAndTagScpacing = 4
export default {
  name: 'ScrollPane',
  data() {
    return {
      left: 0
    }
  },
  computed: {
    scrollWrapper() {
      // 获取 el-scrollbar__wrap 元素
      return this.$refs.scrollContainer.$refs.wrap
    }
  },
  mounted() {
    // 监听滚动事件，滚动事件触发将关闭页面的右键菜单
    this.scrollWrapper.addEventListener('scroll', this.emitScroll, true)
    // this.moveToTarget()
  },
  beforeDestroy() {
    // 移除事件监听
    this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
  },
  methods: {
    // 提交事件
    emitScroll() {
      this.$emit('scroll')
    },
    handleScroll(e) {
      // console.log(e);
      // e.wheelDelta 鼠标滚轮向上为正，向下为负
      // edeltaY 鼠标纵向的滚动值
      const eventDeta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDeta / 4
    },
    moveToTarget(currentTag) {
      // 获取scroll-container元素
      const $container = this.$refs.scrollContainer.$el
      // 获取容器的宽度
      const $containerWidth = $container.offsetWidth
      // 获取el-scrollbar_wrap元素，是控制滚动条的元素
      const $scrollWrapper = this.scrollWrapper
      // 获取tag数组
      const tagList = this.$parent.$refs.tag
      let firstTag = null
      let lastTag = null

      // find first tag and end tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }
      // 使用猜测来提升性能，类似vue的diff算法
      if (firstTag === currentTag) {
        // 第一个标签是当前展示的标签
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // 获取前一个标签与下一个标签
        // 前面判断的是第一个标签或者是最后一个标签
        // 走到这一步说明：当前选中的标签在中间，获取前一个标签与后一个标签
        // 通过前一个标签和后一个标签
        // 找到当前标签和下一个标签
        const currentIndex = tagList.findIndex((item) => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]
        // 计算当前选中标签的前一个元素从左边到容器的left
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagScpacing
        // 计算当前选中标签的后一个元素从右边到容器的left
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagScpacing
        if (
          afterNextTagOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          // 下一个标签没有展示全
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          // 前一个标签没有展示全
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
