import axios from 'axios';

const state = () => ({
    listOfTools: [

    ]//we are using this array to store the used tools and upload the titles of the tools to database 
})


/*  
    * to load the saved tools in database 
    */ 
const actions={
    async loadToolsFromBackend({commit, rootState}, {projectId}) {

 
        await  axios.get('https://clr-backend.x-navi.de/jsonapi/node/tools')
            .then((response) => {
                console.log(response);                                                                                                                                                                         
                
                const data = response.data.data;
                console.log(response.data.data)
                let tools = []
                let current_phase_ID=rootState.phases.current_phase
                let current_project_ID=rootState.phases.current_phase.relationships.field_projektid.data.id
                console.log(current_phase_ID)
                for(let tool of data){
                   if (tool.relationships.field_phasenid.data.id==current_phase_ID.id && current_project_ID == projectId){
                       tools.push(tool)
                    }
                }
                

                commit('SAVE_TOOLS', tools);
                //commit('SAVE_NEW_TOOL', tool)
            }).catch(error =>{
                throw new Error(`API ${error}`);
            });

    },
    createTool({commit}, toolEntry) {
        //console.log(toolEntry.tool)
        commit('ADD_NEW_TOOL', toolEntry)

    },

}
const mutations={
    /*  
    *  
    * method to add a new tool to database 
    */ 
    ADD_NEW_TOOL(state, toolEntry) {

        var data = `{"data": {"type": "node--tools", "attributes": {"title": "${toolEntry.tool}"}}}`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/tools',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
            },
            data: data

        };

        axios(config)
            .then(function(response){
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    /*  
    uploads the title of the tools to the state 
    */ 
    SAVE_TOOLS(state, tools) {

        tools.forEach(element => {
            //console.log(field_tool)
            const field_id = element.id;
           //console.log(element.id)
            const field_title = element.attributes.title;
            //console.log(element.id)
            state.listOfTools.push( { idd: field_id, title: field_title })
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