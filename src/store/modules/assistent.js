import axios from "@/config/custom_axios";


const state = {
    assistentsArray: [
        // Es gibt alle assistent fields in this array
    ],
    assistentsAll: [],
    assistentData: [],
}


const getters = {
    getAssistentText(state) {

        return state.assistentsArray;

    }
}

const actions = {
    async loadAssistentArrayFromBackend({ commit }) {
        await axios.get('jsonapi/node/assistententext/')
            .then((response) => {

                const newData = response.data.data;

                commit('SAVE_NEW_ASSISTENT_ARRAY', newData);

            }).catch(error => {

                throw new Error(`API ${error}`);

            });

    },
    async loadAssistentFromBackend({ commit }) {
        await axios.get('jsonapi/node/assistententext/595f3448-168d-4979-80b3-b96e9ef84885?resourceVersion=id%3A191')
            .then((response) => {


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
    getData({ commit }) {
        axios.get('jsonapi/node/assistententext/')
            .then((response) => {
                //const data = response.data.data;
                console.log(response.data.data);
                commit('getData', response.data.data);
            }).catch((error) => {
                throw new Error(`API ${error}`);
            })
    }

}

const mutations = {
    SAVE_NEW_ASSISTENT_ARRAY(state, data) {
        data.forEach(element => {
            console.log("For each");
            let assistentTitle = element.attributes.title;
            let assistentText = element.attributes.body.value;
            let assistentId = element.id;

            state.assistentsAll.push({ id: assistentId, title: assistentTitle, text: assistentText });

        });


    },

    SAVE_NEW_ASSISTENT(state, data) {
        state.assistentsArray = data;

    },
    ADD_ASSISTENT_HT(state, assistentEntry) {

        var data = `{"data": {"type": "node--assistent", "attributes": {"title": "Assistent Titel", "field_hilfstext": "${assistentEntry.hilfstext}"}}}`;
        var config = {
            method: 'post',
            url: 'jsonapi/node/assistent',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
            },
            withCredentials: true,
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
    getData(state, data) {
        console.log(data);
        state.assistentData.push(...data);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
