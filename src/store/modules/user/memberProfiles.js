import axios from "@/config/custom_axios";
const state = () => ({

    memberProfile: {},
    userData: {}
})

const actions = {

    /**
    * @param commit commit is used to call a mutation from this function
    * @param rootState rootState allows access to states of other modules in store
    * @param user_internal_uid user uid used for getting associated user data from backend
    * We load the Profiledata from backend by filtering the user_internal_uid to get the right profile of the user which belongs to the userdata
    * In the backend we have a field "field_nutzer" in this content type. we filter by the user_internal_uid, given as a paremeter to get the correct profile
    */
    async loadMemberProfile({ commit, dispatch }, memberUid) {

        const authToken = sessionStorage.getItem("auth_token");
        const csrfToken = localStorage.getItem("csrf_token");

        commit("loadingStatus", true, { root: true })
        var config = {
            method: 'get',
            url: `jsonapi/node/profil?filter[field_nutzer.drupal_internal__uid]=${memberUid}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': authToken,
                'X-CSRF-Token': csrfToken
            },
        };
        axios(config)
            .then((response) => {
                let memberProfile = {
                    uuid: response.data.data[0].id,
                    title: response.data.data[0].attributes.title,
                    name: response.data.data[0].attributes.title,
                    abteilung: response.data.data[0].attributes.field_abteilung,
                    analysetool: response.data.data[0].attributes.field_analysetool,
                    anzahlLiteraturreviews: response.data.data[0].attributes.field_anzahl_literaturreviews,
                    datenbanken: response.data.data[0].attributes.field_datenbanken,
                    referenztool: response.data.data[0].attributes.field_referenztool,
                    showEmail: response.data.data[0].attributes.field_showemail,
                    studiengang: response.data.data[0].attributes.field_studiengang,
                    user_uid: response.data.data[0].attributes.field_user_uid,
                    showPhoneNumber: response.data.data[0].attributes.field_show_phone_number,
                    telefonnummer: response.data.data[0].attributes.field_telefonnummer,
                }
                dispatch("loadUserFromBackend", response.data.data[0].attributes.field_user_uid)
                commit('SAVE_MEMBER_PROFILE', memberProfile);
                commit("loadingStatus", false, { root: true })
            })
            .catch(function (error) {
                console.log(error)
            })
    },


    /**
* @param commit commit is used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* @param user_internal_uid user uid used for getting associated user data from backend
* * We load the Userdata from backend by filtering the user_internal_uid to get the userdata of the right user
*/
    async loadUserFromBackend({ commit }, user_internal_uid) {
        const authToken = sessionStorage.getItem("auth_token");
        const csrfToken = localStorage.getItem("csrf_token");

        var config = {
            method: 'get',
            url: `jsonapi/user/user?filter[drupal_internal__uid]=${user_internal_uid}&include=user_picture`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': authToken,
                'X-CSRF-Token': csrfToken
            },
        };
        axios(config)
            .then(function (response) {
                commit('SAVE_USER_DATA', response.data);
            })
            .catch(function (error) {
                console.log(error)
            })
    },


}
const mutations = {
    SAVE_MEMBER_PROFILE(state, memberProfile) {
        state.memberProfile = memberProfile;
    },
    SAVE_USER_DATA(state, payload) {
        console.log(payload)
        let fullname = payload.data[0].attributes.field_fullname;
        let userName = payload.data[0].attributes.name;
        let mail = payload.data[0].attributes.mail;
        let matrikelNummer = payload.data[0].attributes.field_matrikelnummer;
        let profilePictureLink = "https://clr-backend.x-navi.de/sites/default/files/pictures/2021-08/Testacc%20Profile%20Picture.jpg";
        (payload.included) ? profilePictureLink = "https://clr-backend.x-navi.de" + payload.included[0].attributes.uri.url : "";

        state.userData = { fullname, userName, mail, matrikelNummer, profilePictureLink }
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}