const state = () => ({
    members: [
        { name: 'Gruppenadministrator', role: 'Admin'},
        { name: 'Gruppenmitglieder', role: 'member'},
        { name: 'Betreuer/in', role: 'member'}, 
        
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