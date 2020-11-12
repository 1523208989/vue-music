import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('views/home/home')
const Singer = () => import('views/singer/singer')
const Ranking = () => import('views/ranking/ranking')
const Search = () => import('views/search/search')
const SongListDetail = () => import('views/home/songListDetail')
const SingerDetail = () => import('views/singer/singerDetail/singerDetail')
const RankingDetail = () => import('views/ranking/rankingDetail')
const SearchDetail=()=>import ('views/search/searchDetail')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: ':id',
        component: SongListDetail
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SearchDetail
      }
    ]
  },
  {
    path: '/ranking',
    component: Ranking,
    children: [
      {
        path: ':id',
        component: RankingDetail
      }
    ]
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})


