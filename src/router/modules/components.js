/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/Layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDome',
  meta: {
    title: 'Components',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/view/components-dome/tinymce.vue'),
      name: 'TinymceDome',
      meta: { title: 'Tinymce' }
    },
    {
      path: 'markdown',
      component: () => import('@/view/components-dome/markdown.vue'),
      name: 'MarkdownDemo',
      meta: { title: 'Markdown' }
    },
    {
      path: 'json-editor',
      component: () => import('@/view/components-dome/json-editor.vue'),
      name: 'JsonEditorDemo',
      meta: { title: 'JSON Editor' }
    },
    {
      path: 'split-pane',
      component: () => import('@/view/components-dome/split-pane.vue'),
      name: 'SplitPaneDemo',
      meta: { title: 'SplitPane' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/view/components-dome/avatar-upload.vue'),
      name: 'AvatarUpload',
      meta: { title: 'AvatarUpload' }
    },
    {
      path: 'drop-zone',
      component: () => import('@/view/components-dome/drop-zone.vue'),
      name: 'DropZone',
      meta: { title: 'dropZone' }
    },
    {
      path: 'sticky',
      component: () => import('@/view/components-dome/sticky.vue'),
      name: 'stickyDome',
      meta: { title: 'Sticky' }
    },
    {
      path: 'count-to',
      component: () => import('@/view/components-dome/count-to.vue'),
      name: 'countToDome',
      meta: { title: 'countTo' }
    },
    {
      path: 'mixin',
      component: () => import('@/view/components-dome/mixin.vue'),
      name: 'mixinDome',
      meta: { title: 'components mixin' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/view/components-dome/back-to-top.vue'),
      name: 'BackToTOP',
      meta: { title: 'Back To Top' }
    },
    {
      path: 'drag-dialog',
      component: () => import('@/view/components-dome/drag-dialog.vue'),
      name: 'dragDialog',
      meta: { title: 'drag dialog' }
    },
    {
      path: 'drag-select',
      component: () => import('@/view/components-dome/drag-select.vue'),
      name: 'DragSelect',
      meta: { title: 'drag select' }
    },
    {
      path: 'dnd-list',
      component: () => import('@/view/components-dome/dnd-list.vue'),
      name: 'DndList',
      meta: { title: 'dnd list' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/view/components-dome/drag-kanban.vue'),
      name: 'DragKanban',
      meta: { title: 'drag kanban' }
    }
  ]
}

export default componentsRouter
