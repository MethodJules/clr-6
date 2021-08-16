import axios from 'axios';


const state = () => ({

    /* Here we initialize an empty dataobject for profileData and userData, because we don't use here arrays for these data.
    We need only a dataobject for one profile of one user, in order to store it */
    profileData: {},
    userData: {}

})

const actions = {

    /* We load the Userdata from backend by filtering the drupalUserUID to get the userdata of the right user */

    async loadUserFromBackend({ commit, state, rootState }) {
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
            .then(function (response) {
                console.log(response)
                console.log(response);
                console.log("es lfniosdn")
                console.log(rootState.sparky_api.validCredential)
                console.log(rootState.sparky_api.drupalUserID)
                const profiles = response.data.data;
                commit('SAVE_USER', { profiles });

            })
            .catch(function (error) {
                console.log(error)
            })


    },

    /* We load the Profiledata from backend by filtering the drupalUserUID to get the right profile of the user which belongs to the 
    userdata
    
    In the backend we add an field called field_user_uid for entering the user uid which is 24 for the testacc user and with that, we 
    can get the right profile data of testacc user filtered by the drupalUserUID = 24 in this case*/


    async loadProfileFromBackend({ commit, state, rootState }) {
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
            .then(function (response) {
                console.log(response)
                console.log(response);
                console.log("es lfniosdn")
                console.log(rootState.sparky_api.validCredential)
                console.log(rootState.sparky_api.drupalUserID)
                const profiles = response.data.data;
                commit('SAVE_PROFILE', { profiles });

            })
            .catch(function (error) {
                console.log(error)
            })


    },

    /* saves the profile with the date fields in the backend  */

    createProfile({ state, rootState }, profile) {
        console.log(profile)
        console.log(state)
        var drupalUserUID = rootState.drupal_api.user.uid
        console.log(drupalUserUID)
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
                    "field_user_uid": "${drupalUserUID}"
                    
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
            .then(function (response) {
                console.log(response)
                console.log(response);


            })
            .catch(function (error) {
                console.log(error)
            })


    },


    uploadImage({ commit, state, rootState }) {
        const buffer = "abc";
        /* const buffer = storedFile.Body; */
        console.log(state)
        var drupalUserUID = rootState.drupal_api.user.uid
        var filename = "file"
        console.log(drupalUserUID)


        var config = {
            method: 'post',
            url: `https://clr-backend.x-navi.de/jsonapi/media/image/field_media_image`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/octet-stream',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
                'Content-Disposition': 'file; filename="' + filename + '"',

            },
            data: Buffer.from(buffer, "binary")

        };


        axios(config)
            .then(function (response) {
                console.log(response)
                console.log(response);
                const profiles = response.data.data;

                commit('SAVE_PROFILE_IMAGE', { profiles });

            })
            .catch(function (error) {
                console.log(error)
            })


    },









    /* makes changes of the existing profile in the backend and overwrites the profile. Herefore we need the profile.idd
    that the backend knows which profile should be exactly updated/overwritten */

    updateProfile({ state, rootState }, profile) {

        console.log(state)


        var drupalUserUID = rootState.drupal_api.user.uid

        var data = `{
            "data": {
                "type": "node--profil", 
                "id": "${profile.idd}",
                "attributes": {
                    "title": "Profil", 
                    "field_studiengang": "${profile.studiengang}", 
                    "field_anzahl_literaturreviews": "${profile.anzahl_literaturreviews}" , 
                    "field_datenbanken": "${profile.datenbanken}", 
                    "field_referenztool": "${profile.referenztool}", 
                    "field_analysetool": "${profile.analysetool}",
                    "field_user_uid": "${drupalUserUID}"

                }
                
            }
        }`;


        var config = {
            method: 'patch',
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
            .then(function (response) {
                console.log(response)
                console.log(response);


            })
            .catch(function (error) {
                console.log(error)
            })

    },


}

const mutations = {

    /* takes all user and filters through all user and puts all relevant data of the user in state.userData
     * @param profiles all profile existing in the backend
     * @param drupalUserID id of the user in drupal backend
     * @param state state as parameter for access and manipulation of state data*/

    SAVE_USER(state, { profiles }) {

        profiles.forEach(element => {

            const field_fullname = element.attributes.field_fullname;
            const field_matrikelnummer = element.attributes.field_matrikelnummer;
            const field_id = element.id;
            const field_title = element.attributes.title;
            const mail = element.attributes.mail;
            let userObject = { fullname: field_fullname, matrikelnummer: field_matrikelnummer, idd: field_id, title: field_title, mail: mail }

            state.userData = userObject

            //.push(userObject)


            //let profileObject = { studiengang: field_studiengang, anzahl_literaturreviews: field_anzahl_literaturreviews, datenbanken: field_datenbanken, analysetool: field_analysetool, referenztool: field_referenztool, idd: field_id, title: field_title   }
            //state.projectList.push(projectObject)
            //state.myProfile.push(profileObject)




        });
    },




    /* 
    * takes all profiles and puts all relevant data of the profile in state.profileData
    * @param profiles all profile existing in the backend
    * @param drupalUserID id of the user in drupal backend
    * @param state state as parameter for access and manipulation of state data*/


    SAVE_PROFILE(state, { profiles }) {

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
            const field_profilbild = element.relationships.field_profilbild;
            const field_id = element.id;
            const field_title = element.attributes.title;





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




