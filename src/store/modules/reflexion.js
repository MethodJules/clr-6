import axios from 'axios';

const state = () => ({
    /* Here we initialize an empty array for rowData, in order to have all the the inputs of textfields */
    rowData: {}
})





const actions = {

    /* TODO: We load the Reflexiondata from backend by filtering the phasenid to get the reflexionData of the right phase */
    async loadReflexionFromBackend({ commit, state, rootState }) {
        var drupalUserUID = rootState.drupal_api.user.uid;
        var phaseId = rootState.phases.current_phase.phase_id;
        console.log(state);
        console.log(phaseId);
        console.log(rootState.drupal_api);
        console.log(drupalUserUID);

        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/jsonapi/node/reflexionstemplate?filter[field_phasenid.id]=${phaseId}`,
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
                const data = response.data.data;
                commit('SAVE_REFLEXION', { reflexion });
            }).catch(error => {
                throw new Error(`API ${error}`);
            });

    },

    createReflexion({ commit }, reflexion) {
        console.log("hello")
        console.log(reflexion.berichten_reagieren)
        commit('ADD_REFLEXION', reflexion)

    },

    updateReflexion({ commit }, reflexion) {

        commit('UPDATE_REFLEXION', reflexion);
    },


}

const mutations = {

    /* saves the reflexiondata in the backend  */

    ADD_REFLEXION(state, reflexion) {
        console.log(reflexion.berichten_reagieren)
        var phaseId = rootState.phases.current_phase.phase_id
        var data = `
        {
            "data": 
            {
                "type": "node--reflexionstemplate", 
                "attributes":
                {
                    "title": "UserName + Reflexionsphase", 
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
                            "id": "325fd0af-838c-49f5-92d3-2fcc987e6137" 
                        }
                    } 
                }
            }
        }`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/reflexionstemplate',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
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

    /* makes changes of the existing reflexion in the backend and overwrites the existing reflexionstemplate. Herefore we need the reflexionstemplate.idd
    that the backend knows which reflexionstemplate should be exactly updated/overwritten */
    UPDATE_REFLEXION(state, reflexion) {
        let index = state.rowData.indexOf(reflexion);
        state.rowData[index] = reflexion;
        var data = `
        {
            "data": {
                "type": "node--reflexionstemplate", 
                "id": "${reflexion.idd}", 
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
            url: `https://clr-backend.x-navi.de/jsonapi/node/reflexionstemplate/${reflexion.idd}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
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



    SAVE_REFLEXION(state, { reflexion }) {
        console.log(reflexion);
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
            state.rowData = { berichten_reagieren: field_berichten_reagieren, in_bezug_setzen: field_in_bezug_setzen, rekonstruieren: field_rekonstruieren, schlussfolgern: field_schlussfolgern, idd: field_id, title: field_title }

        });
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,

}




