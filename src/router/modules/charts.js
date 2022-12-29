import Layout from '@/Layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/view/charts/keyboard.vue'),
      name: 'keyboardChart',
      meta: {
        title: 'keyboard Chart',
        noCache: true
      }
    },
    {
      path: 'line',
      component: () => import('@/view/charts/line.vue'),
      name: 'LineChart',
      meta: { title: 'Line Chart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/view/charts/mix-chart.vue'),
      name: 'MixChart',
      meta: { title: 'Mix Chart', noCache: true }
    }
  ]
}
export default chartsRouter
