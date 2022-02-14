import axios from "axios"
const state = () => ({

    currentUser: localStorage.getItem("userLoggedIn"),

    members: [
        { name: 'Person 1', role: 'Gruppenadmin' },
        { name: 'Person 2', role: 'Gruppenmitglied' },
        { name: 'Person 3', role: 'Betreuer*in' },

    ],
    //lecturers: [],
})


const actions = {
    addMember({ commit }, member) {
        commit('addMember', member)
    },


    /**
    *

     loadUsersFromBackend({ commit, state, dispatch }) {
        console.log(commit)
        console.log(state)
        console.log(dispatch)
        var config = {
            method: 'get',
            url: 'jsonapi/user/user',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
            },
            withCredentials: true,
        };
        axios(config)
            .then(function (response) {
                console.log(response)
//                  const users = response.data.data.map((user) =>{
//                     return user.attributes.display_name + user.attributes.id
//                 })
//                 response.data.data.forEach((user) => {
//                     state.lecturers.push({id: user.attributes.id, name: user.attributes.display_name })
//                 })
            })
            .catch(function (error) {
                console.log(error)
            })
    },
    */
    deleteMembers({ rootState, state }, mitglied) {
        //let index = state.mitglied.indexOf(mitglied);
        //state.mitglied.splice(index, 1);
        console.log(mitglied.userid);

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
                // commit('deleteMemberFrontend', payload);
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
