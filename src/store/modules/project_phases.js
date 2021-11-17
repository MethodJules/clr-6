import axios from "@/config/custom_axios";
//TODO: comments
const state = () => ({
    // We are using it just when we create a new project I think. 
    // we can merge this array with phasesAdditionalInfo and use only one of them. 
    // I am not doing it because I dont know actually how you use it. 
    // If it would be ok you can do it or ask me to do it. 
    // It would be easier to read the code. 
    project_phases: [
        {
            phase_number: 0,
            phase_name: 'Gruppe bilden',
        },
        {
            phase_number: 1,
            phase_name: 'Ziel & Umfang definieren'
        },
        {
            phase_number: 2,
            phase_name: 'Konzepte & Definitionen identifizieren'
        },
        {
            phase_number: 3,
            phase_name: 'Literatur suchen'
        },
        {
            phase_number: 4,
            phase_name: 'Daten extrahieren'
        },
        {
            phase_number: 5,
            phase_name: 'Literatur analysieren & synthetisieren'
        },
        {
            phase_number: 6,
            phase_name: 'Ergebnisse kommunizieren'
        },
        {
            phase_number: 7,
            phase_name: 'Gruppe auflösen'
        }
    ],

    project_phasesAdditionalInfo: [
        {
            angle: 295,
            label: "Gruppe Bilden",
            labelPosition: "top",
            iconType: "people",
        },
        {
            angle: 336.42,
            label: "Ziel und Umfang definieren",
            labelPosition: "right",
            iconType: "signpost-split",
        },
        {
            angle: 17.84,
            label: "Konzepte & Definition identifizieren",
            labelPosition: "right",
            iconType: "diagram3",
        },
        {
            angle: 64.26,
            label: "Literatur suchen",
            iconType: "book",
        },
        {
            angle: 115.68,
            label: "Daten extrahieren",
            iconType: "arrow-left-right",
        },
        {
            angle: 162.1,
            label: "Literatur analysieren & synthetisieren",
            labelPosition: "left",
            iconType: "vector-pen",
        },

        {
            angle: 203.52,
            label: "Ergebnisse kommunizieren",
            labelPosition: "left",
            iconType: "card-checklist",
        },
        {
            angle: 245,
            label: "Gruppe Auflösen",
            labelPosition: "top",
            iconType: "columns-gap",
        },
    ],
    project_phases_this_project: [],
    current_phase: {}


})

const getters = {
    getPhasesOfProject(state) {
        let sorted_array = [];
        let phases = [];
        sorted_array = state.project_phases_this_project.sort(function (a, b) {
            return a.phase_number - b.phase_number;
        });

        let info = state.project_phasesAdditionalInfo;
        for (let index = 0; index < sorted_array.length; index++) {
            let phase = {
                angle: info[index].angle,
                label: sorted_array[index].title,
                text: sorted_array[index].documentationText,
                done: sorted_array[index].abschluss,
                labelPosition: info[index].labelPosition,
                iconType: info[index].iconType,
                phaseNumber: sorted_array[index].phase_number,
                id: sorted_array[index].phase_id,
            }
            phases.push(phase)

        }
        state.project_phases_this_project = phases;
        return state.project_phases_this_project;
    }
}

const actions = {

    /**
     * loads all phases from backend, passes loaded phases and projectID to mutation
    * @param projectId projectID of current project
    * @param commit commit us used to call a mutation from this function
    * @param state state as parameter for access and manipulation of state data
    */
    async loadPhasesFromBackend({ commit, rootState }, projectId) {
        console.log(projectId)
        var config = {
            method: 'get',
            url: `jsonapi/node/phase_vorgehensmodell?filter[field_projektid.id]=${projectId}`,
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



    async loadSinglePhaseFromBackend({ commit, state, rootState, dispatch }, { projectId, phaseId }) {
        commit("loadingStatus", true, { root: true })
        console.log(phaseId)
        console.log(state)
        var config = {
            method: 'get',
            url: `jsonapi/node/phase_vorgehensmodell?filter[field_projektid.id]=${projectId}&filter[field_phase_number]=${phaseId}&include=field_assistent`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };
        axios(config)
            .then(function (response) {
                const currentPhase = response.data.data;
                commit('LOAD_SINGLE_PHASE', { currentPhase });
                console.log(state.current_phase)
                //loading all data which is connected to a single phase here, instead of mounted of the components, because of better synchronization
                //we keep this initial loading of the reflexion in because
                var IchSicht = "325fd0af-838c-49f5-92d3-2fcc987e6137"
                dispatch("reflexion/loadReflexionFromBackend", IchSicht, { root: true })
                commit("loadingStatus", false, { root: true })
            })
            // Leeres Array gepackt, damit keine alte Phase im State ist; TODO/Vllt: Route zur Startseite

            .catch(function (error) {
                let leeresPhaseArray = []
                console.log(error)
                commit('LOAD_SINGLE_PHASE', leeresPhaseArray);

            })


    },

    closePhase({ commit, rootState, dispatch }, { phase, open_close_phase }) {
        // commit("CLOSE_PHASE", phase);
        console.log(phase)
        console.log(phase.abschluss)
        // DATABASE REACTIONS
        var data = `{"data":{
            "type":"node--phase_vorgehensmodell", 
            "id": "${phase.phase_id}", 
            "attributes": { 
                "field_abschluss": ${open_close_phase}
            }}}`;

        var config = {
            method: 'patch',
            url: `jsonapi/node/phase_vorgehensmodell/${phase.phase_id}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
            data: data
        };
        axios(config).then((response) => {
            console.log(response)
            console.log(phase.projektId)
            console.log(phase.phase_number)
            console.log(response.data.data.attributes.field_phase_number)
            console.log(response.data.data.relationships.field_projektid.data.id)
            dispatch("loadSinglePhaseFromBackend", { projectId: phase.projektId, phaseId: phase.phase_number })
        }).catch((error) => {
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
        //TODO: remove basic assistent?

        //json.stringify hier eigtl nicht nötig

        var phase_array = []
        for (var i = 0; i <= 7; i++) {


            let data = JSON.stringify({
                "data": {
                    'type': 'node--phase_vorgehensmodell',
                    "attributes": {
                        "title": `${state.project_phases[i].phase_name}`,
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
            url: 'jsonapi/node/phase_vorgehensmodell',
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
                    url: 'jsonapi/node/phase_vorgehensmodell',
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
                            url: 'jsonapi/node/phase_vorgehensmodell',
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
                                    url: 'jsonapi/node/phase_vorgehensmodell',
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
                                            url: 'jsonapi/node/phase_vorgehensmodell',
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
                                                    url: 'jsonapi/node/phase_vorgehensmodell',
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
                                                            url: 'jsonapi/node/phase_vorgehensmodell',
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
                                                                    url: 'jsonapi/node/phase_vorgehensmodell',
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
    updateDocumentation({ state, rootState }, documentationText) {

        var phaseId = rootState.project_phases.current_phase.phase_id

        var data = `{
                "data": {
                    "type": "node--phase_vorgehensmodell", 
                    "id": "${phaseId}",
                    "attributes": { 
                        "field_documentationtext": "${documentationText}" 
                    }                 
                }
            }`;

        var config = {
            method: 'patch',
            url: `jsonapi/node/phase_vorgehensmodell/${phaseId}`,
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


    UPDATE_DOCUMENTATION(state, documentationText) {

        //console.log(state.current_phase)

        state.current_phase.documentationText = documentationText
        console.log(state.current_phase)
    },
    /**
    * filters all received phases for project id of current project and saves the current phase in state
    * @param phases username the user gives as input in App.vue for registration
    * @param projectId password the user gives as input in App.vue for registration
    * @param state state as parameter for access and manipulation of state data
    */
    LOAD_PHASES(state, phases) {
        console.log(phases);
        //  state.project_phases_this_project = phases
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

        state.project_phases_this_project = phaseArray
        console.log(state.project_phases_this_project)
    },
    /*     LOAD_PHASE(state, currentPhase) {
            console.log(currentPhase.currentPhase)
    
            state.current_phase = currentPhase.currentPhase
            console.log(state.current_phase)
                ;
        }, */

    LOAD_SINGLE_PHASE(state, currentPhase) {
        console.log(currentPhase)

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
        console.log(state.current_phase)

    },

    CLOSE_PHASE(state, phase) {
        state.project_phases_this_project[phase.phase_number].done = true;

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}