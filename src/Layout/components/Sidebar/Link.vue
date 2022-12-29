<template>
  <!-- v-bind设置一个或多个属性 设置多个属性的数据格式是对象-->
  <!-- component通过 is 这个属性来设置HTML标签，通过v-bind设置标签的属性 -->
  <component :is="type" v-bind="linkPorps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    // 是否为外部链接
    isExternal() {
      return isExternal(this.to)
    },
    // 元素类型
    type() {
      if (this.isExternal) {
        // 是外部链接为 a 元素
        return 'a'
      }
      // 不是外部链接 为 router-link 组件
      return 'router-link'
    }
  },
  methods: {
    // 组件的link属性
    linkPorps(to) {
      if (this.isExternal) {
        // 为 a 元素设置属性
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      // 为router-link设置属性
      return {
        to: to
      }
    }
  }
}
</script>

<style></style>
