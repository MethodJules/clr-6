import axios from 'axios';

const state = () => ({
    assistents: [
        //{hilfstext: " "},
    ]

})
const actions={
    async loadAssistentFromBackend({commit}) {
        await  axios.get('https://clr-backend.x-navi.de/jsonapi/node/assistent')
            .then((response) => {
                //console.log(response);
                const data = response.data.data;
                // let assistent = []
                commit('SAVE_NEW_ASSISTENT', data);

            }).catch(error =>{
                throw new Error(`API ${error}`);
            });

    },
    createHilfstext({commit}, assistentEntry) {
        
        commit('ADD_ASSISTENT_HT', assistentEntry)

    },

}
const mutations={
    ADD_ASSISTENT_HT(state, assistentEntry) {
    
        var data = `{"data": {"type": "node--assistent", "attributes": {"title": "Assistent Titel", "field_hilfstext": "${assistentEntry.hilfstext}"}}}`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/assistent',
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

    SAVE_NEW_ASSISTENT(state, hilfstext) {

        hilfstext.forEach(element => {


            const field_hilfstext = element.attributes.field_hilfstext;
            //console.log(field_hilfstext)
            const field_id = element.id;
            //console.log(element.id)
            const field_title = element.attributes.title;
            //console.log(element.id)
            state.assistents.push( { hilfstext: field_hilfstext, idd: field_id, title: field_title })
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