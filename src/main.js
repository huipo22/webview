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

import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'ec7c2ac028a40e993e9a4d8c812124f5',
  plugin: ['AMap.Autocomplete',

    'AMap.PlaceSearch',

    'AMap.Scale',

    'AMap.OverView',

    'AMap.ToolBar',

    'AMap.MapType',

    'AMap.PolyEditor',

    'AMap.CircleEditor',

    'AMap.Geolocation'

  ],
  v: '1.4.4'
});
import { Toast } from "vant";

Vue.use(Toast);
// axios
import axios from 'axios'
import qs from 'qs';
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.qs = qs
//默认后台接口前缀
// axios.defaults.baseURL = 'https://gh.jishanhengrui.com/api/'
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.config.productionTip = false

import filter from '../src/filter'

// 全局导入过滤器
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))

new Vue({
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
