import axios from "@/config/custom_axios";

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
    /**
     * 
     * 
     */

    async loadUserFromBackend({ commit, state, rootState }, user_internal_uid) {
        //var drupalUserUID = rootState.drupal_api.user.uid
        // console.log(rootState.sparky_api.drupalUserID)
        // console.log(drupalUserUID)


        var config = {
            method: 'get',
            url: `jsonapi/user/user?filter[drupal_internal__uid]=${user_internal_uid}&include=user_picture`,
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
                /* Normally we give response.data.data as payload for the mutation, as it contains only the needed 'data' 
                 * array with all field values. But here we also need the included data which is found in response.data.included. 
                 *  Therefore our paylod this time is response.data, 
                 * which is an object with both 'data' and 'included' as attributes. 
                 * */

                const user = response.data;
                commit('SAVE_USER_IN_STATE', { user });

            })
            .catch(function (error) {
                console.log(error)
            })


    },

    /* We load the Profiledata from backend by filtering the drupalUserUID to get the right profile of the user which belongs to the 
    userdata
    
    In the backend we have a field "field_user" in this content type. we filter by the user_internal_uid, given as a paremeter to get the correct profile*/


    async loadProfileFromBackend({ commit, state, rootState }, user_internal_uid) {
        commit("loadingStatus", true, { root: true })
        console.log(state)
        var drupalUserUID = rootState.drupal_api.user.uid
        console.log(drupalUserUID)
        //TODO: change/add user uuid instead of user uid and change field in backend from string field for user uid to relationship field with uuid
        //TODO: or change to get profile for user when no user_internal_uid is given
        var config = {
            method: 'get',
            url: `jsonapi/node/profil?filter[field_nutzer.drupal_internal__uid]=${user_internal_uid}`,
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
                commit("loadingStatus", false, { root: true })


            })
            .catch(function (error) {
                console.log(error)
            })


    },

    updateEmailCheckbox({ rootState, state }, profile) {

        console.log(profile)


        var data = `
        {
            "data": {
                "type": "node--profil", 
                "id": "${profile.uuid}",
                "attributes": {
                    "field_showemail": ${profile.show_email}
                    
                }
            }
        }`;
        var config = {
            method: 'patch',
            url: `jsonapi/node/profil/${profile.uuid}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
            data: data

        };
        axios(config)
            .then((response) => {
                console.log(response);


            }).catch(function (error) {
                console.log(error);
            });



    },

    /* saves the profile with the date fields in the backend  */

    createProfile({ state, rootState }, authorization_token) {
        //console.log(state)
        var drupalUserUID = rootState.drupal_api.user.uid
        var drupalUserUUID = rootState.drupal_api.user.uuid
        console.log(rootState.drupal_api.user)
        let username = rootState.drupal_api.user.username
        console.log(drupalUserUID)
        var title = `Profil ${username}`
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
                    "field_showemail": false     
                },
                "relationships": {

                    "field_nutzer": {
                      "data": {
                        "0": {
                          "type": "user--user",
                          "id": "${drupalUserUUID}"
                        }
                      }
                    }
                    }
                
            }
        }`;

        var config = {
            method: 'post',
            url: `jsonapi/node/profil`,
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
                alert("Dein Benutzerkonto wurde erstellt. Du kannst dich nun anmelden")

                console.log(response)


            })
            .catch(function (error) {
                console.log(error)
                alert("Dein Benutzerkonto konnte leider nicht erstellt werden. Wenn dieses Problem bestehen bleiben sollte, wende dich an deinen betreuenden Dozenten oder schreibe eine Email an:...")

            })


    },

    /**
     * 
     * @object image will be send to the upload method, where the uploaded image will be converted from base64 format to binary format, in
     * order to send it to backend to media and not as usual to the content type in backend. After converting process, the uploaded 
     * image will be send to the next method below, which will be dispatched to the userdata.
     * @object filename is dynamically, not static.
     */

    async uploadImage({ dispatch, state, rootState }, { image, filename }) {

        const base64ImageData = await fetch(image);
        const binaryImageData = await base64ImageData.blob();


        var drupalUserUID = rootState.drupal_api.user.uid


        var config = {
            method: 'post',
            url: `jsonapi/media/image/field_media_image`,
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
                /**
                 * the imageID will be need for the method 'updateUserdataWithProfileImage' in order to add the right image to Userdata.
                 * 
                 * */

                const imageID = response.data.data.id;
                console.log(imageID)

                dispatch('updateUserdataWithProfileImage', imageID)




            })
            .catch(function (error) {
                console.log(error)
            })


    },

    /**
     * 
     * @param imageID will be send to this method, in order to add the right profile image to the user data in the backend.
     * Here the userdata will be updated by uploading a profile image. To referencing the image to the right user, we declared the userID,
     * which we defined dynamically. The profile image will be added to the userdata of the user by the userID
     * 
     * 
     */
    updateUserdataWithProfileImage({ state, rootState }, imageID) {
        var userID = rootState.profile.userData.uuid

        console.log(userID)

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
            url: `jsonapi/user/user/${userID}`,
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



    /* makes changes of the existing profile in the backend and overwrites the profile. Herefore we need the profile.uuid
    that the backend knows which profile should be exactly updated/overwritten and we need the user UID for referencing the profiledata 
    rigth user */

    updateProfile({ state, rootState }, profile) {

        console.log(state)


        var drupalUserUID = rootState.drupal_api.user.uid

        var data = `{
            "data": {
                "type": "node--profil", 
                "id": "${profile.uuid}",
                "attributes": {
                    "title": "${profile.title}", 
                    "field_studiengang": "${profile.studiengang}", 
                    "field_anzahl_literaturreviews": "${profile.anzahl_literaturreviews}" , 
                    "field_datenbanken": "${profile.datenbanken}", 
                    "field_referenztool": "${profile.referenztool}", 
                    "field_analysetool": "${profile.analysetool}"
                }
                
            }
        }`;


        var config = {
            method: 'patch',
            url: `jsonapi/node/profil/${profile.uuid}`,
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

    /* takes all user and filters through all user and puts all relevant data of the user in the state.userData
     *
    */

    SAVE_USER_IN_STATE(state, { user }) {
        console.log(user)

        /**
         * consists the data of user only, which will be stored as object 'userObject' in the state userData
         */

        user.data.forEach(element => {
            const field_fullname = element.attributes.field_fullname;

            const field_matrikelnummer = element.attributes.field_matrikelnummer;
            const field_id = element.id;
            const field_title = element.attributes.title;
            const mail = element.attributes.mail;

            let userObject = { fullname: field_fullname, matrikelnummer: field_matrikelnummer, uuid: field_id, title: field_title, mail: mail }


            state.userData = userObject

            console.log(state.userData)



        });

        /**
         * consist the object user with included data: the url of the profile image.
         * from the response included, we get the second part of the url of the profilimage. 
         * The first part of the url is defined statically above in line 2. 
         * We get the fullurl by uniting the first and second part of the url. The full url will be pushed in to the state imageData.
         */
        if (user.included != undefined) {
            user.included.forEach(element => {

                const url = element.attributes.uri.url;

                let fullUrl = urlBackend + url



                state.imageData = fullUrl

            });
        } else {
            state.imageData = ""
            // maybe put basic image in state which is showed instead? -> relative path with local image did not work
        }


    },


    /* 
    * takes all profiles and puts all relevant data of the profile in state.profileData
    *
    */


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
            const field_id = element.id;
            const field_title = element.attributes.title;
            const field_showemail = element.attributes.field_showemail

            state.profileData = { studiengang: field_studiengang, anzahl_literaturreviews: field_anzahl_literaturreviews, datenbanken: field_datenbanken, analysetool: field_analysetool, referenztool: field_referenztool, uuid: field_id, title: field_title, show_email: field_showemail }






        });


    }



}

export default {
    namespaced: true,
    state,
    mutations,
    actions,

}




