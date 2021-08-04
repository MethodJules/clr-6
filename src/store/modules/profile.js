import axios from 'axios';

const state = () => ({
   
    profileData: {} ,
    userData: {}

})

const actions = {

    async loadUserFromBackend({commit, state, rootState}) {
        console.log(state)
        console.log("hallo")
        console.log(rootState.sparky_api.sparkyUserID)
        var drupalUserUID = rootState.drupal_api.user.uid
        console.log(rootState.sparky_api.drupalUserID)
        console.log(drupalUserUID)


        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/jsonapi/user/user?filter[drupal_internal__uid]=${drupalUserUID}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };

        axios(config)
            .then(function(response){
                console.log(response)
                console.log(response);
                console.log("es lfniosdn") 
                console.log(rootState.sparky_api.validCredential)
                console.log(rootState.sparky_api.drupalUserID) 
                const profiles = response.data.data;
                commit('SAVE_USER', {profiles});

            })
            .catch(function(error) {
                console.log(error)
            })
    
            
    },

   
    async loadProfileFromBackend({commit, state, rootState}) {
        console.log(state)
        var drupalUserUID = rootState.drupal_api.user.uid

        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/jsonapi/node/profil?filter[field_user_uid]=${drupalUserUID}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };

        axios(config)
            .then(function(response){
                console.log(response)
                console.log(response);
                console.log("es lfniosdn") 
                console.log(rootState.sparky_api.validCredential)
                console.log(rootState.sparky_api.drupalUserID) 
                const profiles = response.data.data;
                commit('SAVE_PROFILE', {profiles});

            })
            .catch(function(error) {
                console.log(error)
            })
            
                       
    }, 

    createProfile({commit, state, rootState}, profile) {

        console.log(state)

        var title = "Profil"
        var data = `{
            "data": {
                "type": "node--profil", 
                "attributes": {
                    "title": "${title}", 
                    "field_studiengang": "${profile.studiengang}", 
                    "field_anzahl_literaturreviews": "${profile.anzahl_literaturreviews}", 
                    "field_datenbanken": "${profile.datenbanken}", 
                    "field_referenztool": "${profile.referenztool}", 
                    "field_analysetool": "${profile.analysetool}", 
                },
                "relationships": {
                    "field_profilbild": {
                        "data": {
                            "type": "file--file", 
                            "id": "6bf272a4-eac9-4c67-84b6-b7ea275b3155" 
                        }
                    }
                } 
            }
        }`;

        var config = {
            method: 'post',
            url: `https://clr-backend.x-navi.de/jsonapi/node/profil`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
            data: data
        };

        axios(config)
        .then(function(response){
            console.log(response)
            console.log(response);
            console.log("es lfniosdn") 
            console.log(rootState.sparky_api.validCredential)
            console.log(rootState.sparky_api.drupalUserID) 
            commit(data);

        })
        .catch(function(error) {
            console.log(error)
        })


    },




    updateProfile({commit, state, rootState}, profile) {

        console.log(state)


        let index = state.profileData.indexOf(profile);
        state.profileData[index]=profile;
        var data = `{
            "data": {
                "type": "node--profil", 
                "id": "${profile.idd}",
                "attributes": {
                    "title": "${profile.title}", 
                    "field_studiengang": "${profile.studiengang}", 
                    "field_anzahl_literaturreviews": "${profile.anzahl_literaturreviews}" , 
                    "field_datenbanken": "${profile.datenbanken}", 
                    "field_referenztool": "${profile.referenztool}", 
                    "field_analysetool": "${profile.analysetool}" 
                },
                "relationships": {
                    "field_profilbild": {
                        "data": {
                            "type": "file--file", 
                            "id": "6bf272a4-eac9-4c67-84b6-b7ea275b3155" 
                        }
                    }
                }
            }
        }`;


        var config = {
            method: 'post',
            url: `https://clr-backend.x-navi.de/jsonapi/node/profil/${profile.idd}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
            data: data


        };

        axios(config)
        .then(function(response){
            console.log(response)
            console.log(response);
            console.log("es lfniosdn") 
            console.log(rootState.sparky_api.validCredential)
            console.log(rootState.sparky_api.drupalUserID) 
            commit(data);

        })
        .catch(function(error) {
            console.log(error)
        })
        
    },
    

}

const mutations = {

    SAVE_USER(state, {profiles}) {
        
        profiles.forEach(element => {
            
            const field_fullname = element.attributes.field_fullname;
            const field_matrikelnummer = element.attributes.field_matrikelnummer;
            const field_id = element.id;
            const field_title = element.attributes.title;
            const mail = element.attributes.mail;
            const user_picture = element.relationships.user_picture
            let userObject =  {fullname: field_fullname, matrikelnummer: field_matrikelnummer, idd: field_id, title: field_title, mail: mail, user_picture: user_picture }

            state.userData = userObject
            
            //.push(userObject)
                    
        
            //let profileObject = { studiengang: field_studiengang, anzahl_literaturreviews: field_anzahl_literaturreviews, datenbanken: field_datenbanken, analysetool: field_analysetool, referenztool: field_referenztool, idd: field_id, title: field_title   }
            //state.projectList.push(projectObject)
            //state.myProfile.push(profileObject)
            
            
        
        
        });
    },




    
    SAVE_PROFILE(state, {profiles}) {
        
        profiles.forEach(element => {
            console.log(field_studiengang)
            const field_studiengang = element.attributes.field_studiengang;
            console.log(field_anzahl_literaturreviews)
            const field_anzahl_literaturreviews = element.attributes.field_anzahl_literaturreviews;
            console.log(field_datenbanken)
            const field_datenbanken = element.attributes.field_datenbanken;
            console.log(field_analysetool)
            const field_analysetool = element.attributes.field_analysetool;
            console.log(field_referenztool)
            const field_referenztool = element.attributes.field_referenztool;
            const field_id = element.id;
            const field_title = element.attributes.title;
            const field_profilbild = element.relationships.field_profilbild.data
            //state.profileData.push( { studiengang: field_studiengang, anzahl_literaturreviews: field_anzahl_literaturreviews, datenbanken: field_datenbanken, analysetool: field_analysetool, referenztool: field_referenztool, idd: field_id, title: field_title })
            //console.log(state)         
        
            //let profileObject = { studiengang: field_studiengang, anzahl_literaturreviews: field_anzahl_literaturreviews, datenbanken: field_datenbanken, analysetool: field_analysetool, referenztool: field_referenztool, idd: field_id, title: field_title   }
            //state.projectList.push(projectObject)
            //state.myProfile.push(profileObject)

            state.profileData = { studiengang: field_studiengang, anzahl_literaturreviews: field_anzahl_literaturreviews, datenbanken: field_datenbanken, analysetool: field_analysetool, referenztool: field_referenztool, idd: field_id, title: field_title, profilbild: field_profilbild }


            
            
        
        
        });


    }      
    
    

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    
}




