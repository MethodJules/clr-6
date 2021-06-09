import axios from 'axios';
const baseUrl = "http://147.172.178.30:8080/"

const state = () => ({
    account: null,
    validCredential: false,
});

const mutations = {
    

    setAccount(state, account) {
        console.log(account)
        console.log("account")
        //state.account = account
/* 
        let test = {
            lastName: "Fiedler"
        }
        account = test
        state.account = account
        if (account.lastName == "Fiedler") {
            state.validCredential = true
        } */
        if (account.state == 200) {
            state.validCredential = true
        }
        
    }
};

const actions = {
    async signin({commit}, {username, password}) {

        let dynamicUrl = "api/v1/authenticate"
        let fullUrl = baseUrl+dynamicUrl
        console.log(fullUrl)
        console.log(username + '_' + password);
        let data = await axios.post(
            fullUrl,                  {
                "username": username,
                "password": password
            },
            {
                
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },

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