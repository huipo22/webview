import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import router from '../router/index'
import 'vant/lib/index.css'
import axios from 'axios'
import qs from 'qs';

Vue.config.productionTip = false;
Vue.prototype.axios = axios; 
Vue.prototype.qs = qs 
//默认后台接口前缀
axios.defaults.baseURL=''
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
