import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/Layout'
Vue.use(Router)
// 引入过长的路由
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import nestedRouter from './modules/nested'
import tableRouter from './modules/table'
// 不需要权限就可以直接进入的路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/view/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/view/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/view/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/view/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/view/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/view/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/view/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/view/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/view/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/view/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/view/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/view/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/view/icons/index.vue'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/view/example/create'),
        name: 'CreateArtice',
        meta: {
          title: 'Create Article',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/view/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/view/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/view/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/view/error-page/401.vue'),
        name: 'Page401',
        meta: {
          title: '401',
          noCache: true
        }
      },
      {
        path: '404',
        component: () => import('@/view/error-page/404.vue'),
        name: 'Page404',
        meta: {
          title: '404',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/view/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/view/Excel/export-excel'),
        name: 'ExportExcel',
        meta: {
          title: 'Export Excel'
        }
      },
      {
        path: 'export-select',
        component: () => import('@/view/Excel/export-select'),
        name: 'ExportSelect',
        meta: {
          title: 'Export Select'
        }
      },
      {
        path: 'merge-header',
        component: () => import('@/view/Excel/merge-header'),
        name: 'MergeHeader',
        meta: {
          title: 'Merge Header'
        }
      },
      {
        path: 'upload-excel',
        component: () => import('@/view/Excel/upload-Excel'),
        name: 'UploadExcel',
        meta: {
          title: 'Upload Excel'
        }
      }
    ]
  },
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/export-zip',
    meta: { title: 'Zip', icon: 'zip' },
    alwaysShow: true,
    children: [
      {
        path: 'export-zip',
        component: () => import('@/view/zip/export-zip'),
        name: 'ExportZip',
        meta: {
          title: 'Export Zip'
        }
      }
    ]
  },
  {
    path: '/pdf',
    component: Layout,
    redirect: '/zip/export-pdf',
    meta: { title: 'PDF', icon: 'pdf' },
    alwaysShow: true,
    children: [
      {
        path: 'export-pdf',
        component: () => import('@/view/pdf/index'),
        name: 'ExportPdf',
        meta: {
          title: 'Export PDF'
        }
      }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/view/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/view/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/pdf/download',
    component: () => import('@/view/pdf/download.vue'),
    hidden: true
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 需要服务端支持
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
