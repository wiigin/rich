import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'lib-flexible/flexible'
import api from './api/install'
import inter from "./api/service";
Vue.use(inter);
Vue.use(api)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
