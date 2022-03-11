const state = () => ({
    items: [],
})


const actions = {
    addItem({ commit }, item) {
        commit('addItem', item)
    }
}


const mutations = {
    addItem(state, item) {

        state.items.push(item);
    },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}