import Vue from 'vue'
import App from './App.vue'
import router from './router.js'   //在入口文件引用了router 并且 在newVue的时候 把router挂在到了router属性上
import store from './store/index.js'
Vue.config.productionTip = false
window.baseurl = process.env.VUE_APP_BASE_URL || 'http://localhost:9001'


new Vue({
  router,   // 挂载
  store,
  render: h => h(App),
}).$mount('#app')
