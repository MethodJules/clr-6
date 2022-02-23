import axios from "@/config/custom_axios";


const state = () => ({
    listOfTools: [
    ]//we are using this array to store the used tools and upload the titles of the tools to database 
})

const getters = {
    /**
     * Getter to bring uploaded tools in listofTools array. 
     * @param state our state
     * @returns tools, uploaded tools in state
     */
    getTools(state) {

        let tools = state.listOfTools;
        return tools;
    },

}



const actions = {

    /**
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* to load the saved tools from backend
*/
    async loadToolsFromBackend({ commit, rootState }) {
        commit("UPDATE_TAB_ELEMENTS_LOADING", true, { root: true })
        var phaseId = rootState.project_phases.current_phase.phase_id
        var config = {
            method: 'get',
            url: `jsonapi/node/tools?filter[field_phasenid.id]=${phaseId}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };
        axios(config)
            .then(function (response) {
                //TODO: check if this still happens
                //if one of the tools has null in tool.relationships.field_phasenid.data.id -> breaks and no tools displayed
                const toolsFromBackend = response.data.data;
                commit('SAVE_TOOLS', toolsFromBackend);
                commit("UPDATE_TAB_ELEMENTS_LOADING", false, { root: true })
            })
            .catch(function (error) {
                console.log(error)
            })

    },
    /**
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* @param toolEntry tool to be created
* method to add a new tool to backend
*/
    createTool({ commit, rootState }, toolEntry) {
        var phaseId = rootState.project_phases.current_phase.phase_id
        var data = `
        {
            "data": {
                "type": "node--tools", 
                "attributes": {
                    "title": "${toolEntry.usedTool}"
                },
                "relationships": {
                    "field_phasenid": {
                        "data": {
                            "type": "node--phase_vorgehensmodell",
                            "id": "${phaseId}"
                        }
                    }
                }
            }
        }`;
        var config = {
            method: 'post',
            url: `jsonapi/node/tools`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
            data: data

        };
        return axios(config)
            .then((response) => {
                commit('SAVE_NEW_TOOL_IN_FRONTEND', response.data.data);
            }).catch(function (error) {
                console.log(error);
            });
    },

    /**
* @param rootState rootState allows access to states of other modules in store
* @param toolEntry tool to be updated
* method to update a tool in backend
*/
    updateToolWithCheckbox({ rootState }, toolEntry) {
        var data = `
        {
            "data": {
                "type": "node--tools", 
                "id": "${toolEntry.uuid}",
                "attributes": {
                    "field_benutzt": ${toolEntry.benutzt}                  
                }
            }
        }`;
        var config = {
            method: 'patch',
            url: `jsonapi/node/tools/${toolEntry.uuid}`,
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

}
const mutations = {

    /**
    * @param state our state
    * @param singleTool single tool to be saved in state
    */
    SAVE_NEW_TOOL_IN_FRONTEND(state, singleTool) {
        state.listOfTools.push({ uuid: singleTool.id, title: singleTool.attributes.title, benutzt: singleTool.attributes.field_benutzt })
    },

    /**
     * @param state our state
     * @param tools single tool to be saved in state
     uploads the tools to the state for displaying the tools to Frontend
     */
    SAVE_TOOLS(state, tools) {
        var leeresToolArray = [];
        tools.forEach(element => {
            const field_id = element.id;
            const field_title = element.attributes.title;
            const field_benutzt = element.attributes.field_benutzt;
            leeresToolArray.push({ uuid: field_id, title: field_title, benutzt: field_benutzt })
        });
        state.listOfTools = leeresToolArray;
    }

}
export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}