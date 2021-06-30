import axios from 'axios'

const state = () => ({
    user: null,
    session_token: null

})
const actions= {
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
                dispatch('createUser', { username, password, token })
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
    async createUser({ state, dispatch, commit, rootState}, {username, password, token}) {
        await dispatch("sparky_api/getWhoamI", { username, password }, { root: true })
        var sparkyUserobject = rootState.sparky_api.sparkyUserObject
        console.log(username, password)
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
            'name': {'value': 'testname2'},
            'mail': {'value': 'mail2@testmail.com'},
            'pass': {'value': '123456'},
            'field_sparky_id': {'value': 'sparkyid'},
            'field_fullname': {'value': 'max mustermann'},
            'field_matrikelnummer': {'value': '123456'},

        })
        console.log(token)
        console.log(state.session_token)
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/user/register?_format=json',
            headers: {
                'X-CSRF-Token': state.session_token,
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
           
        }).catch(error =>{
            throw new Error(`API ${error}`);
        });          
    },
    


}
const mutations ={

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