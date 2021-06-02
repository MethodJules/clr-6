import axios from 'axios';

const state = () => ({
    account: null,
    validCredential: false,
});

const mutations = {
    setAccount(state, account) {
        console.log(account)
        state.account = account;
        if (account.lastName == "Fiedler") {
            state.validCredential = true
        }
    }
};

const actions = {
    async signin({commit}, {username, password}) {
        console.log(username + '_' + password);
        let data = await axios.get(
            'https://dummyapi.io/data/api/user/0F8JIqi4zwvb77FGz6Wt',{
                    headers: {
                        'app-id': '60b7b12027dbc558382e9e84'
                    }
                }
            );
        commit('setAccount', data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}