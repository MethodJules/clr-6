import axios from 'axios';

const state = () => ({
    documentations: null,
})

const actions = {
    async loadDocusFromBackend({commit}) {
        await  axios.get('https://clr-backend.x-navi.de/jsonapi/node/documentation')
            .then((response) => {
                //console.log(response);
                const data = response.data.data; //TODO: Anpassen wie bei concepts.js so dass hier das Array mit Objekten aufgebaut wird, s. concepts.js Zeile 53
                //console.log(data)
                let documentations = [];
                for (var i in data) {
                    //console.log(i)
                    documentations.push({idd: data[i].attributes.id, title: data[i].attributes.field_title, documentation: data[i].attributes.field_documentationtext})
                }

                //console.log(documentations)
                commit('SAVE_DOCUMENTATION', documentations);
                //commit('SAVE_DOCUMENTATION', documentation)
            }).catch(error =>{
                throw new Error(`API ${error}`);
            });

    },
    createDocumentation({commit}, docuEntry) {

        commit('ADD_DOCUMENTATION', docuEntry)

    },

}

const mutations = {

    ADD_DOCUMENTATION(state, docuEntry) {
        console.log(docuEntry.documentationText)
        var data = `{"data": {"type": "node--documentation", "attributes": {"title": "Documentation Gruppe + Phase", "field_documentationtext": "${docuEntry.documentationText}" }}}`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/documentation',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
            },
            data: data

        };
        console.log("text");
        axios(config)
            .then(function(response){
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    SAVE_DOCUMENTATION(state, documentations) {
        /*
        documentation.forEach(element => {
            const field_documentationtext = element.attributes.field_documentationtext;
            //console.log(field_documentationtext)
            const field_id = element.id;
            //console.log(element.id)
            const field_title = element.attributes.title;
            //console.log(element.id)
            state.rowData.push( { documentation: field_documentationtext, idd: field_id, title: field_title })
            //console.log(state)
        });
        */
        //console.log(documentations)
        state.documentations = documentations
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}