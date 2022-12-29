<template>
  <div :class="{ 'has-logo': showLogo }" class="sidebar-container">
    <!-- 展示logo -->
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!--
        当前打开的 sub-menu的index的数组
        是否水平折叠收起菜单 仅在mode为vertical时可用
        菜单的背景颜色
        是否只保持一个子菜单的展开
        当前激活菜单的文字颜色
        折叠动画
        模式
      -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 菜单 -->
        <SidebarItem
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
import { mapGetters } from 'vuex'
export default {
  name: 'Sidebar',
  components: {
    Logo,
    SidebarItem
  },
  data() {
    return {
      collapse: true,
      Logo: true
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    variables() {
      return variables
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // 展示logo
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    /**
     * 是否完全展示侧边栏
     * 一种是只显示icon
     * 另一种是展示 icon 和 描述
     */
    isCollapse() {
      return !this.sidebar.opened
      // return false
    }
  }
}
</script>

<style></style>
