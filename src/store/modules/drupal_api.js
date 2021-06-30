import axios from 'axios'

const state = () => ({
    user: null, //TODO Should we name it current_user? Would be more semantically correct
    session_token: null,
    csrf_token: '', //TODO session token should be eliminated
    logout_token: null

})
const actions= {

    /**
     * This is just an example to show how you can get a resource e.g. projects 
     * which is related to a user 
     * @param {} param0 
     */
    //TODO Maybe we should put this in the project store module 
    async getResourceFilteredByUsername() {
        const username = 'foo3bar'; //now if you use the login you can get the username from the store
        const url = `https://clr-backend.x-navi.de/jsonapi/node/projekt?filter[uid.name][value]=${username}`;

        const config = {
            method: 'get',
            url: url,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
            }
        };

        await axios(config).then(
            (response) => {
                const data = response.data.data;
                console.log(data);
                //TODO Here you should now implement the mutation for the state etc.
            }
        )
    },

    /**
     * Connects to the Drupal Backend and request a login
     * The Backend will give csrf_token a logout token and a current_user object
     */
    async loginToDrupal({commit},{username, password}) {
        const url = 'https://clr-backend.x-navi.de/user/login?_format=json';
        const data = `{"name": "${username}", "pass": "${password}"}`;
        const config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type':'application/json'
            },
            data: data
        };

        await axios(config).then(
            (response) => {
                //console.log(response.data.csrf_token);
                //console.log(response.data.current_user);
                //console.log(response.data.logout_token);
            
                commit('SAVE_LOGIN_USER', response.data);
            }
        ).catch((error) => {
            console.log(error)
        });
    },
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
    async getSessionToken({commit, state, dispatch}, { username, password }) {
        console.log(state)
        await  axios.get('https://clr-backend.x-navi.de/rest/session/token')
            .then((response) => {
                console.log(response.data);
                const token = response.data;
                commit('SAVE_SESSION_TOKEN', token);
                dispatch('createUser', { username, password })
            }).catch(error =>{
                throw new Error(`API ${error}`);
            });         
            
    },

    /**
    * sends a request to sparky api to get user data, which will be saved in the user account for the registration, via getWhoAmI
    * @param username username the user gives as input in App.vue for registration
    * @param password password the user gives as input in App.vue for registration
    * @param state state as parameter for access and manipulation of state data
    * @param dispatch dispatch is used to call another action from this function
    * @param rootState rootState allows access to states of other modules in store
    */
    async createUser({ state, dispatch, rootState},{ username, password }) {
        await dispatch("sparky_api/getWhoamI", { username, password }, { root: true })
        var sparkyUserobject = rootState.sparky_api.sparkyUserObject
        console.log(sparkyUserobject)

/* 
TODO: look up which attributes of sparkyuserobject are needed and put in user data dynamically, when sparky backend is not down again
        const data = JSON.stringify ({ 
            'name': {'value': `${sparkyUserobject.user}`},
            'mail': {'value': `${sparkyUserobject.user}`},
            'pass': {'value': `${sparkyUserobject.user}`},
            'field_sparky_id': {'value': `${sparkyUserobject.user}`},
            'field_fullname': {'value': `${sparkyUserobject.user}`},
            'field_matrikelnummer': {'value': `${sparkyUserobject.user}`},
            //'roles': {'value': 'sparkyid'}

        })
 */
        
        const data = JSON.stringify ({ 
            'name': {'value': 'testname'},
            'mail': {'value': 'mail@testmail.com'},
            'pass': {'value': '1234'},
            'field_sparky_id': {'value': 'sparkyid'},
            'field_fullname': {'value': 'max mustermann'},
            'field_matrikelnummer': {'value': '123456'},
            //'roles': {'value': 'sparkyid'}

        })
        console.log(state)
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/user/register?_format=json',
            headers: {
                'X-CSRF-Token': 'km9x0Dj73SxPmewhVM8dd1He-zDrdDnlFDAkshme8f8',
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log(config)
/*         axios(config)
        .then((response) => {
            console.log(response.data);
            const user = response.data;
            commit('SAVE_CREATED_USER', user);
           
        }).catch(error =>{
            throw new Error(`API ${error}`);
        });   */           
    },
    


}
const mutations ={

    /**
     * gets the csrf_token, user object and loguttoken from action 
     * and puts it in the state object
     * @param {*} state 
     * @param {*} token 
     */
    SAVE_LOGIN_USER(state, login_data) {
        state.csrf_token = login_data.csrf_token;
        state.user = login_data.current_user;
        state.logout_token = login_data.logout_token;

    },


    /**
    * gets the token from action and puts it in state 
    * @param token token from
    * @param state state as parameter for access and manipulation of state data
    */
    SAVE_SESSION_TOKEN(state, token) {
        state.session_token=token
        console.log(state.session_token)
    },

    /**
    * gets user object from action and puts it in state
    * @param user
    * @param state state as parameter for access and manipulation of state data
    */
    SAVE_CREATED_USER(state, user) {
        state.user=user
        console.log(state.user)
    },

}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}