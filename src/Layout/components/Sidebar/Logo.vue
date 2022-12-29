<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="siderLogoFade">
      <router-link v-if="collapse" key="collapse" class="siderbar-logo-link" to="/">
        <!-- 侧边栏收缩状态 -->
        <!-- 右logo 展示 logo 否则展示网站标题 -->
        <img v-if="logo" :src="logo" class="sidebar-logo" alt="vue-admin">
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" alt="vue-admin">
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    // 显示收缩
    collapse: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      title: 'Vue Element Admin'
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }
  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }
  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;
    & .sidebar-logo-link {
      height: 100%;
      width: 100%;
    }
    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
    &.collapse {
    .sidebar-logo {
      margin-right: 0;
      }
    }
  }
</style>
