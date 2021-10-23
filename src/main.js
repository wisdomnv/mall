import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toas/toast.js'
import vuelazyload from 'vue-lazyload'
// import fastclick from 'fastclick'
// vue-lazyload：图片懒加载

Vue.use(vuelazyload)

Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue


// 安装toast插件
Vue.use(toast)



// 解决移动端300ms的延迟
// fastclick.attach(document, body)



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
