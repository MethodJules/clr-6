import axios from 'axios';

const state = () => ({
    listOfTools: [

    ]
})
const actions={
    async loadToolFromBackend({commit}) {
        await  axios.get('https://clr-backend.x-navi.de/jsonapi/node/tools')
            .then((response) => {
                //console.log(response);
                const data = response.data.data;

                commit('SAVE_NEW_TOOL', data);
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
    ADD_NEW_TOOL(state, toolEntry) {

        var data = `{"data": {"type": "node--tools", "attributes": {"title": "neu eingefügtes tool", "field_tool": "${toolEntry.tool}" }}}`;
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
    SAVE_NEW_TOOL(state, tool) {

        tool.forEach(element => {
            const field_tool = element.attributes.field_tool;
            //console.log(field_tool)
            const field_id = element.id;
           //console.log(element.id)
            const field_title = element.attributes.title;
            //console.log(element.id)
            state.listOfTools.push( { tool: field_tool, idd: field_id, title: field_title })
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