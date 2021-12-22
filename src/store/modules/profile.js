import axios from "@/config/custom_axios";
const state = () => ({
    profileData: {},
    userData: {},
    imageData: '',
})
const getters = {
    /**
    * @param state state as parameter for access and manipulation of state data  
    * returns user uuid from state
    */
    getCurrentUserUUID(state) {
        return state.userData.uuid;
    },

    getProfileData(state) {
        return state.profileData;
    }
}

const actions = {
    /**
    * @param commit commit is used to call a mutation from this function
    * @param rootState rootState allows access to states of other modules in store
    * @param user_internal_uid user uid used for getting associated user data from backend
    * * We load the Userdata from backend by filtering the user_internal_uid to get the userdata of the right user 
    */
    async loadUserFromBackend({ commit, rootState }, user_internal_uid) {
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
                /* Normally we give response.data.data as payload for the mutation, as it contains only the needed 'data' 
                * array with all field values. But here we also need the included data which is found in response.data.included. 
                *  Therefore our paylod this time is response.data, 
                * which is an object with both 'data' and 'included' as attributes. 
                */
                const user = response.data;
                commit('SAVE_USER_IN_STATE', { user });
            })
            .catch(function (error) {
                console.log(error)
            })
    },
    /**
    * @param commit commit is used to call a mutation from this function
    * @param rootState rootState allows access to states of other modules in store
    * @param user_internal_uid user uid used for getting associated user data from backend
    * We load the Profiledata from backend by filtering the user_internal_uid to get the right profile of the user which belongs to the userdata
    * In the backend we have a field "field_nutzer" in this content type. we filter by the user_internal_uid, given as a paremeter to get the correct profile
    */
    async loadProfileFromBackend({ commit, rootState }, user_internal_uid) {
        commit("loadingStatus", true, { root: true })
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
                // const profiles = response.data.data;
                // console.log(profiles)
                let profile = {
                    name: response.data.data[0].attributes.title,
                    abteilung: response.data.data[0].attributes.field_abteilung,
                    analysetool: response.data.data[0].attributes.field_analysetool,
                    anzahlLiteraturreviews: response.data.data[0].attributes.field_anzahl_literaturreviews,
                    datenbanken: response.data.data[0].attributes.field_datenbanken,
                    referenztool: response.data.data[0].attributes.field_referenztool,
                    showPhoneNumber: response.data.data[0].attributes.field_show_phone_number,
                    showEmail: response.data.data[0].attributes.field_showemail,
                    studiengang: response.data.data[0].attributes.field_studiengang,
                    user_uid: response.data.data[0].attributes.field_user_uid,
                    telefonnummer: response.data.data[0].attributes.field_telefonnummer,
                }
                commit('SAVE_PROFILE', profile);
                commit("loadingStatus", false, { root: true })
            })
            .catch(function (error) {
                console.log(error)
            })
    },

    /**
    * @param rootState rootState allows access to states of other modules in store
    * @param profile user uid used for getting associated user data from backend
    * We upload the state of the show email checkbox to backend
    */
    updateEmailCheckbox({ rootState }, profile) {
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
            }).catch(function (error) {
                console.log(error);
            });
    },

    /**
    * @param rootState rootState allows access to states of other modules in store
    * @param profile user uid used for getting associated user data from backend
    * We upload the state of the show phone number checkbox to backend
    */
    updatePhoneCheckbox({ rootState }, profile) {
        var data = `
        {
            "data": {
                "type": "node--profil", 
                "id": "${profile.uuid}",
                "attributes": {
                    "field_show_phone_number": ${profile.show_phone_number}               
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
            }).catch(function (error) {
                console.log(error);
            });
    },

    /**
    * @param rootState rootState allows access to states of other modules in store
    * @param authorization_token auth token given as param, because auth token in state is undefined when registering
    * creates the profile when user is created/registers. auth token in state is at this point undefined, therefore it is given as param
    */
    createProfile({ rootState }, authorization_token) {
        var drupalUserUUID = rootState.drupal_api.user.uuid
        let username = rootState.drupal_api.user.username
        var title = `Profil ${username}`
        var data = `{
            "data": {
                "type": "user--profil", 
                "attributes": {
                    "title": "${title}",
                    "field_studiengang": "", 
                    "field_anzahl_literaturreviews": 0, 
                    "field_datenbanken": "", 
                    "field_referenztool": "", 
                    "field_analysetool": "",
                    "field_abteilung": "",
                    "field_telefonnummer": "",
                    "field_showemail": false,
                    "field_show_phone_number": false  
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

        return axios(config)
            .then(function (response) {
                alert("Dein Benutzerkonto wurde erstellt. Du kannst dich nun anmelden")
            })
            .catch(function (error) {
                alert("Dein Benutzerkonto konnte leider nicht erstellt werden. Wenn dieses Problem bestehen bleiben sollte, wende dich an deinen betreuenden Dozenten oder schreibe eine Email an:...")
            })
    },


    /**
    * @param dispatch dispatch is used to call another action from this function
    * @param rootState rootState allows access to states of other modules in store
    * @param iamge image to upload
    * @param filename filename of image to upload
    * @object image will be send to the upload method, where the uploaded image will be converted from base64 format to binary format, in
    * order to send it to backend to media and not as usual to the content type in backend. After converting process, the uploaded 
    * image will be send to the next method below, which will be dispatched to the userdata.
    * @object filename is dynamically, not static.
    */

    async uploadImage({ dispatch, rootState }, { image, filename }) {
        const base64ImageData = await fetch(image);
        const binaryImageData = await base64ImageData.blob();
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
                /**
                * the imageID will be need for the method 'updateUserdataWithProfileImage' in order to add the right image to Userdata.
                * 
                * */
                const imageID = response.data.data.id;
                dispatch('updateUserdataWithProfileImage', imageID)
            })
            .catch(function (error) {
                console.log(error)
            })
    },

    /**
    * @param rootState rootState allows access to states of other modules in store
    * @param imageID will be send to this method, in order to add the right profile image to the user data in the backend.
    * Here the userdata will be updated by uploading a profile image. To referencing the image to the right user, we declared the userID,
    * which we defined dynamically. The profile image will be added to the userdata of the user by the userID
    */
    updateUserdataWithProfileImage({ rootState }, imageID) {
        var userID = rootState.profile.userData.uuid
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
            })
            .catch(function (error) {
                console.log(error)
            })
    },
    /**
    * @param rootState rootState allows access to states of other modules in store
    * @param profile profile to be uploaded
    makes changes of the existing profile in the backend and overwrites the profile. Herefore we need the profile.uuid
    that the backend knows which profile should be exactly updated/overwritten and we need the user UID for referencing the profiledata 
    rigth user */

    updateProfile({ rootState }, profile) {

        //sometimes if empty fields are saved in backend, the value saved is a string with value null or undefined, instead of an empty string
        for (let attribute in profile) {
            if (profile[attribute] == null) {
                profile[attribute] = ""
            }
        }
        var data = `{
            "data": {
                "type": "node--profil", 
                "id": "${profile.uuid}",
                "attributes": {
                    "title": "${profile.title}", 
                    "field_studiengang": "${profile.studiengang}", 
                    "field_anzahl_literaturreviews": "${profile.anzahl_literaturreviews}", 
                    "field_datenbanken": "${profile.datenbanken}", 
                    "field_referenztool": "${profile.referenztool}", 
                    "field_analysetool": "${profile.analysetool}",
                    "field_abteilung": "${profile.abteilung}",
                    "field_telefonnummer": "${profile.telefonnummer}"
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
            })
            .catch(function (error) {
                console.log(error)
            })
    },
}

const mutations = {

    /**
    * @param state state as parameter for access and manipulation of state data
    * @param user user from backend saved local in state 
    *takes user object and saves it in state with user picture 
    */

    SAVE_USER_IN_STATE(state, { user }) {
        const urlBackend = axios.defaults.baseURL;
        /**
        * consists the data of user only, which will be stored as object 'userObject' in the state userData
        */
        user.data.forEach(element => {
            const field_fullname = element.attributes.field_fullname;
            const field_matrikelnummer = element.attributes.field_matrikelnummer;
            const field_id = element.id;
            const field_title = element.attributes.title;
            const mail = element.attributes.mail;
            state.userData = { fullname: field_fullname, matrikelnummer: field_matrikelnummer, uuid: field_id, title: field_title, mail: mail }
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
        }
    },

    /** 
    * @param state state as parameter for access and manipulation of state data
    * @param profiles profile of current user
    * takes profile array and puts all relevant data of the profile in state.profileData (actually only one profile)
    *
    */
    SAVE_PROFILE(state, profile) {
        state.profileData = profile;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}