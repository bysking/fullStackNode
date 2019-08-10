// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';


Vue.use(iView);
Vue.use(ElementUI)

Vue.config.productionTip = false
import http from './http'

// 定义全局的变量，在上传文件的地方引用，携带token
Vue.mixin({
  methods: {

    getAuthorization() { 
      return { 
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

Vue.prototype.$http = http // 这样可以在别的地方用this.$http来使用api接口
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
