import axios from 'axios';
const baseUrl = "http://147.172.178.30:8080/"

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
});

const mutations = {
  
    
    dummyCredential(state) {

            state.validCredential = true
        
    },

    setAccount(state, account) {
        console.log(account)
        console.log("account")
        console.log(account.data.token.token)
        state.token=account.data.token.token
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
        if (account.status == 200) {
            state.validCredential = true
        }
        
    },

    whoami(state, account){

        let data = axios.get(
            "http://147.172.178.30:3000/auth/whoAmI",
            {
                headers: {
                     'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + account.data.token.token,
                },

                }
            )
            .then(response => {
                if (response.status === 200) {
                    console.log("hallo")
                    console.log(response)
                    state.sparkyUserID= response.data.id
                    console.log(state.sparkyUserID)
                }
              })
              .catch((error) => {
                  console.log(error)
              });
              console.log(data)

        
        //mit der ID daten aus clr backend laden - bzw gucken ob person im backend ist
        // dann falls person nicht existiert im clr backend anlegen - sparky id speichern + weitere infos wie matrikelnummer, name etc
        //dann id bei erstellung abgreifen oder nun person nochmal laden
        //=> dann mit id die routen etc auswählen
        

        
    },

    getUser(){
        //TO DO: dsad
        console.log("getUser")
    }
};

const actions = {
/*     async signin({commit, dispatch}, {username, password}) {
        await dispatch('getWhoamI', {username, password})
       
    },
 */
    async getWhoamI ({commit, dispatch }, {username, password}) {
        await dispatch('authenticate', {username, password})
        console.log(commit)
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
                    console.log("hallo")
                    console.log(response)
                    state.sparkyUserID= response.data.id
                    state.sparkyUserObject=response
                    console.log(state.sparkyUserID)

                }
              })
              .catch((error) => {
                  console.log(error)
              });
    },

async authenticate ({commit }, {username, password}) {
// authentifiziert bei sparky

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
            )              
            .then(response => {
                if (response.status === 200) {
                    commit('setAccount', response);
                    state.responsestate=response


//nächste axios call hier um user id zu erhalten





                }
              })
              .catch((error) => {
                commit('setAccount', error);
              });
              console.log(data)
        
        
      },

      async login({commit, dispatch}, {username, password}) {
        //dispatch('/project/loadProjectsFromBackend', null, { root: true })
        await dispatch('getWhoamI', {username, password})
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
            .then(function(response){
                console.log(response)
                 //console.log(response.data.data[2].attributes.field_sparky_id)
                console.log("jetzt sparkyID")
                //state.sparkyUserID="6ee6aa71-5e18-4db5-b91f-f3faedf5bcb2"
                console.log(state.sparkyUserID)
                for(var user of response.data.data){
                    //console.log(user.attributes.field_sparky_id)
                    if(user.attributes.field_sparky_id==state.sparkyUserID){
                          console.log(user.attributes.field_fullname)
                    console.log("user daten holen und einloggen")

                    //was wird bei relationship types gespeichert? UID oder lange ID?
                    //längere ID
                    state.drupalUserID=user.id
                    state.drupalUserObject=user
                    dispatch("project/loadProjectsFromBackend", null, { root: true })

                    //das ist drupalinterne UID
                    //state.druoalUserID=user.attributes.drupal_internal__uid
                    }
                  

                }


            })
            .catch(function(error) {
                console.log(error)
            })

    },

    login2({commit, state, dispatch}){
        


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
            .then(function(response){
                console.log(response)
                 //console.log(response.data.data[2].attributes.field_sparky_id)
                console.log("jetzt sparkyID")
                state.sparkyUserID= "6ee6aa71-5e18-4db5-b91f-f3faedf5bcb2"
                //state.sparkyUserID="6ee6aa71-5e18-4db5-b91f-f3faedf5bcb2"
                console.log(state.sparkyUserID)
                for(var user of response.data.data){
                    //console.log(user.attributes.field_sparky_id)
                    if(user.attributes.field_sparky_id==state.sparkyUserID){
                    console.log(user.attributes.field_fullname)
                    console.log("user daten holen und einloggen")
                    state.validCredential = true

                    //was wird bei relationship types gespeichert? UID oder lange ID?
                    //längere ID
                    state.drupalUserID=user.id
                    state.drupalUserObject=user
                    dispatch("project/loadProjectsFromBackend", null, { root: true })

                    //das ist drupalinterne UID
                    //state.druoalUserID=user.attributes.drupal_internal__uid
                    }
                    commit('dummyCredential');

                }


            })
            .catch(function(error) {
                console.log(error)
            })
    }



};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}