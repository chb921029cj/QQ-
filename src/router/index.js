import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/page/recommend/recommend'
import Rank from '@/components/page/rank/rank'
import Singer from '@/components/page/singer/singer'
import Search from '@/components/page/search/search'
import SingerDetail from '@/components/page/singer-detail/singer-detail'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/search ',
      component: Search
    },
  ]
})
