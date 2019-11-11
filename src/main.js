import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

// 地图组件
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'CeqxiSuNZHrD8hVUGlggfgLto5LOm49I'
})

// axios
import axios from 'axios'
import qs from 'qs';
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.qs = qs
//默认后台接口前缀
axios.defaults.baseURL = 'https://gh.jishanhengrui.com/api/'
// axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false

new Vue({
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
