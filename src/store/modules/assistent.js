import axios from 'axios';

const state = {
    assistentsArray: [
        // Es gibt alle assistent fields in this array
    ],
    assistentsAll: []
}


const getters = {
    getAssistentText(state) {
        console.log("hello from assistent getter::::::::::::::::::::")
        console.log(state.assistentsArray);
        return state.assistentsArray;

    }
}

const actions = {
    async loadAssistentArrayFromBackend({ commit }) {
        await axios.get('https://clr-backend.x-navi.de/jsonapi/node/assistententext/')
            .then((response) => {

                const newData = response.data.data;

                commit('SAVE_NEW_ASSISTENT_ARRAY', newData);

            }).catch(error => {

                throw new Error(`API ${error}`);

            });

    },
    async loadAssistentFromBackend({ commit }) {
        await axios.get('https://clr-backend.x-navi.de/jsonapi/node/assistententext/595f3448-168d-4979-80b3-b96e9ef84885?resourceVersion=id%3A191')
            .then((response) => {
                console.log("RESPOMNS::::::::::::::::::::::::::::::::::::::::::::")
                console.log(response);
                // How to deal with html tags???
                const text = response.data.data.attributes.body.value;
                const title = response.data.data.attributes.title;
                const data = {
                    title,
                    text,
                }
                commit('SAVE_NEW_ASSISTENT', data);

            }).catch(error => {

                throw new Error(`API ${error}`);

            });

    },

}



const mutations = {


    SAVE_NEW_ASSISTENT_ARRAY(state, data) {
        // Because of push, it adds new elements to the array at each renew of the page ????
        data.forEach(element => {
            console.log("For each");
            let assistentTitle = element.attributes.title;
            let assistentText = element.attributes.body.value;
            let assistentId = element.id;


            state.assistentsAll.push({ id: assistentId, title: assistentTitle, text: assistentText });

        });


    },

    SAVE_NEW_ASSISTENT(state, data) {
        console.log(data);
        state.assistentsArray = data;


    }
}




export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}