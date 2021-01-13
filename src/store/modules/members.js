const state = () => ({
    members: [
        { name: 'Member 1', role: 'Admin', img: '~@/assets/profilbild.png' },
        { name: 'Member 2', role: 'member', img: '~@/assets/profilbild.png' },
        { name: 'Member 3', role: 'member', img: '~@/assets/profilbild.png' },
        { name: 'Member 4', role: 'member', img: '~@/assets/profilbild.png' }
    ]
})


const actions = {
    addMember({ commit }, member) {
        commit('addMember', member)
    },
    deleteMembers({ commit }, member) {
        commit('deleteMembers', member)
    }
}


const mutations = {
    addMember(state, member) {

        state.members.push(member);
    },

    deleteMembers(state, member) {
        let index = state.members.indexOf(member);
        state.members.splice(index, 1);

    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}