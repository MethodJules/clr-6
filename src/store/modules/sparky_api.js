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
});

const mutations = {

        /**
 * validcredential= true allows the user to login and see the real website
*/
    dummyCredential(state) {

        state.validCredential = true

    },

    setAccount(state, account) {

        state.token = account.data.token.token
        if (account.status == 200) {
            state.validCredential = true
        }
    },
};

const actions = {

    /**
* waits for getWhoamI to finish getting user data from sparky backend. Then makes an api request to clr backend and gets project data of the user with the dispatch to project.js
* @param username username the user gives as input in App.vue
* @param password password the user gives as input in App.vue
*/
    async login({ commit, dispatch }, { username, password }) {
        await dispatch('getWhoamI', { username, password })
        console.log(commit)
        var config = {
            method: 'get',
            url: 'https://clr-backend.x-navi.de/jsonapi/user/user',
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
    * fake Login that skips the request to sparky api, for development purposes
    */
    fakeLogin({ commit, state, dispatch }) {
        console.log(commit)
        var config = {
            method: 'get',
            url: 'https://clr-backend.x-navi.de/jsonapi/user/user',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
            },
        };
        axios(config)
            .then(function (response) {
                console.log("Fake login response")
                console.log(response)
                state.sparkyUserID = "6ee6aa71-5e18-4db5-b91f-f3faedf5bcb2"
                for (var user of response.data.data) {
                    //console.log(user.attributes.field_sparky_id)
                    if (user.attributes.field_sparky_id == state.sparkyUserID) {
                        console.log("user daten holen und einloggen")
                        state.validCredential = true
                        state.drupalUserID = user.id
                        state.drupalUserObject = user
                        dispatch("project/loadProjectsFromBackend", null, { root: true })
                        //das ist drupalinterne UID
                        //state.druoalUserID=user.attributes.drupal_internal__uid

                        //map nimmt das array aus response.data.data und macht ein neues array nur mit id und name der person später könnte man hier filtern, wenn das nicht zuvor mit json filter gemacht wurde
                        console.log(response.data.data)
                        const users = response.data.data.map((user) =>{
                            return {id: user.id, user:user.attributes.display_name}
                        })
                        state.lecturers=users
                        console.log(state.lecturers)
                        const users2 = response.data.data.map((user) =>{
                            return user.attributes.field_fullname
                        })
                        state.lecturers2=users2
                        console.log(state.lecturers2)

                    }
                    commit('dummyCredential');
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    },

    /**
    * waits for authenticate to finish authenticating with sparky backend. Then makes another api request to sparky backend and gets user data.
    * @param username input from login
    * @param password input from login
    */
    async getWhoamI({dispatch }, { username, password }) {
        console.log("hallo")
        await dispatch('authenticate', { username, password })
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
                    state.sparkyUserID = response.data.id
                    state.sparkyUserObject = response
                    console.log(state.sparkyUserID)
                    console.log("Who am I")
                    console.log(response)

                }
            })
            .catch((error) => {
                console.log(error)
            });
    },

    /**
    * makes api request to sparky backend, authenticates user, gets user token and saves it in state.
    * @param username input from getWhoamI
    * @param password input from getWhoamI
    */
    async authenticate({ commit }, { username, password }) {
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
                    //commit('setAccount', response);
                    state.responsestate = response
                    console.log(data)
                }
            })
            .catch((error) => {
                commit('setAccount', error);
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