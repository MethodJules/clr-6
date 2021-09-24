import axios from "axios"
// const urlBackend = "https://clr-backend.x-navi.de"

const state = () => ({
    inputs: [], // we are using this array to store the file names and sizes only
    inputsForDatabase: [], // we are going to use this array in order to upload our files to database

})

const getters = {
    /**
     * Getter to bringuploaded files in inputs array. 
     * @param state our state
     * @returns files, uploaded files in state
     * we send them reversed in order to see the last uploaded on top.
     */
    getInputs(state) {

        let files = state.inputs;
        return files;
    },

}

const mutations = {

    /**
     * 
     * @param state we send our state to the method
     * @param {array} inputarrayPayload array with the fileobjects(payload) that we are going to use 
     * 
     * uploads the name, size and url of the fileobject (payload) in the array to the state. 
     * 'inputs' array from the state is exchanged with the 'inputarrayPayload' array from the action method 'loadInputdocumentsFromBackend' 
     * 
     */

    LOAD_FILES_TO_STATE_FROM_BACKEND(state, inputarrayPayload) {
        state.inputs = inputarrayPayload;
        console.log(state.inputs)
        //state.inputs = payload
        /* if (state.inputs.includes(payload)) {
            console.log(payload)

        } else {
            state.inputs.push(payload);
        } */
    },

    UPDATE_INPUTS(state, file) {
        console.log(file)
        state.inputs.push(file);
    },


    /**
     * 
     * @param state we send our state to the method
     * @param payload file that we are going to delete
     * 
     * Deletes the file from state
     */
    deleteInput(state, payload) {
        state.inputs.splice(payload.index, 1);
    },

    setOkButtonClicked(state, isClicked) {
        state.okButtonClicked = isClicked;
    }



}

const actions = {

    async loadInputdocumentsFromBackend({ rootState, commit }) {
        var drupalUserUID = rootState.drupal_api.user.uid;
        var phaseId = rootState.phases.current_phase.phase_id
        console.log(phaseId);
        console.log(rootState.drupal_api);
        console.log(drupalUserUID);

        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/jsonapi/node/inputdateien?include=field_documentid&filter[field_phasenid.id]=${phaseId}`,
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
                const urlBackend = "https://clr-backend.x-navi.de";
                let files = response.data.included; // id, name, size and url of file from node file-file
                let fileId = response.data.data; // the dataId of document from node --inputdateien
                /* 
                
                We initialize an empty array here, so that the objects (payload), that are fetched one after the other from the backend 
                with the foreach loop are pushed one after the other in the initialized array 'inputarrayPayload'. This means that the 
                array does not remain empty. The array consists of the file objects, from the backend.
                */
                let inputarrayPayload = []
                for (let index = 0; index < files.length; index++) {
                    let payload = {
                        dataId: fileId[index].id, // id of document from node inputdateien
                        id: files[index].id, // included data --> file-file
                        name: files[index].attributes.filename, // included data --> file-file
                        size: files[index].attributes.filesize, // included data --> file-file
                        url: urlBackend + files[index].attributes.uri.url, // included data --> file-file
                    }

                    inputarrayPayload.push(payload)
                }



                //this array 'inputarrayPayload' is passed as a parameter in the mutation method
                commit('LOAD_FILES_TO_STATE_FROM_BACKEND', inputarrayPayload);



            })
            .catch(function (error) {
                console.log(error)
            })


    },
    /**
     * 
     * @param state we send our state to method
     * To upload files to database. 
     * 
     */
    async uploadFilesToDatabase({ dispatch, rootState }, files) {

        // sende state
        // commit("uploadFilesToState", files);
        console.log(files);


        var drupalUserUID = rootState.drupal_api.user.uid
        console.log(drupalUserUID)
        for (const file of files) {

            var config = {
                method: 'post',
                url: `https://clr-backend.x-navi.de/jsonapi/media/document/field_media_document`,
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/octet-stream',
                    'Authorization': rootState.drupal_api.authToken,
                    'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
                    'Content-Disposition': 'file; filename="' + file.name + '"',

                },
                data: file
            };
            await axios(config)
                .then(function (response) {
                    console.log(response);
                    console.log(file.name)
                    //commit('SAVE_FILES', { file });
                    let payload = {
                        file: file,
                        id: response.data.data.id
                    }
                    dispatch('addInputDocument', payload);

                })
                .catch(function (error) {
                    console.log(error)
                })
        }

    },

    addInputDocument({ state, rootState, commit }, payload) {

        console.log(state)
        var phaseId = rootState.phases.current_phase.phase_id
        var title = payload.file.name
        var data = `{
            "data": {
                "type": "node--inputdateien", 
                "attributes": {
                    "title": "${title}"
                },
                "relationships": {
                    "field_documentid": {
                        "data": {
                            "type": "file--file",
                            "id": "${payload.id}"
                        }
                        
                    },
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
            url: `https://clr-backend.x-navi.de/jsonapi/node/inputdateien?include=field_documentid`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
            data: data


        };

        axios(config)
            .then(function (response) {
                const urlBackend = "https://clr-backend.x-navi.de";
                let file = {
                    name: payload.file.name,
                    size: payload.file.size,
                    id: response.data.data.id,
                    url: urlBackend + response.data.included[0].attributes.uri.url

                }
                commit("UPDATE_INPUTS", file);
            })
            .catch(function (error) {
                console.log(error)
            })

    },

    deleteInputDocuments({ rootState, commit }, payload) {
        commit('deleteInput', payload);

        console.log(payload.input.dataId);

        var config = {
            method: 'delete',
            url: `https://clr-backend.x-navi.de/jsonapi/node/inputdateien/${payload.input.dataId}`,

            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                //'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
                // 'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };
        axios(config)
            .then((response) => {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });

    },


}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions

}