import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('views/home/home')
const Singer = () => import('views/singer')
const Ranking = () => import('views/ranking')
const Search = () => import('views/search')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/ranking',
    component: Ranking
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})


