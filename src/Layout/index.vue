<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 当为 mobile 时，隐藏侧边栏，当单击菜单键才会显示侧边栏，该元素为显示侧边栏的背景色 -->
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- 侧边栏 两种模式：默认为desktop，模式二mobile -->
    <!-- 模式二会隐藏侧边栏，当显示侧边栏时会出现在蒙层之上 -->
    <Sidebar class="sidebar-container" />
    <!-- 主容器 -->
    <!-- 是否含有标签 -->
    <div class="main-container" :class="{ hasTagsView: needTagsView }">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- 导航条 -->
        <NavBar />
        <!-- 页面标签 -->
        <TagsView v-if="needTagsView" />
      </div>
      <!-- 功能展示区 -->
      <AppMain />
    </div>
    <!-- 右面板 -->
    <RightPanel v-if="showSettings">
      <!-- 设置 -->
      <settings />
    </RightPanel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Sidebar, Settings, TagsView, NavBar, AppMain } from './components'
import RightPanel from '@/components/RightPanel'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'Layout',
  components: { Sidebar, Settings, TagsView, NavBar, AppMain, RightPanel },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
