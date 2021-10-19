import axios from 'axios';

const state = () => ({
    /* Here we initialize an empty object for reflexionData, in order to have all the the inputs of textfields in one reflexion.
    Because we need only one reflexion for one person */
    reflexionData: {}

})



const actions = {

    /* TODO: We load the Reflexiondata from backend by filtering the phasenid to get the reflexionData of the right phase */
    async loadReflexionFromBackend({ commit, state, rootState }, sicht) {
        var drupalUserUID = rootState.drupal_api.user.uid;
        var phaseId = rootState.phases.current_phase.phase_id;


        console.log(state);
        console.log(rootState);
        console.log("url datas ")
        // diese phase id kommt nicht when ich seite neu lade. 
        console.log(phaseId);
        console.log(drupalUserUID);
        console.log(sicht)

        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/jsonapi/node/reflexionstemplate?filter[field_phasenid.id]=${phaseId}&filter[field_user.drupal_internal__uid]=${drupalUserUID}&filter[field_sichten.id]=${sicht}`,
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
            }).catch(error => {

                throw new Error(`API ${error}`);
                // Fehler wird abgefangen, wenn eine Reflexion zur einer Sicht nicht existiert. Sonst bleibt die alte Reflexion vom Backend in der falschen Sicht erhalten, da der http Request nicht korrekt funktioniert und nur der Catch teil ausgeführt wird, und das state daher nie geändert wird und der alte inhalt im state erhalten bleibt

            });

    },

    /* saves the reflexiondata in the backend  */
    // sichten: "id": "325fd0af-838c-49f5-92d3-2fcc987e6137" Zeile 82

    createReflexion({ state, rootState }, reflexion) {

        var phaseId = rootState.phases.current_phase.phase_id

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

    /* makes changes of the existing reflexion in the backend and overwrites the existing reflexionstemplate. Herefore we need the reflexionstemplate.idd
    that the backend knows which reflexionstemplate should be exactly updated/overwritten */

    updateReflexion({ state, rootState }, reflexion) {


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


    SAVE_REFLEXION(state, { reflexion }) {
        //var leeresReflexionArray = [];
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

            state.reflexionData = { berichten_reagieren: field_berichten_reagieren, in_bezug_setzen: field_in_bezug_setzen, rekonstruieren: field_rekonstruieren, schlussfolgern: field_schlussfolgern, idd: field_id, title: field_title }
            //leeresReflexionArray.push({ berichten_reagieren: field_berichten_reagieren, in_bezug_setzen: field_in_bezug_setzen, rekonstruieren: field_rekonstruieren, schlussfolgern: field_schlussfolgern, idd: field_id, title: field_title })

        });


        //state.reflexionData = leeresReflexionArray;
        //console.log(state.reflexionData)
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,

}
