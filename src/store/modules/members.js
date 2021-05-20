const state = () => ({
    members: [
        { name: 'Person 1', role: 'Gruppenadmin'},
        { name: 'Person 2', role: 'Gruppenmitglied'},
        { name: 'Person 3', role: 'Betreuer*in'}, 
        
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