// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import store from './store/store'
import ChessBoard from 'chessboardjs-vue'

Vue.config.productionTip = false
VueCookies.config('120d')
VueCookies.set('language', 'JavaScript')
Vue.mixin({
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1)
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, ChessBoard },
  template: '<App/>',
  store: store
})
