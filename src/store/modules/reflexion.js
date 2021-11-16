import axios from "@/config/custom_axios";


const state = () => ({
    /* Here we initialize an empty object for reflexionData, in order to have all the the inputs of textfields in one reflexion.
    Because we need only one reflexion for one person */
    reflexionData: {},
    loadingStatus: false,

})



const actions = {

    /*  We load the Reflexiondata from backend by filtering the phasenid to get the reflexionData of the right phase */
    async loadReflexionFromBackend({ commit, state, rootState }, sicht) {
        var drupalUserUID = rootState.drupal_api.user.uid;
        var phaseId = rootState.project_phases.current_phase.phase_id;
        commit("loadingStatus", true, { root: true })


        console.log(state);
        console.log(rootState);
        console.log("url datas ")
        // TODO: Phase id ist undefined wenn Seite neugeladen wird, aber nicht wenn beim neuladen die Startseite aufgerufen wird 
        console.log(phaseId);
        console.log(drupalUserUID);
        console.log(sicht)

        var config = {
            method: 'get',
            url: `jsonapi/node/reflexionstemplate?filter[field_phasenid.id]=${phaseId}&filter[field_user.drupal_internal__uid]=${drupalUserUID}&filter[field_sichten.id]=${sicht}`,
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
                const reflexion = response.data.data;
                commit('SAVE_REFLEXION', { reflexion });
                commit("loadingStatus", false, { root: true })
            }).catch(error => {

                throw new Error(`API ${error}`);
                // Fehler wird abgefangen, wenn eine Reflexion zur einer Sicht nicht existiert. Sonst bleibt die alte Reflexion vom Backend in der falschen Sicht erhalten, da der http Request nicht korrekt funktioniert und nur der Catch teil ausgeführt wird, und das state daher nie geändert wird und der alte inhalt im state erhalten bleibt

            });

    },

    /* saves the reflexiondata in the backend  */


    createReflexion({ state, rootState, commit }, reflexion) {

        var phaseId = rootState.project_phases.current_phase.phase_id
        var drupalUserUID = rootState.profile.userData.uuid
        console.log(drupalUserUID)
        console.log(phaseId)

        // TODO Dynamisch mit Phase + UserName + Tab = Title
        var title = "Reflexion"


        var data = `
        {
            "data": 
            {
                "type": "node--reflexionstemplate", 
                "attributes":
                {
                    "title": "${title}", 
                    "field_berichten_reagieren": "${reflexion.berichten_reagieren}", 
                    "field_in_bezug_setzen": "${reflexion.in_bezug_setzen}" , 
                    "field_rekonstruieren": "${reflexion.rekonstruieren}", 
                    "field_schlussfolgern": "${reflexion.schlussfolgern}"  
                },
                "relationships": 
                {
                    "field_phasenid": 
                    {
                        "data":  
                        {
                            "type": "node--phase_vorgehensmodell", 
                            "id": "${phaseId}" 
                        }
                    }, 
                    "field_sichten" : 
                    {
                        "data": 
                        {
                            "type": "taxonomy_term--sichten", 
                            "id": "${reflexion.sichten}"
                        }
                    },
                    "field_user": 
                    {
                        "data": 
                        {
                            "type": "user--user",
                            "id": "${drupalUserUID}"
                        }
                    }

                }
            }
        }`;
        var config = {
            method: 'post',
            url: 'jsonapi/node/reflexionstemplate',
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
                let reflexion = response.data.data;
                commit('SAVE_REFLEXION_AFTER_CREATION', reflexion);
            })
            .catch(function (error) {
                console.log(error)
            })
    },

    /* makes changes of the existing reflexion in the backend and overwrites the existing reflexionstemplate. Herefore we need the reflexionstemplate.uuid
    that the backend knows which reflexionstemplate should be exactly updated/overwritten */

    updateReflexion({ state, rootState }, reflexion) {


        var data = `
        {
            "data": {
                "type": "node--reflexionstemplate", 
                "id": "${reflexion.uuid}", 
                "attributes": {
                    "title": "${reflexion.title}", 
                    "field_berichten_reagieren": "${reflexion.berichten_reagieren}", 
                    "field_in_bezug_setzen": "${reflexion.in_bezug_setzen}" , 
                    "field_rekonstruieren": "${reflexion.rekonstruieren}", 
                    "field_schlussfolgern": "${reflexion.schlussfolgern}" 
                }
            }
        }`;
        var config = {
            method: 'patch',
            url: `jsonapi/node/reflexionstemplate/${reflexion.uuid}`,
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
    loadingStatus(state, newLoadingStatus) {
        state.loadingStatus = newLoadingStatus
    },
    SAVE_REFLEXION_AFTER_CREATION(state, reflexion) {

        const field_berichten_reagieren = reflexion.attributes.field_berichten_reagieren;
        console.log(field_berichten_reagieren)
        const field_in_bezug_setzen = reflexion.attributes.field_in_bezug_setzen;
        console.log(field_in_bezug_setzen)
        const field_rekonstruieren = reflexion.attributes.field_rekonstruieren;
        console.log(field_rekonstruieren)
        const field_schlussfolgern = reflexion.attributes.field_schlussfolgern;
        console.log(field_schlussfolgern)
        const field_id = reflexion.id;
        const field_title = reflexion.attributes.title;

        state.reflexionData = { berichten_reagieren: field_berichten_reagieren, in_bezug_setzen: field_in_bezug_setzen, rekonstruieren: field_rekonstruieren, schlussfolgern: field_schlussfolgern, uuid: field_id, title: field_title }

    },

    SAVE_REFLEXION(state, { reflexion }) {

        console.log(reflexion);

        if (reflexion.length == 0) {
            state.reflexionData = {}
        }
        reflexion.forEach(element => {
            const field_berichten_reagieren = element.attributes.field_berichten_reagieren;
            console.log(field_berichten_reagieren)
            const field_in_bezug_setzen = element.attributes.field_in_bezug_setzen;
            console.log(field_in_bezug_setzen)
            const field_rekonstruieren = element.attributes.field_rekonstruieren;
            console.log(field_rekonstruieren)
            const field_schlussfolgern = element.attributes.field_schlussfolgern;
            console.log(field_schlussfolgern)
            const field_id = element.id;
            const field_title = element.attributes.title;

            state.reflexionData = { berichten_reagieren: field_berichten_reagieren, in_bezug_setzen: field_in_bezug_setzen, rekonstruieren: field_rekonstruieren, schlussfolgern: field_schlussfolgern, uuid: field_id, title: field_title }

        });

    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,

}
