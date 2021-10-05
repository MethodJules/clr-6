import axios from 'axios';

const state = () => ({
    listOfTools: [

    ]//we are using this array to store the used tools and upload the titles of the tools to database 
})

const getters = {
    /**
     * Getter to bringuploaded files in inputs array. 
     * @param state our state
     * @returns files, uploaded files in state
     * we send them reversed in order to see the last uploaded on top.
     */
    getTools(state) {

        let tools = state.listOfTools;
        return tools;
    },

}


/*  
    * to load the saved tools in database 
    */
const actions = {
    async loadToolsFromBackend({ commit, rootState }, { projectId }) {
        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/jsonapi/node/tools?filter[field_phasenid.id]=${phaseId}`,
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
                const tool = response.data.data;
                console.log(response.data.data)
                let tools = []
                let current_phase_ID = rootState.phases.current_phase
                let current_project_ID = rootState.phases.current_phase.relationships.field_projektid.data.id
                console.log(current_phase_ID)
                for (let tool of data) {
                    if (tool.relationships.field_phasenid.data.id == current_phase_ID.id && current_project_ID == projectId) {
                        tools.push(tool)
                    }
                }
                commit('SAVE_TOOLS', tool);
            })
            .catch(function (error) {
                console.log(error)
            })

    },

    // method to add a new tool to database 
    createTool({ state, rootState }, toolEntry) {
        var phaseId = rootState.phases.current_phase.phase_id
        console.log(phaseId)
        console.log(toolEntry)
        var data = `
        {
            "data": {
                "type": "node--tools", 
                "attributes": {
                    "title": "Tool",
                    "field_tool": "${toolEntry.usedTool}"
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
            url: 'https://clr-backend.x-navi.de/jsonapi/node/tools',
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


    /*  
    uploads the tools to the state for displaying the tools to Frontend
    */
    SAVE_TOOLS(state, tool) {

        tool.forEach(element => {
            //console.log(field_tool)
            const field_tool = element.attributes.field_tool;
            const field_id = element.id;
            //console.log(element.id)
            const field_title = element.attributes.title;
            //console.log(element.id)
            state.listOfTools.push({ idd: field_id, title: field_title, tool: field_tool })
            //console.log(state)




        });
    }

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}