import axios from "@/config/custom_axios";
//TODO: comments
const state = () => ({
    // used when creating all new phases for a project
    //also used for positioning of phase bubbles in reviewcircle
    project_phases: [
        {
            phase_number: 0,
            phase_name: 'Gruppe bilden',
            angle: 295,
            label: "Gruppe Bilden",
            labelPosition: "top",
            iconType: "people",
        },
        {
            phase_number: 1,
            phase_name: 'Ziel & Umfang definieren',
            angle: 336.42,
            label: "Ziel und Umfang definieren",
            labelPosition: "right",
            iconType: "signpost-split",
        },
        {
            phase_number: 2,
            phase_name: 'Konzepte & Definitionen identifizieren',
            angle: 17.84,
            label: "Konzepte & Definition identifizieren",
            labelPosition: "right",
            iconType: "diagram3",
        },
        {
            phase_number: 3,
            phase_name: 'Literatur suchen',
            angle: 64.26,
            label: "Literatur suchen",
            iconType: "book",
        },
        {
            phase_number: 4,
            phase_name: 'Daten extrahieren',
            angle: 115.68,
            label: "Daten extrahieren",
            iconType: "arrow-left-right",
        },
        {
            phase_number: 5,
            phase_name: 'Literatur analysieren & synthetisieren',
            angle: 162.1,
            label: "Literatur analysieren & synthetisieren",
            labelPosition: "left",
            iconType: "vector-pen",
        },
        {
            phase_number: 6,
            phase_name: 'Ergebnisse kommunizieren',
            angle: 203.52,
            label: "Ergebnisse kommunizieren",
            labelPosition: "left",
            iconType: "card-checklist",
        },
        {
            phase_number: 7,
            phase_name: 'Gruppe auflösen',
            angle: 245,
            label: "Gruppe Auflösen",
            labelPosition: "top",
            iconType: "columns-gap",
        }
    ],
    project_phases_this_project: [],
    current_phase: {}
})

const getters = {

    /**
* @param state state as parameter for access and manipulation of state data
 * takes all phases in "project_phases_this_project", gotten with loadPhasesFromBackend from Backend and sorts them first, then puts some additional info from project_phases and returns a new array to project_phases_this_project
 * these phases can now be used for reviewcircle etc.
*/
    getPhasesOfProject(state) {
        let sorted_array = [];
        let phases = [];
        //sorts array, so that phases.phase_numbers are ascending from 0-7
        sorted_array = state.project_phases_this_project.sort(function (a, b) {
            return a.phase_number - b.phase_number;
        });

        let info = state.project_phases;
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
            phases.push(phase);

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
    * @param rootState rootState allows access to states of other modules in store
    */
    async loadPhasesFromBackend({ commit, rootState }, projectId) {
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


    /**
    * @param state state as parameter for access and manipulation of state data
    * @param dispatch dispatch is used to call another action from this function
    * @param rootState rootState allows access to states of other modules in store
    * @param projectId project uuid used for filtering of correct phase
    * @param phase_number phase number used for filtering of correct phase
    * loads a single phase from backend, when user clicks on a phase button in seitennavigation or in reviewcircle, by filtering phases by associated project uuid and phase number of the phase
    * projekt has unique uuid and 8 phases with phase numbers ranging from 0-7, together one unique phase can be found by filtering
    */
    async loadSinglePhaseFromBackend({ commit, rootState, dispatch }, { projectId, phase_number }) {
        commit("loadingStatus", true, { root: true })
        var config = {
            method: 'get',
            url: `jsonapi/node/phase_vorgehensmodell?filter[field_projektid.id]=${projectId}&filter[field_phase_number]=${phase_number}&include=field_assistent`,
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
                //loading all data which is connected to a single phase here, instead of mounted of the components, because of better synchronization
                //we keep this initial loading of the reflexion in because
                var IchSicht = "325fd0af-838c-49f5-92d3-2fcc987e6137"
                dispatch("reflexion/loadReflexionFromBackend", IchSicht, { root: true })
                commit("loadingStatus", false, { root: true })
            })
            .catch(function (error) {
                let leeresPhaseArray = []
                commit('LOAD_SINGLE_PHASE', leeresPhaseArray);
            })
    },

    /**
    * @param dispatch dispatch is used to call another action from this function
    * @param rootState rootState allows access to states of other modules in store
    * @param phase phase to close
    * @param open_close_phase boolean. true=open phase; false=close phase
    * cloeses phase or if its already closed opens it up again
    */
    closePhase({ rootState, dispatch }, { phase, open_close_phase }) {
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
            dispatch("loadSinglePhaseFromBackend", { projectId: phase.projektId, phase_number: phase.phase_number })
        }).catch((error) => {
            console.log(error)
        })
    },

    /**
* @param state state as parameter for access and manipulation of state data
* @param rootState rootState allows access to states of other modules in store
* @param id_newly_created_project id of new project
* creates all phases for a newly created project in the backend
*/
    createAllPhasesforNewProject({ state, rootState }, id_newly_created_project) {
        //TODO: refactor with correctly functioning and more elegant for loop
        /*                         
        removed assistent relationship from phase creation because of changes to the data model
        'field_assistent': {
                            'data': { 'type': 'node--assistent', 'id': `${assistent_id}` }
                        }, */
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
        axios(config)
            .then((response) => {

                //phase 1
                data = phase_array[1]
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
                axios(config)
                    .then((response) => {

                        //phase 2
                        data = phase_array[2]

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
                        axios(config)
                            .then((response) => {

                                //phase 3
                                data = phase_array[3]


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

                                axios(config)
                                    .then((response) => {

                                        //phase 4
                                        data = phase_array[4]


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

                                        axios(config)
                                            .then((response) => {

                                                //phase 5
                                                data = phase_array[5]


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

                                                axios(config)
                                                    .then((response) => {

                                                        //phase 6
                                                        data = phase_array[6]


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

                                                        axios(config)
                                                            .then((response) => {

                                                                //phase 7
                                                                data = phase_array[7]


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

                                                                axios(config)
                                                                    .then((response) => {



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


    /**
* @param rootState rootState allows access to states of other modules in store
* @param documentationText new documentation text
* updates the documentation of a phase
*/
    updateDocumentation({ rootState }, documentationText) {
        console.log(documentationText)
        const text = documentationText.replace(/(\r\n|\r|\n)/g, '<br>')
        console.log(text)
        var phaseId = rootState.project_phases.current_phase.phase_id
        var data = `{
                "data": {
                    "type": "node--phase_vorgehensmodell", 
                    "id": "${phaseId}",
                    "attributes": { 
                        "field_documentationtext": "${text}" 
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

    /**
    * @param documentationText documentation text to put into state
    * @param state state as parameter for access and manipulation of state data
    * documentation put into state, after updating the documentation
    */
    UPDATE_DOCUMENTATION(state, documentationText) {
        state.current_phase.documentationText = documentationText
    },

    /**
    * @param phases all 8 phases linked to the current project
    * @param state state as parameter for access and manipulation of state data
    * puts all 8 phases of the current project into state
    */
    LOAD_PHASES(state, phases) {
        //  state.project_phases_this_project = phases
        let phaseArray = []
        phases.forEach(element => {

            let phaseObject = {
                abschluss: element.attributes.field_abschluss,
                documentationText: element.attributes.field_documentationtext,
                phase_number: element.attributes.field_phase_number,
                // assistent: element.relationships.field_assistent.data.id,
                phase_id: element.id,
                title: element.attributes.title,
                projektId: element.relationships.field_projektid.data.id
            }
            phaseArray.push(phaseObject)
        })
        state.project_phases_this_project = phaseArray
    },

    /**
* @param currentPhase single and current phase
* @param state state as parameter for access and manipulation of state data
* saves all data from single/current phase in state. called from "loadSinglePhaseFromBackend"
*/
    LOAD_SINGLE_PHASE(state, currentPhase) {
        let currentPhaseFlattened = null
        currentPhase.currentPhase.forEach(element => {

            let phaseObject = {
                abschluss: element.attributes.field_abschluss,
                documentationText: element.attributes.field_documentationtext.replace(/<br>/gi, '\n'),
                phase_number: element.attributes.field_phase_number,
                // assistent: element.relationships.field_assistent.data.id,
                phase_id: element.id,
                title: element.attributes.title,
                projektId: element.relationships.field_projektid.data.id
            }
            currentPhaseFlattened = phaseObject
        })
        state.current_phase = currentPhaseFlattened
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}