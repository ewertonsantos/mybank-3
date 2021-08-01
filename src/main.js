import Vue from 'vue'
import Axios from './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

Vue.use(ElementUI, { locale })
Vue.use(Axios)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

