import axios from "@/config/custom_axios";
const state = () => ({

    memberProfile: {}
})

const getters = {
    getMemberProfile(state) {
        return state.memberProfile;
    }
}

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
                console.log(response)
                let memberProfile = {
                    uuid: response.data.data[0].id,
                    title: response.data.data[0].attributes.title,

                    // TODO: this is not the user's full name. Only keeping it for now to prevent possible side effects.
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

    loadEmailOfMember({ commit }, id) {

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
                /* Normally we give response.data.data as payload for the mutation, as it contains only the needed 'data'
                * array with all field values. But here we also need the included data which is found in response.data.included.
                *  Therefore our paylod this time is response.data,
                * which is an object with both 'data' and 'included' as attributes.
                */
                const user = response.data;
                // It should consist email but it is not..
                console.log(user)
                // commit('SAVE_USER_IN_STATE', { user });
            })
            .catch(function (error) {
                console.log(error)
            })
    },


}
const mutations = {
    SAVE_MEMBER_PROFILE(state, memberProfile) {
        state.memberProfile = memberProfile;
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}