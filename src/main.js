import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Chat from 'vue-beautiful-chat'
import zircle from 'zircle'
import 'zircle/dist/zircle.css'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.min.css'

import VueApexCharts from 'vue-apexcharts'

import AppDate from '@/components/AppDate'
Vue.component('AppDate', AppDate)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Chat)
Vue.use(zircle)
Vue.use(Vuex);
Vue.use(Datetime)

Vue.component('apexchart', VueApexCharts)

new Vue({
    router,
    vuetify,
    store,
  render: h => h(App),
}).$mount('#app')
