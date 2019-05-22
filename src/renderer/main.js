import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material-design-icons/styles.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import axios from 'axios'
import db from '~/dataStore'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.use(VueMaterial)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  beforeCreate: function() {
    this.$db.defaults({ posts: [], user: {}, count: 0 }).write()
  }
}).$mount('#app')
