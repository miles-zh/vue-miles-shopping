import Vue from 'vue'
import App from './App.vue'
import router from "./router"

import axios from 'axios'
import VueAxios from 'vue-axios'
import BaiduMap from 'vue-baidu-map';
Vue.use(VueAxios, axios)


import store from './store'

const baseUrl="http://rap2.taobao.org:38080/app/mock/252258"

// console.log(store)

Vue.config.productionTip = false
Vue.prototype.baseUrl=baseUrl
// console.log(router)
Vue.use(BaiduMap,{
  ak:'mWiuEvNSgccg57stVIiEV0aDIXZVeofw'
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
