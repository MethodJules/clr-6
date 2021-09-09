import axios from "axios"
const state = () => ({

    currentUser: localStorage.getItem("userLoggedIn"),
    
    members: [
        { name: 'Person 1', role: 'Gruppenadmin'},
        { name: 'Person 2', role: 'Gruppenmitglied'},
        { name: 'Person 3', role: 'Betreuer*in'}, 
        
    ],
    //lecturers: [],
})


const actions = {
    addMember({ commit }, member) {
        commit('addMember', member)
    },
    deleteMembers({ commit }, member) {
        commit('deleteMembers', member)
    },

    
    /**
    * fake Login that skips the request to sparky api, for development purposes
    */
     loadUsersFromBackend({ commit, state, dispatch }) {
        console.log(commit)
        console.log(state)
        console.log(dispatch)
        var config = {
            method: 'get',
            url: 'https://clr-backend.ddns.net/jsonapi/user/user',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
            },
        };
        axios(config)
            .then(function (response) {
                console.log(response)
/*                 const users = response.data.data.map((user) =>{
                    return user.attributes.display_name + user.attributes.id
                })
                response.data.data.forEach((user) => {
                    state.lecturers.push({id: user.attributes.id, name: user.attributes.display_name })
                }) */
            })
            .catch(function (error) {
                console.log(error)
            })
    },
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