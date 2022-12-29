import Layout from '@/Layout'

const nestedRouter = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: 'Nested',
  meta: {
    title: 'Nested Routes',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      name: 'Menu1',
      component: () => import('@/view/nested/menu1/index'),
      meta: { title: 'Menu 1' },
      children: [
        {
          path: 'menu1-1',
          name: 'Menu1-1',
          component: () => import('@/view/nested/menu1/menu1-1/index'),
          meta: { title: 'Menu 1-1' }
        },
        {
          path: 'menu1-2',
          name: 'Menu1-2',
          component: () => import('@/view/nested/menu1/menu1-2/index'),
          meta: { title: 'Menu 1-2' },
          children: [
            {
              path: 'menu1-2-1',
              name: 'Menu1-2-1',
              component: () => import('@/view/nested/menu1/menu1-2/menu1-2-1/index'),
              meta: { title: 'Menu 1-2-1' }
            },
            {
              path: 'menu1-2-2',
              name: 'Menu1-2-2',
              component: () => import('@/view/nested/menu1/menu1-2/menu1-2-2/index'),
              meta: { title: 'Menu 1-2-2' }
            }
          ]
        },
        {
          path: 'menu1-3',
          name: 'Menu1-3',
          component: () => import('@/view/nested/menu1/menu1-3/index'),
          meta: { title: 'Menu 1-3' }
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/view/nested/menu2/index'),
      meta: { title: 'Menu 2' }
    }
  ]
}

export default nestedRouter
