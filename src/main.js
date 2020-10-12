import Vue from 'vue'
import App from './App.vue'

Vue.use(VModal)
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
