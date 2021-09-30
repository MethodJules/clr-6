import axios from 'axios';
//TODO: comments
const state = () => ({
    phases: [
        {
            phase_id: 0,
            phase_name: 'Gruppe bilden',
        },
        {
            phase_id: 1,
            phase_name: 'Ziel & Umfang definieren'
        },
        {
            phase_id: 2,
            phase_name: 'Konzepte & Definitionen identifizieren'
        },
        {
            phase_id: 3,
            phase_name: 'Literatur suchen'
        },
        {
            phase_id: 4,
            phase_name: 'Daten extrahieren'
        },
        {
            phase_id: 5,
            phase_name: 'Literatur analysieren & synthetisieren'
        },
        {
            phase_id: 6,
            phase_name: 'Ergebnisse kommunizieren'
        },
        {
            phase_id: 7,
            phase_name: 'Gruppe auflösen'
        }
    ],
    phases_this_project: [],
    current_phase: {}


})

const actions = {

    /**
     * loads all phases from backend, passes loaded phases and projectID to mutation
    * @param projectId projectID of current project
    * @param commit commit us used to call a mutation from this function
    * @param state state as parameter for access and manipulation of state data
    */
    async loadPhasesFromBackend({ commit, state, rootState }, projectId) {
        console.log(state)
        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/jsonapi/node/phase_vorgehensmodell?filter[field_projektid.id]=${projectId}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };
        axios(config)
            .then(function (response) {
                const phases = response.data.data;
                commit('LOAD_PHASES', phases);

            })
            .catch(function (error) {
                console.log(error)
            })


    },

    /*     async loadSinglePhaseFromState({ commit, state }, { phaseId }) {
            let currentPhase = null
    
            for (let phase of state.phases_this_project) {
                if (phase.attributes.field_phase_number == phaseId) {
                    console.log(phase)
                    console.log(phase.attributes.title)
                    console.log(phase.relationships.field_projektid.data.id)
                    currentPhase = phase
                }
    
            }
            console.log(currentPhase)
    
            commit('LOAD_PHASE', { currentPhase });
    
        }, */

    async loadSinglePhaseFromBackend({ commit, state, rootState, dispatch }, { projectId, phaseId }) {
        console.log(phaseId)
        console.log(state)
        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/jsonapi/node/phase_vorgehensmodell?filter[field_projektid.id]=${projectId}&filter[field_phase_number]=${phaseId}&include=field_assistent`,
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
                const currentPhase = response.data.data;
                commit('LOAD_SINGLE_PHASE', { currentPhase });
                dispatch("inputDocuments/loadInputdocumentsFromBackend", null, { root: true })
                dispatch("output_documents/loadOutputdocumentsFromBackend", null, { root: true })

            })
            .catch(function (error) {
                console.log(error)
            })


    },







    /**
* creates all phases for a newly created project in the backend
* 
* @param dispatch dispatch is used to call another action from this function
* @param rootState rootState allows access to states of other modules in store
*/
    createAllPhasesforNewProject({ state, rootState }, id_newly_created_project) {
        console.log(state)
        console.log(id_newly_created_project)
        //field_assistent bekommt die assistent id vom standard assistenten - hier die ID de Assistenten als ein statischer string
        let assistent_id = "a6260ded-71e7-40c0-8e24-bf78caa8746e"
        //id_newly_created_project = "695c2f01-6de9-4456-988f-1fcf5db91dfb"

        //json.stringify hier eigtl nicht nötig

        var phase_array = []
        for (var i = 0; i <= 7; i++) {


            let data = JSON.stringify({
                "data": {
                    'type': 'node--phase_vorgehensmodell',
                    "attributes": {
                        "title": `${state.phases[i].phase_name}`,
                        'field_abschluss': { 'value': false },
                        'field_documentationtext': { 'value': " " },
                        'field_phase_number': { 'value': `${i}` },
                    },
                    "relationships": {
                        'field_assistent': {
                            'data': { 'type': 'node--assistent', 'id': `${assistent_id}` }
                        },
                        'field_projektid': {
                            'data': { 'type': 'node--projekt', 'id': `${id_newly_created_project}` },
                        },
                    }

                },



            })
            phase_array.push(data)


        }


        //phase 0
        var data = phase_array[0]
        console.log(data)

        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/phase_vorgehensmodell',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
            },
            data: data
        };
        console.log(config)
        axios(config)
            .then((response) => {
                console.log(response.data);

                //phase 1
                data = phase_array[1]
                console.log(data)

                var config = {
                    method: 'post',
                    url: 'https://clr-backend.x-navi.de/jsonapi/node/phase_vorgehensmodell',
                    headers: {
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                        'Authorization': rootState.drupal_api.authToken,
                        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
                    },
                    data: data
                };
                console.log(config)
                axios(config)
                    .then((response) => {
                        console.log(response.data);

                        //phase 2
                        data = phase_array[2]
                        console.log(data)

                        var config = {
                            method: 'post',
                            url: 'https://clr-backend.x-navi.de/jsonapi/node/phase_vorgehensmodell',
                            headers: {
                                'Accept': 'application/vnd.api+json',
                                'Content-Type': 'application/vnd.api+json',
                                'Authorization': rootState.drupal_api.authToken,
                                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
                            },
                            data: data
                        };
                        console.log(config)
                        axios(config)
                            .then((response) => {
                                console.log(response.data);
                                //phase 3
                                data = phase_array[3]
                                console.log(data)

                                var config = {
                                    method: 'post',
                                    url: 'https://clr-backend.x-navi.de/jsonapi/node/phase_vorgehensmodell',
                                    headers: {
                                        'Accept': 'application/vnd.api+json',
                                        'Content-Type': 'application/vnd.api+json',
                                        'Authorization': rootState.drupal_api.authToken,
                                        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
                                    },
                                    data: data
                                };
                                console.log(config)
                                axios(config)
                                    .then((response) => {
                                        console.log(response.data);
                                        //phase 4
                                        data = phase_array[4]
                                        console.log(data)

                                        var config = {
                                            method: 'post',
                                            url: 'https://clr-backend.x-navi.de/jsonapi/node/phase_vorgehensmodell',
                                            headers: {
                                                'Accept': 'application/vnd.api+json',
                                                'Content-Type': 'application/vnd.api+json',
                                                'Authorization': rootState.drupal_api.authToken,
                                                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
                                            },
                                            data: data
                                        };
                                        console.log(config)
                                        axios(config)
                                            .then((response) => {
                                                console.log(response.data);
                                                //phase 5
                                                data = phase_array[5]
                                                console.log(data)

                                                var config = {
                                                    method: 'post',
                                                    url: 'https://clr-backend.x-navi.de/jsonapi/node/phase_vorgehensmodell',
                                                    headers: {
                                                        'Accept': 'application/vnd.api+json',
                                                        'Content-Type': 'application/vnd.api+json',
                                                        'Authorization': rootState.drupal_api.authToken,
                                                        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
                                                    },
                                                    data: data
                                                };
                                                console.log(config)
                                                axios(config)
                                                    .then((response) => {
                                                        console.log(response.data);
                                                        //phase 6
                                                        data = phase_array[6]
                                                        console.log(data)

                                                        var config = {
                                                            method: 'post',
                                                            url: 'https://clr-backend.x-navi.de/jsonapi/node/phase_vorgehensmodell',
                                                            headers: {
                                                                'Accept': 'application/vnd.api+json',
                                                                'Content-Type': 'application/vnd.api+json',
                                                                'Authorization': rootState.drupal_api.authToken,
                                                                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
                                                            },
                                                            data: data
                                                        };
                                                        console.log(config)
                                                        axios(config)
                                                            .then((response) => {
                                                                console.log(response.data);
                                                                //phase 7
                                                                data = phase_array[7]
                                                                console.log(data)

                                                                var config = {
                                                                    method: 'post',
                                                                    url: 'https://clr-backend.x-navi.de/jsonapi/node/phase_vorgehensmodell',
                                                                    headers: {
                                                                        'Accept': 'application/vnd.api+json',
                                                                        'Content-Type': 'application/vnd.api+json',
                                                                        'Authorization': rootState.drupal_api.authToken,
                                                                        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
                                                                    },
                                                                    data: data
                                                                };
                                                                console.log(config)
                                                                axios(config)
                                                                    .then((response) => {
                                                                        console.log(response.data);


                                                                    }).catch(error => {
                                                                        throw new Error(`API ${error}`);
                                                                    });


                                                            }).catch(error => {
                                                                throw new Error(`API ${error}`);
                                                            });


                                                    }).catch(error => {
                                                        throw new Error(`API ${error}`);
                                                    });


                                            }).catch(error => {
                                                throw new Error(`API ${error}`);
                                            });


                                    }).catch(error => {
                                        throw new Error(`API ${error}`);
                                    });


                            }).catch(error => {
                                throw new Error(`API ${error}`);
                            });


                    }).catch(error => {
                        throw new Error(`API ${error}`);
                    });


            }).catch(error => {
                throw new Error(`API ${error}`);
            });


    },




}




const mutations = {
    /**
    * filters all received phases for project id of current project and saves the current phase in state
    * @param phases username the user gives as input in App.vue for registration
    * @param projectId password the user gives as input in App.vue for registration
    * @param state state as parameter for access and manipulation of state data
    */
    LOAD_PHASES(state, phases) {
        //  state.phases_this_project = phases
        let phaseArray = []
        phases.forEach(element => {

            let phaseObject = {
                abschluss: element.attributes.field_abschluss,
                documentationText: element.attributes.field_documentationtext,
                phase_number: element.attributes.field_phase_number,
                assistent: element.relationships.field_assistent.data.id,
                phase_id: element.id,
                title: element.attributes.title,
                projektId: element.relationships.field_projektid.data.id
            }
            // hier vorübergehend in myProjects gepusht, um neuen Login zu testen
            phaseArray.push(phaseObject)
        })

        state.phases_this_project = phaseArray
        console.log(state.phases_this_project)
    },
    LOAD_PHASE(state, currentPhase) {
        console.log(currentPhase.currentPhase)

        state.current_phase = currentPhase.currentPhase
        console.log(state.current_phase)
            ;
    },

    LOAD_SINGLE_PHASE(state, currentPhase) {

        let currentPhaseFlattened = null
        currentPhase.currentPhase.forEach(element => {

            let phaseObject = {
                abschluss: element.attributes.field_abschluss,
                documentationText: element.attributes.field_documentationtext,
                phase_number: element.attributes.field_phase_number,
                assistent: element.relationships.field_assistent.data.id,
                phase_id: element.id,
                title: element.attributes.title,
                projektId: element.relationships.field_projektid.data.id
            }
            // hier vorübergehend in myProjects gepusht, um neuen Login zu testen
            currentPhaseFlattened = phaseObject
        })
        state.current_phase = currentPhaseFlattened
        console.log(currentPhaseFlattened)

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}