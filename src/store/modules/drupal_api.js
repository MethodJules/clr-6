import axios from "@/config/custom_axios";
import router from '../../router';
import emailjs from "emailjs-com";

const state = () => ({
    user: null, //TODO Should we name it current_user? Would be more semantically correct
    csrf_token: null,
    logout_token: null,
    validCredential: false,
    authToken: null,
    isLecturer: false,


})

const getters = {


    getUserRole(state) {
        return state.user.role;
    },
    getCurrentUserInternalUID(state) {
        return state.user.uid;
    },
}
const actions = {

    /**
    * gets a session token (csrf) which is used for subsequent registration of a user
    * calls the mutation SAVE_SESSION_TOKEN after a token was successfully received to save it in state
    * after that another action createUser is called, which creates the user
    * @param username username the user gives as input in App.vue for registration
    * @param password password the user gives as input in App.vue for registration
    * @param matrikelnummer matrikelnummer students give as input in App.vue for registration
    * @param commit commit is used to call a mutation from this function
    * @param dispatch dispatch is used to call another action from this function
    */
    async getSessionToken({ commit, dispatch }, { username, password, matrikelnummer }) {

        //eigtl csrf token, nicht sessiontoken
        return axios.get('rest/session/token')
            .then((response) => {
                const token = response.data;
                commit('SAVE_SESSION_TOKEN', token);
                dispatch('createUser', { username, password, matrikelnummer })
            }).catch(error => {
                //console.log(error)
                alert("Dein Benutzerkonto konnte leider nicht erstellt werden. Wenn dieses Problem bestehen bleiben sollte, wende dich an deinen betreuenden Dozenten oder schreibe eine Email an stadtlaender@uni-hildesheim.de")
            });
    },

    /**
    * registers a user at the Drupal Backend
    * uses csrf token from getSessionToken()
    * @param username username the user gives as input in App.vue for registration
    * @param password password the user gives as input in App.vue for registration
    * @param state state as parameter for access and manipulation of state data
    * @param dispatch dispatch is used to call another action from this function
    * @param rootState rootState allows access to states of other modules in store
    */
    async createUser({ state, commit, rootState, dispatch }, { username, password, matrikelnummer }) {
        //Todo: uncomment or delete later, after login and registration process is tested thoroughly
        //await dispatch("sparky_api/getWhoamI", { username, password }, { root: true })
        var sparkyUserObject = rootState.sparky_api.sparkyUserObject
        // when a user is created his user picture is the same. it can be changed later on with other profiledata
        //the same user picture is used for all new accounts. it is linked to, directly from the backend
        const data = JSON.stringify({
            'name': { 'value': `${sparkyUserObject.data.username}` },
            'mail': { 'value': `${sparkyUserObject.data.email}` },
            'pass': { 'value': `${password}` },
            'field_fullname': { 'value': `${sparkyUserObject.data.displayName}` },
            'field_matrikelnummer': { 'value': `${matrikelnummer}` },
        })
        var config = {
            method: 'post',
            url: 'user/register?_format=json',
            headers: {
                'X-CSRF-Token': state.csrf_token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios(config)
            .then((response) => {
                const user = response.data;
                commit('SAVE_CREATED_USER', user);
                //creates empty profile when user is created
                //build auth token
                var creds = username + ":" + password;
                var base64 = btoa(creds);
                let authorization_token = "Basic " + base64;
                if (state.isLecturer) {
                    dispatch('sendEmail')
                }
                dispatch("profile/createProfile", authorization_token, { root: true })
                //TODO: call dispatch for loaduserdata to get user uuid -> create profil with user uuid and make a relatinoship field in backend
                //TODO: then use useruuid for loading profile from backend -> then loadprofiledata can use the user uuid to get the profile
                //TODO: -> with different uuids from group members and admins profiles can be filtered and shown. - atm it is done with uids
                //TODO: do it like this: first createuser.then so here -> dispatch(loaduserdata).then(here call createprofile) <- this is still here in function
                //TODO: dispatch userdata update profileimage or put in image url in const data above, so it is linked  with the user creation

            }).catch(error => {
                alert("Dein Benutzerkonto konnte leider nicht erstellt werden. Möglicherweise hast du dich bereits regisrtiert. Wenn dieses Problem bestehen bleiben sollte, wende dich an deinen betreuenden Dozenten oder schreibe eine Email an stadtlaender@uni-hildesheim.de")

            });
    },


    /**
    * sends an email to the "superdozent" if the registering user is a lecturer and asks for the role "lecturer"
    * email template can be configured at email.js. IDs used below are also found there 
    * @param rootState rootState allows access to states of other modules in store
    */
    sendEmail({ rootState }) {
        var sparkyUserObject = rootState.sparky_api.sparkyUserObject
        var templateParams = {
            name: sparkyUserObject.data.username,
            email: sparkyUserObject.data.email,
        };
        emailjs
            .send(
                "service_1h8ohmh", //SERVICE_ID
                "template_8ala1li", //TEMPLATE_ID
                templateParams,
                "user_sECTHBIy6LTneEfcljkg9" //USER_ID
            )
            .then(
                (result) => {
                    alert(
                        "Eine automatische Nachricht an stadtlaender@uni-hildesheim.de wurde versendet. Deine Rollenberechtigungen werden bald freigeschaltet. Bitte warte auf eine entsprechende Bestätigung bevor du dich einloggst"
                    );
                },
                (error) => {
                    alert(
                        "Es konnte keine automatische Nachricht an stadtlaender@uni-hildesheim.de versendet werden. Bitte schreibe eine Email an die genannte Email-Adresse und bitte um eine Freischaltung deiner Rollenberechtigung als Dozent"
                    );
                }
            );
    },

    /**
    * Connects to the Drupal Backend and request a login
    * when successfull SAVE_LOGIN_USER is called and user is taken to his main/starting page. the Backend response includes csrf_token, logout token and an object with current_user data
    * not successfull attempts alert the user with appropriate error messages
    * @param username username the user gives as input in App.vue for registration
    * @param password password the user gives as input in App.vue for registration
    * @param commit commit is used to call a mutation from this function
    * @param dispatch dispatch is used to call another action from this function
    */
    async loginToDrupal({ commit, dispatch }, { username, password }) {
        //authenticate with sparky_api at sparky backend is commented out for development purposes. thus testaccounts can be used without the need of real user data
        //TODO: uncomment sparky_api/authenticate to authenticate real users when development is finished or test accounts which work with sparkyservice can be used
        //await dispatch("sparky_api/authenticate", { username, password }, { root: true })
        const data = `{"name": "${username}", "pass": "${password}"}`;
        const config = {
            method: 'post',
            url: 'user/login?_format=json',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            },
            withCredentials: true,
            data: data
        };

        await axios(config)
            .then((response) => {
                commit('SAVE_LOGIN_USER', response.data);
                router.push("/");
            })
            .catch((error) => {
                //if the user was authorized by the SparkyService (this must be true if this method was called) and could not be authorized, and status is x -> this must mean he has not registered at the backend
                if (error.response.status == 400) {
                    alert("Du konntest nicht authentifiziert werden. Registriere dich bitte, falls dies nicht bereits geschehen ist.")
                    //console.log(error.response.data.message)
                }
                //error 403 -> requested resource is forbidden for user(role) user who logs in should be either lecturer or student. if one of those tries to log in (uses log in resource), while already logged in 
                //-> user cant get the user data in state so frontend "thinks" he is logged in, but he is logged in at the backend via a cookie
                //cookie is only seen in web storage, while at the drupal backend site (https://clr-backend.x-navi.de/) but cant be seen while on frontend site.
                //user could be authenticated automatically, when this error message comes, but this might be too insecure (there might be some other cases where this error could happen)
                //a logout button which could appear at the login page appears to be not possible as well. because csrf token and logout token are missing
                //therefore the user receives a message, which tells him to log out manually at the backend
                else if (error.response.status == 403) {
                    alert("Du konntest nicht authentifiziert werden. Bitte logge dich das nächste mal aus, bevor du die Seite verlässt, um diesen Fehler zu vermeiden. Versuche nun dich erneut einzuloggen. ")
                    dispatch('logoutDrupal')
                    //console.log(error.response.data.message)
                }
                //if the user gets another status, it most likely means there is an error on the backend side -> the user is informed of contact emails for further help
                else {
                    alert("Die Authentifizierung mit dem Backend ist leider fehlgeschlagen. Wenn dieses Problem bestehen bleiben sollte, wende dich an deinen betreuenden Dozenten oder schreibe eine Email an stadtlaender@uni-hildesheim.de")
                    //console.log(error.response.data.message)
                }

            });
    },

    /**
* when refreshing the site all data in the state would be lost. But if a user has already logged in (in this session) the variable "valid_credentials" with value "true" is still stored in the sessionStorage.  if this value is true, all necessary tokens are loaded from session- and localstorage and the user is navigated to the main/starting page
*Thus the user can refresh the page without having to log in again. is called in mainpage.vue
* @param commit commit is used to call a mutation from this function
*/
    async loadTokensfromSessionStorage({ commit }) {
        if (sessionStorage.getItem("valid_credentials") == "true") {
            await commit('LOAD_TOKEN_SESSION_STORAGE');
            //await dispatch('loadUserFromBackend');
            await router.push("/")
        } else {
            router.push("/Login");
            return false
        }
    },



    /**
* logs a user out with csrf_token and logout_token. if a user has left the site/closed the tab those tokens are taken from localstorage to ensure the user can log out.
* then all tokens are removed from local/sessionstorage and user is taken to login page
    * @param state state as parameter for access and manipulation of state data
    * @param commit commit is used to call a mutation from this function
    * @param rootState rootState allows access to states of other modules in store
*/
    async logoutDrupal({ state, commit, rootState }) {
        //if the state is empty (because user closed the site/tab completely) the localstorage tokens will be used instead
        if (rootState.drupal_api.csrf_token == null || rootState.drupal_api.logout_token == null) {
            state.csrf_token = localStorage.getItem("csrf_token");
            state.logout_token = localStorage.getItem("logout_token");
        }
        const config = {
            method: 'post',
            url: `user/logout?_format=json&token=${rootState.drupal_api.logout_token}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
            },
            withCredentials: true
        };

        await axios(config).then(
            (response) => {
                commit('REMOVE_SESSIONTOKENS_OF_USER')
                router.push('login')
            }
        ).catch((error) => {
            //error 403 -> requested resource is forbidden for user(role) user who logs out should be either lecturer or student and logged in. if one of those tries to log out (uses log out resource), while already logged out 
            //-> frontend "thinks" user is logged in, but he is already logged out at the backend i.e. cookie is deleted
            if (error.response.status == 403) {
                alert("Der Session Cookie ist wahrscheinlich abgelaufen bzw. bist du bereits vom Backend abgemeldet. Refreshe die Seite und logge dich erneut ein, um den Fehler zu beheben. Sollte dieser Fehler bestehen bleiben, wende dich an deinen betreuenden Dozenten oder schreibe eine Email an stadtlaender@uni-hildesheim.de ")
                commit('REMOVE_SESSIONTOKENS_OF_USER')
                state.validCredential = false;
            }
        });
    },
    /**
     * calls mutation which saves basic authorization token for later access in state
    * @param commit commit is used to call a mutation from this function
    * @param authorization_token token which is to be saved in state
*/
    saveBasicAuth({ commit }, authorization_token) {
        commit('SAVE_BASIC_AUTH_TOKEN', authorization_token)

    }
}
const mutations = {

    /**
     * if a user (lecturer) checks/unchecks the checkbox while registering, this mutation saves value in state
    * @param state state as parameter for access and manipulation of state data
*/
    SET_IS_LECTURER(state) {
        state.isLecturer = !state.isLecturer
    },

    /**
     * saves basic authorization token in state and in sessionstorage
    * @param state state as parameter for access and manipulation of state data
    * @param authorization_token token which is to be saved in state
*/
    SAVE_BASIC_AUTH_TOKEN(state, authorization_token) {
        sessionStorage.setItem("auth_token", authorization_token);
        state.authToken = authorization_token
    },

    /**
    * gets the token from action and puts it in state 
    * @param token session/csrf token
    * @param state state as parameter for access and manipulation of state data
    */
    SAVE_SESSION_TOKEN(state, token) {
        state.csrf_token = token
    },

    /**
    * gets user object from action and puts it in state
    * @param user user object gotten after user was registered and created
    * @param state state as parameter for access and manipulation of state data
    */
    SAVE_CREATED_USER(state, user) {
        //fullname, matrikelnummer, user_picture, concept_maps, name (displayname) auch verfügbar
        state.user = { uid: user.uid[0].value, username: user.field_fullname[0].value, uuid: user.uuid[0].value }
    },

    /**
    * gets csrf_token, user object and loguttoken from action 
    * and puts it in 3 state objects and in sessionstorage
    * @param state state as parameter for access and manipulation of state data
    * @param login_data object with all response data from drupal backend after login
    */
    SAVE_LOGIN_USER(state, login_data) {

        //from access_token
        const fullname = login_data.access_token.fullname
        const uuid = login_data.access_token.uuid
        const mail = login_data.access_token.mail
        const matrikelnummer = login_data.access_token.matrikelnumber

        //only gets second role from roles array which is either student or dozent - first role is authenticated user
        //for both array entries [authenticated, student/dozent]
        //const roles=login_data.access_token.roles
        const role = login_data.access_token.roles[1]

        // from current_user
        const display_name = login_data.current_user.name
        const uid = login_data.current_user.uid
        let current_user = { fullname: fullname, uuid: uuid, mail: mail, matrikelnummer: matrikelnummer, role: role, displayname: display_name, uid: uid }

        localStorage.setItem("csrf_token", login_data.csrf_token);
        localStorage.setItem("logout_token", login_data.logout_token);
        sessionStorage.setItem("valid_credentials", "true");
        sessionStorage.setItem('current_user', JSON.stringify(current_user));

        state.csrf_token = login_data.csrf_token;
        state.user = current_user
        state.logout_token = login_data.logout_token;
        state.validCredential = true;
    },

    /**
* loads csrf_token, logout_token and autthentication token from session storage, so a user is still logged in after refreshing the site
* action loadTokensfromSessionStorage which calls this mutation is called on mounted lifecycle hook from Mainpage.vue so it is alwas loaded when the site is refreshed
    * @param state state as parameter for access and manipulation of state data
*/
    LOAD_TOKEN_SESSION_STORAGE(state) {
        if (sessionStorage.getItem("valid_credentials") == "true") {
            state.validCredential = true;
            state.csrf_token = localStorage.getItem("csrf_token");
            state.logout_token = localStorage.getItem("logout_token");
            state.authToken = sessionStorage.getItem("auth_token");
            state.user = JSON.parse(sessionStorage.getItem('current_user'));
        }
    },
    /**
* deletes csrf_token, logout_token and autthentication token from session storage, happens when user logs out
    * @param state state as parameter for access and manipulation of state data
*/
    REMOVE_SESSIONTOKENS_OF_USER(state) {
        state.validCredential = false;
        localStorage.removeItem("csrf_token");
        localStorage.removeItem("logout_token");
        sessionStorage.removeItem("valid_credentials");
        sessionStorage.removeItem("current_user");
        sessionStorage.removeItem("auth_token");
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}