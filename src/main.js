import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

import axios from 'axios'
import qs from 'qs';
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.qs = qs
//默认后台接口前缀
axios.defaults.baseURL = ''
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


Vue.config.productionTip = false

new Vue({
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
