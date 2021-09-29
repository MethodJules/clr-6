import axios from 'axios';
const urlBackend = "https://clr-backend.x-navi.de"


const state = () => ({

    /* Here we initialize an empty dataobject for profileData and userData, because we don't use here arrays for these data.
    We need only a dataobject for one profile of one user, in order to store it */
    profileData: {},
    userData: {},
    imageData: ''

})

const actions = {

    /* We load the Userdata from backend by filtering the drupalUserUID to get the userdata of the right user */

    async loadUserFromBackend({ commit, state, rootState }) {
        var drupalUserUID = rootState.drupal_api.user.uid
        // console.log(rootState.sparky_api.drupalUserID)
        // console.log(drupalUserUID)


        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/jsonapi/user/user?filter[drupal_internal__uid]=${drupalUserUID}&include=user_picture`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };

        axios(config)
            .then(function (response) {
                console.log(response);
                const user = response.data;
                commit('SAVE_USER', { user });

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
                //console.log(rootState.sparky_api.validCredential)
                //console.log(rootState.sparky_api.drupalUserID)
                const profiles = response.data.data;
                commit('SAVE_PROFILE', { profiles });


            })
            .catch(function (error) {
                console.log(error)
            })


    },

    /* saves the profile with the date fields in the backend  */

    createProfile({ state, rootState }, authorization_token) {
        //console.log(state)
        var drupalUserUID = rootState.drupal_api.user.uid
        console.log(drupalUserUID)
        var title = "Profil"
        //commented out, because a new profile is created when a user is created
        /*         var data = `{
                    "data": {
                        "type": "user--profil", 
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
                }`; */

        var data = `{
            "data": {
                "type": "user--profil", 
                "attributes": {
                    "title": "${title}",
                    "field_studiengang": "", 
                    "field_anzahl_literaturreviews": "", 
                    "field_datenbanken": "", 
                    "field_referenztool": "", 
                    "field_analysetool": "",
                    "field_user_uid": ""
                    
                }
                
            }
        }`;

        var config = {
            method: 'post',
            url: `https://clr-backend.x-navi.de/jsonapi/node/profil`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': authorization_token,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response)


            })
            .catch(function (error) {
                console.log(error)
            })


    },


    async uploadImage({ dispatch, state, rootState }, image) {
        //const buffer = "abc";
        console.log(image)
        const base64ImageData = await fetch(image);
        const binaryImageData = await base64ImageData.blob();
        /* const buffer = storedFile.Body; */
        console.log(state)
        var drupalUserUID = rootState.drupal_api.user.uid
        var filename = "file2.jpg"
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
            data: binaryImageData

        };


        axios(config)
            .then(function (response) {
                console.log(response);
                const imageID = response.data.data.id;
                console.log(imageID)

                dispatch('updateUserdataWithProfileImage', imageID)




            })
            .catch(function (error) {
                console.log(error)
            })


    },

    updateUserdataWithProfileImage({ state, rootState }, imageID) {
        var userID = rootState.profile.userData.idd
        //let user = state.userData.idd



        console.log(state)
        console.log(imageID)
        var data = `{
            "data": {
                "type": "user--user", 
                "id": "${userID}",
                "relationships": {
                    "user_picture": {
                        "data": {
                            "type": "file--file",
                            "id": "${imageID}"
                        }
                    }

                }
                
            }
        }`;

        var config = {
            method: 'patch',
            url: `https://clr-backend.x-navi.de/jsonapi/user/user/${userID}`,
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

                console.log(response);


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

    SAVE_USER(state, { user }) {

        /* for (const current_user in user) {
            const field_fullname = current_user.data.attributes.field_fullname;
            const field_matrikelnummer = current_user.data.attributes.field_matrikelnummer;
            const field_id = current_user.data.attributes.field_id;
            const field_title = current_user.data.attributes.field_title;
            const mail = current_user.data.attributes.mail;
            const url = current_user.included.attributes.uri.url;
            console.log(current_user)

            let userObject = { fullname: field_fullname, matrikelnummer: field_matrikelnummer, idd: field_id, title: field_title, mail: mail, url: url }


            state.userData = userObject


        } */


        user.data.forEach(element => {
            const field_fullname = element.attributes.field_fullname;

            const field_matrikelnummer = element.attributes.field_matrikelnummer;
            const field_id = element.id;
            const field_title = element.attributes.title;
            const mail = element.attributes.mail;




            let userObject = { fullname: field_fullname, matrikelnummer: field_matrikelnummer, idd: field_id, title: field_title, mail: mail }


            state.userData = userObject

            console.log(state.userData)



        });

        user.included.forEach(element => {

            const url = element.attributes.uri.url;

            let fullUrl = urlBackend + url



            state.imageData = fullUrl



            //user_array.push({ fullUrl: fullUrl })



        });




    },

    /* user.data.forEach(element => {

        const field_fullname = element.data.attributes.field_fullname;
        const field_matrikelnummer = element.data.attributes.field_matrikelnummer;
        const field_id = element.data.id;
        const field_title = element.data.attributes.title;
        const mail = element.data.attributes.mail;
        const url = element.included.attributes.uri.url;


        let fullUrl = urlBackend + url

        let userObject = { fullname: field_fullname, matrikelnummer: field_matrikelnummer, idd: field_id, title: field_title, mail: mail, fullUrl: fullUrl }


        state.userData = userObject */

    //.push(userObject)


    //let profileObject = { studiengang: field_studiengang, anzahl_literaturreviews: field_anzahl_literaturreviews, datenbanken: field_datenbanken, analysetool: field_analysetool, referenztool: field_referenztool, idd: field_id, title: field_title   }
    //state.projectList.push(projectObject)
    //state.myProfile.push(profileObject)




    /* }); */





    /* 
    * takes all profiles and puts all relevant data of the profile in state.profileData
    * @param profiles all profile existing in the backend
    * @param drupalUserID id of the user in drupal backend
    * @param state state as parameter for access and manipulation of state data*/


    SAVE_PROFILE(state, { profiles }) {
        console.log(profiles);
        profiles.forEach(element => {
            const field_studiengang = element.attributes.field_studiengang;
            console.log(field_studiengang)
            const field_anzahl_literaturreviews = element.attributes.field_anzahl_literaturreviews;
            console.log(field_anzahl_literaturreviews)
            const field_datenbanken = element.attributes.field_datenbanken;
            console.log(field_datenbanken)
            const field_analysetool = element.attributes.field_analysetool;
            console.log(field_analysetool)
            const field_referenztool = element.attributes.field_referenztool;
            console.log(field_referenztool)
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




