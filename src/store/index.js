import Vue from 'vue'
import Vuex from 'vuex'
import items from './modules/items'
import concepts from './modules/concepts'
import concept_map from './modules/concept_map'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
    modules: {
       items,
       concepts,
       concept_map
    }
})
