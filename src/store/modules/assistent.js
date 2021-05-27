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
            .then(function(response) {
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}