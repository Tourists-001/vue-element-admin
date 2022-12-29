import Layout from '@/Layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/view/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: 'Dynamic Table' }
    },
    {
      path: 'drag-table',
      component: () => import('@/view/table/drag-table'),
      name: 'DragTable',
      meta: { title: 'Drag Table' }
    },
    {
      path: 'inline-edit',
      component: () => import('@/view/table/inline-edit'),
      name: 'InlineDdit',
      meta: { title: 'Inline Ddit' }
    },
    {
      path: 'complex-table',
      component: () => import('@/view/table/complex-table'),
      name: 'Complex Table',
      meta: { title: 'Complex Table' }
    }
  ]
}

export default tableRouter
