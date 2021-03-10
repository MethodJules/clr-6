// Member store 
const state = () => ({
    // list of members
    currentUser: localStorage.getItem("userLoggedIn"),

    members: [
        { name: 'Member 1', role: 'Admin', img: '~@/assets/profilbild.png', username: "user", password:"password"},
        { name: 'Member 2', role: 'member', img: '~@/assets/profilbild.png', username: "user2", password: "password2"},
        { name: 'Member 3', role: 'member', img: '~@/assets/profilbild.png', username: "user3", password: "password3"},
        { name: 'Member 4', role: 'member', img: '~@/assets/profilbild.png', username: "user4", password: "password4" }
    ]
})


// add or delete Members, are called from Components
const actions = {
    addMember({ commit }, member) {
        commit('addMember', member)
    },
    deleteMembers({ commit }, member) {
        commit('deleteMembers', member)
    }, 
    login({ commit }, user) {
        commit('login', user)
    },
    logout({ commit }) {
        commit ('logout')
    }
}

const getters = {
    getMemberbyUsername: (state) => (username) => {
        return state.members.find(member => member.username === username);
    }
}

// add or delete members, are called from actions
const mutations = {
    addMember(state, member) {

        state.members.push(member);
    },

    deleteMembers(state, member) {
        let index = state.members.indexOf(member);
        state.members.splice(index, 1);

    },
    login(state, user) {
        state.currentUser = user;

    }, 
    logout(state) {
        state.currentUser = '';

    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions, 
    getters
}