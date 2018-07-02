// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import axios from 'axios'
import '@/assets/css/common.scss'
import '@/assets/js/rem';
import VueLozyLoad from 'vue-lazyload'
import store from './store'

FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLozyLoad,{
  loading:require('./assets/image/loading.gif'),
  error:require('./assets/image/loading.gif'),
})
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
