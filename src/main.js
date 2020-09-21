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


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Chat)

Vue.use(Vuex);

new Vue({
    router,
    vuetify,
    store,
  render: h => h(App),
}).$mount('#app')
