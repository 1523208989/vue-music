import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'
import 'assets/style/init.less'

Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.use(VueLazyLoad, {
  loading: require('assets/image/logo/logo.png')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
