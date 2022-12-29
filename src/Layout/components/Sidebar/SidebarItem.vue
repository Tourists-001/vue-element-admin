<template>
  <!-- 根据权限设置路由，hidden：true说明无权访问该路由 -->
  <div v-if="!item.hidden">
    <!-- 是否含有子路由 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <!-- 动态路由 -->
      <!-- 没有子菜单 -->
      <APPLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <!-- 无嵌套子菜单的 class name ： submenu-title-noDropdown -->
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <!-- iocn -->
          <Item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </APPLink>
    </template>
    <!-- 拥有子菜单 -->
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <!-- icon -->
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <!-- 递归组件,显示子菜单 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import APPLink from './Link.vue'
import Item from './Item.vue'
import FixiOSBug from './FixiOSBug'
export default {
  name: 'SidebarItem',
  components: {
    APPLink,
    Item
  },
  mixins: [FixiOSBug],
  props: {
    /**
     * route object
     * {
     *  alwaysShow: true, // 一直显示
     *  children: Array, // 长度为一说明只有一个路径，当长度大于一说明是一个嵌套子菜单
     *  component : Layout,
     *  hidden: true, // 是否隐藏
     *  path: // 路径
     *  name: 'Permission', 路由名
     *  meta: {
     *    icon: 'lock', // icon
     *    roles: Array[2], // 该路由的权限
     *    title: 'Permission', // 路由名
     * }
     * }
     */
    item: {
      type: Object,
      required: true
    },
    // 是否为嵌套子菜单
    isNest: {
      type: Boolean,
      default: false
    },
    // 基础路径
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      // 过滤路由，将隐藏路由过滤出去
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      // 当只有一个子路由时，默认情况下使用该子路由
      if (showingChildren.length === 1) {
        return true
      }
      // 如果没有要显示的子路由，则默认显示父路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    // 解析路由
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        // 是否为外链
        return routePath
      }
      // 基础路径是否为外链
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      // 解析为绝对路径
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
