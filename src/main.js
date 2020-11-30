import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

// const BASE_URL = 'https://alpha.southeastasia.cloudapp.azure.com/';

Vue.use(VModal)
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
Vue.config.productionTip = false
// Vue.use(VueAxios, axios.create({ baseURL: BASE_URL }));
Vue.use(VueAxios, axios.create());

new Vue({
  render: h => h(App),
}).$mount('#app')
