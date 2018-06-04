import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import App from './App.vue'
import {router} from './router/index'

Vue.use(VueSocketio, 'http://localhost:5000')

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
