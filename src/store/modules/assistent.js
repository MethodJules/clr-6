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

}
const mutations={

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