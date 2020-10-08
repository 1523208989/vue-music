import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'
import 'assets/style/init.less'
import 'assets/font/icon_font/iconfont.css'

Vue.config.productionTip = false;
FastClick.attach(document.body);
Vue.use(VueLazyLoad, {
  loading: require('assets/image/logo/logo.png')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
