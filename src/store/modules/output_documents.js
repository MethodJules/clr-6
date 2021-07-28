import axios from 'axios';

const state = () => ({
    documentations: null,
})
/**
     * 
     * load document from Backend
     */
const actions = {
    async loadOutputDataFromBackend({commit}) {
        await  axios.get('https://clr-backend.x-navi.de/jsonapi/node/outputdateien')
            .then((response) => {
                //console.log(response);
                const data = response.data.data; //TODO: Anpassen wie bei concepts.js so dass hier das Array mit Objekten aufgebaut wird, s. concepts.js Zeile 53
                //console.log(data)
                let outputdata = [];
                for (var i in data) {
                    //console.log(i)
                    outputdata.push({id: data[i].attributes.id, title: data[i].attributes.field_title, file: data[i].relationships.field_output_datei})
                }

                //console.log(documentations)
                commit('SAVE_OUTPUTDATA', outputdata);
                //commit('SAVE_DOCUMENTATION', documentation)
            }).catch(error =>{
                throw new Error(`API ${error}`);
            });

    },
    createOutputData({commit}, outputData) {
        console.log(outputData.output_datei + "  in js creqteoutput")

        commit('ADD_OUTPUTDATA', outputData)

    },

}

const mutations = {
     /**
     * 
     * @param {*} state we send our state to the method
     * @param {*} outputData output document that we are going to use
     * adds a given document to the database
     */
    ADD_OUTPUTDATA(state, outputData) {
        console.log(outputData.output_datei + "  in add_outputdatra")
        var data = `{"data": {"type": "node--outputdateien", "attributes": {"title": "filename", "field_output_datei": "${outputData.output_datei}" }}}`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/outputdateien',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'multipart/form-data',
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
    /**
     * 
     * @param {*} state we send our state to the method
     * @param {*} outputdata output document 
     * sets the output document in our state
     */
    SAVE_DOCUMENTATION(state, outputdata) {
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
        state.outputdata = outputdata
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}