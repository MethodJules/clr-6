import axios from 'axios';

const baseUrl = "http://147.172.178.30:8080/"

//TO DO: Coments
const state = () => ({
    account: null,
    validCredential: false,
    token: "",
    sparkyUserID: "",
    //ganzes Object nötig?
    sparkyUserObject: null,
    responsestate: null,
    drupalUserID: "",
    //ganzes Object nötig?
    drupalUserObject: null,
    lecturers: [],
    lecturers2: [],
    sparkylogin: false,
});

const mutations = {

    setAccount(state, account) {

        state.token = account.data.token.token
        if (account.status == 200) {
            state.validCredential = true
        }
    },

    setSparkyObject(state, response) {
        state.sparkyUserID = response.data.id
        state.sparkyUserObject = response
        /*         console.log(state.sparkyUserID)
                console.log(state.sparkyUserObject) */
    },
    sparkyLogin(state) {
        state.sparkylogin = true
    }
};

const actions = {

    /**
 * waits for getWhoamI to finish getting user data from sparky backend. Then makes an api request to clr backend and gets project data of the user with the dispatch to project.js
* @param username username the user gives as input in App.vue
* @param password password the user gives as input in App.vue
*/
    /*     async login({ commit, dispatch }, { username, password }) {
            await dispatch('getWhoamI', { username, password })
            console.log(commit)
            var config = {
                method: 'get',
                url: 'jsonapi/user/user',
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
                },
            };
            axios(config)
                .then(function (response) {
                    //console.log(response.data.data[2].attributes.field_sparky_id)
                    for (var user of response.data.data) {
                        //console.log(user.attributes.field_sparky_id)
                        if (user.attributes.field_sparky_id == state.sparkyUserID) {
                            state.drupalUserID = user.id
                            state.drupalUserObject = user
                            dispatch("project/loadProjectsFromBackend", null, { root: true })
                            state.validCredential = true
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }, 


    /**
    * is called from drupal_api/create_user.
    * makes  api request to sparky backend and gets user data. which is then saved in state with setSparkyObject and calls getSessionToken
    * @param username input from login
    * @param password input from login
    * @param matrikelnummer input from registrate
    */
    async getWhoamI({ dispatch, commit, state }, { username, password, matrikelnummer }) {
        console.log(state.responsestate.data.token.token)
        //state.sparkyUserID = " response.data.id"
        axios.get(
            "http://147.172.178.30:3000/auth/whoAmI",

            {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + state.responsestate.data.token.token,
                },

            }
        )
            .then(response => {
                if (response.status === 200) {
                    //sparky user id von nutzer holen der sich bei sparky mit rz kennung anmeldet
                    commit('setSparkyObject', response);
                    console.log(state.sparkyUserID)
                    console.log(state.sparkyUserObject)
                    dispatch("drupal_api/getSessionToken", { username, password, matrikelnummer }, { root: true })
                }
            })
            .catch((error) => {
                console.log(error)
            });
    },

    /**
    * makes api request to sparky backend, authenticates user, gets user token and saves it in state.
    * TODO: maybe call this function from Login.vue component first and let it call drupal_login when sparky login is successful
    * @param username input from Login.vue
    * @param password input from Login.vue
    */
    async authenticate({ state, commit }, { username, password }) {
        let dynamicUrl = "api/v1/authenticate"
        let fullUrl = baseUrl + dynamicUrl
        let data = await axios.post(
            fullUrl, {
            "username": username,
            "password": password
        },
            {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
            }
        )
            .then(response => {
                if (response.status === 200) {
                    commit('sparkyLogin');
                    state.responsestate = response
                    console.log(response)
                    //dispatch ist hier störend, wenn nur authenticate benötigt wird, vorher mit await dispatch besser gewesen
                    //dispatch('getWhoamI', { username, password })
                }
            })
            .catch((error) => {
                //TODO: delete if not needed
                commit('setAccount', error);
            });
        //console.log(data)
    },

    /**
* makes api request to sparky backend, authenticates user, gets user token and saves it in state.
* @param username input from getWhoamI
* @param password input from getWhoamI
*/
    async registrate({ dispatch }, { username, password, matrikelnummer }) {
        let dynamicUrl = "api/v1/authenticate"
        let fullUrl = baseUrl + dynamicUrl
        let data = await axios.post(
            fullUrl, {
            "username": username,
            "password": password
        },
            {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
            }
        )
            .then(response => {
                if (response.status === 200) {
                    state.responsestate = response
                    console.log(data)
                    console.log(response)
                    //dispatch ist hier störend, wenn nur authenticate benötigt wird, vorher mit await dispatch besser gewesen
                    dispatch('getWhoamI', { username, password, matrikelnummer })
                }
            })
            .catch((error) => {
                console.log(error);
            });
        //console.log(data)
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}