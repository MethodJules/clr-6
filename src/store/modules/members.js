import axios from "axios"
const state = () => ({
    currentUser: localStorage.getItem("userLoggedIn"),
    members: [
        { name: 'Person 1', role: 'Gruppenadmin' },
        { name: 'Person 2', role: 'Gruppenmitglied' },
        { name: 'Person 3', role: 'Betreuer*in' },

    ],
})
const actions = {
    addMember({ commit }, member) {
        commit('addMember', member)
    },
    deleteMembers({ rootState, state }, mitglied) {
        var config = {
            method: 'delete',
            url: `jsonapi/node/project/${mitglied.userid}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };
        axios(config)
            .then((response) => {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
    },
}
const mutations = {
    addMember(state, member) {
        state.members.push(member);
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
