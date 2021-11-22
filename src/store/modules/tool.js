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


/*  
    * to load the saved tools from backend
    */
const actions = {
    async loadToolsFromBackend({ commit, rootState }) {
        commit("loadingStatus", true, { root: true })
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
                console.log(response)
                //if one of the tools has null in tool.relationships.field_phasenid.data.id -> breaks and no tools displayed
                const toolsFromBackend = response.data.data;
                commit('SAVE_TOOLS', toolsFromBackend);
                commit("loadingStatus", false, { root: true })
            })
            .catch(function (error) {
                console.log(error)
            })

    },

    // method to add a new tool to backend
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
        axios(config)
            .then((response) => {
                console.log(response);
                commit('SAVE_NEW_TOOL_IN_FRONTEND', response.data.data);

            }).catch(function (error) {
                console.log(error);
            });



    },

    updateToolWithCheckbox({ rootState, state }, toolEntry) {

        var phaseId = rootState.project_phases.current_phase.phase_id
        console.log(phaseId)
        console.log(toolEntry)


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
                console.log(response);


            }).catch(function (error) {
                console.log(error);
            });



    },

}
const mutations = {


    SAVE_NEW_TOOL_IN_FRONTEND(state, singleTool) {
        state.listOfTools.push({ uuid: singleTool.id, title: singleTool.attributes.title, benutzt: singleTool.attributes.field_benutzt })

    },

    /*  
    uploads the tools to the state for displaying the tools to Frontend
    */
    SAVE_TOOLS(state, tools) {

        var leeresToolArray = [];
        tools.forEach(element => {
            //console.log(field_tool)

            const field_id = element.id;
            //console.log(element.id)
            const field_title = element.attributes.title;
            const field_benutzt = element.attributes.field_benutzt;
            console.log(element.attributes.benutzt)
            leeresToolArray.push({ uuid: field_id, title: field_title, benutzt: field_benutzt })
            //console.log(state)

        });

        state.listOfTools = leeresToolArray;
        console.log(state.listOfTools)
    }

}
export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}