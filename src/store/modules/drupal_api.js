import axios from 'axios'

const state = () => ({
    user: null, //TODO Should we name it current_user? Would be more semantically correct
    csrf_token: '', //TODO user individual token is to be used in all subsequent api requests instead of the admin token which is used at the moment
    logout_token: null,
    validCredential: false,
    authToken: null,


})
const actions = {
    //TO DO: Check if a user already exists

    /*1. session token von drupal holen
    2. user json bauen -> mit feldern wie namen, sparky id, matrikelnummer etc
    3. user json mit token an drupal um user zu registrierenn -> response ist user objekt mit uuid, namen, felder etc
    */

    /**
    * gets a session token which is used for subsequent registration of a user
    * calls the mutation SAVE_SESSION_TOKEN after a token was successfully received
    * after that another action createUser is called
    * @param username username the user gives as input in App.vue for registration
    * @param password password the user gives as input in App.vue for registration
    * @param commit commit us used to call a mutation from this function
    * @param state state as parameter for access and manipulation of state data
    * @param dispatch dispatch is used to call another action from this function
    */
    async getSessionToken({ commit, state, dispatch }, { username, password, matrikelnummer }) {

        //eigtl csrf token, nicht sessiontoken
        console.log(state)
        await axios.get('https://clr-backend.x-navi.de/rest/session/token')
            .then((response) => {
                console.log(response.data);
                const token = response.data;
                commit('SAVE_SESSION_TOKEN', token);
                dispatch('createUser', { username, password, matrikelnummer })

            }).catch(error => {
                throw new Error(`API ${error}`);
            });

    },

    /**
    * sends a request to sparky api to get user data, which will be saved in the user account for the registration, via getWhoAmI
    * uses csrf token from getSessionToken()
    * @param username username the user gives as input in App.vue for registration
    * @see {@link getSessionToken}
    * @param password password the user gives as input in App.vue for registration
    * @param state state as parameter for access and manipulation of state data
    * @param dispatch dispatch is used to call another action from this function
    * @param rootState rootState allows access to states of other modules in store
    */
    async createUser({ state, commit, rootState, dispatch }, { username, password, matrikelnummer }) {
        //Todo: uncomment or delete later, after login and registration process is tested thoroughly
        //await dispatch("sparky_api/getWhoamI", { username, password }, { root: true })
        var sparkyUserObject = rootState.sparky_api.sparkyUserObject
        /*         console.log(rootState.sparky_api.sparkyUserID)
                console.log(rootState.sparky_api.sparkyUserObject)
                console.log(username)
                console.log(sparkyUserObject) */
        //console.log(generatedPassword)


        //TODO: Fehlerbehandlung: matrikelnummer ist bei mir null -> dann funzt das alles nicht -> wieso ist null, muss man so einen sonderfall normalerweise beachten
        // TODO: unnötige felder sparky_id, evtl. fullname  entfernen
        // when a user is created his user picture is the same. it can be changed later on with other profiledata
        const data = JSON.stringify({
            'name': { 'value': `${sparkyUserObject.data.username}` },
            //'name': {'value': `${username}`},
            'mail': { 'value': `${sparkyUserObject.data.email}` },
            'pass': { 'value': `${password}` },
            //'field_sparky_id': {'value': `${sparkyUserObject.data.id}`},
            'field_fullname': { 'value': `${sparkyUserObject.data.displayName}` },
            'field_matrikelnummer': { 'value': `${matrikelnummer}` },
            "user_picture": {
                "data": {
                    "type": "file--file",
                    "id": "dc9ea37b-5e91-4450-8d7c-91b8b84b5fad"
                }
            }
            //'field_matrikelnummer': {'value': `12345`},
            //'field_matrikelnummer': {'value': `${sparkyUserObject.data.matrNr}`},
        })
        //TODO: state.csrf_token testen und evtl gegen rootState.drupal_api.csrf_token austauschen
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/user/register?_format=json',
            headers: {
                'X-CSRF-Token': state.csrf_token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log(config)
        axios(config)
            .then((response) => {
                console.log(response.data);
                const user = response.data;
                commit('SAVE_CREATED_USER', user);
                //creates empty profile when user is created
                //test if userdata (user.uid) is saved by SAVE_CREATED_USER before createProfile is called (it needs uid)
                //build auth token
                var creds = username + ":" + password;
                var base64 = btoa(creds);
                let authorization_token = "Basic " + base64;
                dispatch("profile/createProfile", authorization_token, { root: true })
                //TODO: dispatch userdata update profileimage or put in image url in const data above, so it is linked  with the user creation

            }).catch(error => {
                throw new Error(`API ${error}`);
            });
    },

    /**
    * Connects to the Drupal Backend and request a login
    * The Backend will give csrf_token a logout token and a current_user object
    */
    async loginToDrupal({ commit, rootState }, { username, password }) {
        //authenticate with sparky_api at sparky backend is commented out for development purposes. thus testaccounts can be used without the need of real user data
        //TODO: uncomment sparky_api/authenticate to authenticate real users when development is finished
        //maybe change both functions -> sparky_api/authenticate calls loginToDrupal when it is finished, and App/Login.vue calls sparky_api/authenticate first
        //await dispatch("sparky_api/authenticate", { username, password }, { root: true })
        const url = 'https://clr-backend.x-navi.de/user/login?_format=json';
        const data = `{"name": "${username}", "pass": "${password}"}`;
        const config = {
            method: 'post',
            url: url,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            },
            withCredentials: true,
            data: data
        };

        await axios(config)
            .then((response) => {
                console.log(rootState.sparky_api.sparkylogin)
                commit('SAVE_LOGIN_USER', response.data);
                //console.log(response.data.csrf_token);
                //console.log(response.data.current_user);
                //console.log(response.data.logout_token);   
            })
            .catch((error) => {
                console.log(error)
            });
    },

    async loadTokensfromSessionStorage({ commit }) {

        commit('LOAD_TOKEN_SESSION_STORAGE')
    },


    /**
* Connects to the Drupal Backend and request a login
* The Backend will give csrf_token a logout token and a current_user object
*/
    async logoutDrupal({ commit, rootState }) {
        console.log(rootState.drupal_api.csrf_token)
        console.log(rootState.drupal_api.logout_token)
        console.log(state.logout_token)
        console.log(rootState.drupal_api.authToken)
        const url = `https://clr-backend.x-navi.de/user/logout?_format=json&token=${rootState.drupal_api.logout_token}`;
        const config = {
            method: 'post',
            url: url,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,


            },
            withCredentials: true
        };

        await axios(config).then(
            (response) => {
                console.log(response)
                //console.log(response.data.csrf_token);
                //console.log(response.data.current_user);
                //console.log(response.data.logout_token);
                commit('REMOVE_SESSIONTOKENS_OF_USER')


            }
        ).catch((error) => {
            state.validCredential = false;
            console.log(error)
        });
    },

    saveBasicAuth({ commit }, authorization_token) {

        commit('SAVE_BASIC_AUTH_TOKEN', authorization_token)

    }


}
const mutations = {

    SAVE_BASIC_AUTH_TOKEN(state, authorization_token) {
        sessionStorage.setItem("auth_token", authorization_token);
        state.authToken = authorization_token
    },

    /**
    * gets the token from action and puts it in state 
    * @param token token from
    * @param state state as parameter for access and manipulation of state data
    */
    SAVE_SESSION_TOKEN(state, token) {
        state.csrf_token = token
        //console.log(state.csrf_token)
    },

    /**
    * gets user object from action and puts it in state
    * @param user
    * @param state state as parameter for access and manipulation of state data
    */
    SAVE_CREATED_USER(state, user) {
        state.user = user
        /*         console.log("jetzt csrf und user")
                console.log(state.user)
                console.log(state.csrf_token) */
    },

    /**
    * gets the csrf_token, user object and loguttoken from action 
    * and puts it in 3 state objects and in sessionstorage
    * @param {*} state 
    * @param {*} login_data 
    */
    SAVE_LOGIN_USER(state, login_data) {
        sessionStorage.setItem("csrf_token", login_data.csrf_token);
        sessionStorage.setItem("logout_token", login_data.logout_token);
        sessionStorage.setItem("valid_credentials", "true");
        sessionStorage.setItem('current_user', JSON.stringify(login_data.current_user));
        //sessionStorage.setItem("current_user", login_data.current_user);
        state.csrf_token = login_data.csrf_token;
        state.user = login_data.current_user;
        state.logout_token = login_data.logout_token;
        /* console.log(state.csrf_token)
        console.log(state.user)
        console.log(state.logout_token) */
        state.validCredential = true;

    },

    /**
* loads csrf_token, logout_token and autthentication token from session storage, so a user is still logged in after refreshing the site
* is called on mounted lifecycle hook from App.vue so it is alwas loaded when the site is refreshed
* @param {*} state 
*/
    LOAD_TOKEN_SESSION_STORAGE(state) {
        if (sessionStorage.getItem("valid_credentials") == "true") {
            state.validCredential = true;
            state.csrf_token = sessionStorage.getItem("csrf_token");
            state.logout_token = sessionStorage.getItem("logout_token");
            state.authToken = sessionStorage.getItem("auth_token");
            state.user = JSON.parse(sessionStorage.getItem('current_user'));
            /*  console.log(state.user)
             console.log(JSON.parse(sessionStorage.getItem('current_user'))) */
            //state.user= sessionStorage.getItem("current_user");

        }
        // return true

    },


    /**
* deletes csrf_token, logout_token and autthentication token from session storage
* @param {*} state 
*/
    REMOVE_SESSIONTOKENS_OF_USER(state) {
        state.validCredential = false;
        sessionStorage.removeItem("csrf_token");
        sessionStorage.removeItem("logout_token");
        sessionStorage.removeItem("valid_credentials");
        sessionStorage.removeItem("current_user");
        sessionStorage.removeItem("auth_token");


    },

}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}