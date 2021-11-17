import axios from "@/config/sparky_axios";


//TO DO: Coments
const state = () => ({
    account: null,
    validCredential: false,
    token: "",
    sparkyUserID: "",
    //ganzes Object nötig?
    sparkyUserObject: null,
    responsestate: null,
    //ganzes Object nötig?
    sparkylogin: false,
});

const mutations = {

    setAccount(state, account) {

        console.log(account)

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
    async getWhoamI({ dispatch, commit, state }, { username, password, matrikelnummer, token }) {
        console.log(token)
        //state.sparkyUserID = " response.data.id"
        axios.get(
            "stmgmt/auth/whoAmI",
            {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
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
                alert("Die Authentifizierung mit dem SparkyService ist leider fehlgeschlagen. Wenn dieses Problem bestehen bleibt, wende dich an deinen betreuenden Dozenten oder schreibe eine Email an stadtlaender@uni-hildesheim.de")

            });
    },

    /**
    * makes api request to sparky backend, authenticates user, gets user token and saves it in state.
    * TODO: maybe call this function from Login.vue component first and let it call drupal_login when sparky login is successful
    * @param username input from Login.vue
    * @param password input from Login.vue
    */
    async authenticate({ state, commit, rootState, dispatch }, { username, password }) {
        // console.log(username + password)
        let data = await axios.post(
            "api/v1/authenticate", {
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
                    dispatch("drupal_api/loginToDrupal", { username, password }, { root: true })
                    state.responsestate = response
                    console.log(response)
                    //dispatch ist hier störend, wenn nur authenticate benötigt wird, vorher mit await dispatch besser gewesen
                    //dispatch('getWhoamI', { username, password })
                }
            })
            .catch((error) => {
                //if there is an error, we check, if the error status is 401 which means the user is not authorized
                //if the error code is something else, we presume the SparkyService might not be functioning correctly, thus another error message with contact details is given
                //if not authorized
                console.log(error)
                if (error.response.status == 401) {
                    alert("Du konntest nicht authorisiert werden. Bitte gib deine korrekte Rechenzentrumskennung ein")
                } else {
                    alert("Die Authentifizierung mit dem SparkyService ist leider fehlgeschlagen. Wenn dieses Problem bestehen bleibt, wende dich an deinen betreuenden Dozenten oder schreibe eine Email an stadtlaender@uni-hildesheim.de")
                }
            });
        //console.log(data)
    },

    /**
* makes api request to sparky backend, authenticates user, gets user token and saves it in state.
* @param username input from getWhoamI
* @param password input from getWhoamI
*/
    async registrate({ dispatch, commit }, { username, password, matrikelnummer }) {
        let data = await axios.post(
            "api/v1/authenticate", {
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
                    const token = response.data.token.token
                    //dispatch ist hier störend, wenn nur authenticate benötigt wird, vorher mit await dispatch besser gewesen
                    dispatch('getWhoamI', { username, password, matrikelnummer, token })
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status == 401) {
                    alert("Du konntest nicht authorisiert werden. Bitte gib deine korrekte Rechenzentrumskennung ein")
                } else {
                    alert("Die Authentifizierung mit dem SparkyService ist leider fehlgeschlagen. Wenn dieses Problem bestehen bleibt, wende dich an deinen betreuenden Dozenten oder schreibe eine Email an stadtlaender@uni-hildesheim.de")
                }
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