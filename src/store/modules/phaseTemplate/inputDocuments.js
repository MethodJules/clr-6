import axios from "@/config/custom_axios";

const state = () => ({
    inputs: [], // we are using this array to store the file names and sizes only in state



})

const getters = {
    /**
     * Getter to bring uploaded files in inputs array to state. 
     * @param state our state
     * @returns files, uploaded files in state
     */
    getInputs(state) {
        let files = state.inputs;
        return files;
    },

}

const mutations = {

    /**
     * 
     * @param state we send our state to the method, in order to load the uploaded files to state from backend
     * @param {array} inputarrayPayload array with the fileobjects(payload) that we are going to use 
     * 
     * uploads the name, size and url of the fileobject (payload) in the array 'inputarrayPayload' to the state. 
     * 'inputs' array from the state will be exchanged with the 'inputarrayPayload' array from the action method 'loadInputdocumentsFromBackend' 
     * 
     */

    LOAD_FILES_TO_STATE_FROM_BACKEND(state, inputarrayPayload) {
        state.inputs = inputarrayPayload;
    },

    /**
     * 
     * @param state our state which we used to add a new inputdocument.
     * @param file uploaded file will be pushed to the state
     */

    UPDATE_INPUTS(state, file) {
        state.inputs.push(file);
    },

    /**
     * 
     * @param state we send our state to the method, where uploaded files exist.
     * @param payload file that we are going to delete
     * 
     * Deletes the file from state
     */
    deleteInput(state, payload) {
        state.inputs.splice(payload.index, 1);
    },

    // TODO: Comment for this ? 

    setOkButtonClicked(state, isClicked) {
        state.okButtonClicked = isClicked;
    }
}

const actions = {

    /**
     * @param commit commit is used to call a mutation from this function
     * @param rootState rootState allows access to states of other modules in store
     * In this action method, we load the uploaded inputdocuments from backend filtered by the right phase id. For this load method, we included 
     * the entity reference to file, in order to get the information about the file size and file url.
     */

    async loadInputdocumentsFromBackend({ rootState, commit }) {
        commit("UPDATE_TAB_ELEMENTS_LOADING", true, { root: true })
        var phaseId = rootState.project_phases.current_phase.phase_id
        var config = {
            method: 'get',
            url: `jsonapi/node/inputdateien?include=field_documentid&filter[field_phasenid.id]=${phaseId}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };

        axios(config)
            .then(function (response) {
                const urlBackend = axios.defaults.baseURL;
                let files = response.data.included; // id, name, size and url of file from node file-file
                let fileId = response.data.data; // the dataId of document from node --inputdateien

                /* 
                We initialize an empty array here, so that the objects (payload), that are fetched one after the other from the backend 
                with the foreach loop are pushed one after the other in the initialized array 'inputarrayPayload'. This means that the 
                array does not remain empty. If Wenn die dokumente im response vorhanden sind (im Backend existieren in der jeweiligen Phase), wenn kein dokument angelegt 
                ist, bleibt das array leer.
                The array consists of the file objects, from the backend.
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
                commit("UPDATE_TAB_ELEMENTS_LOADING", false, { root: true })
            })
            .catch(function (error) {
                let leeresInputArray = []
                commit('LOAD_FILES_TO_STATE_FROM_BACKEND', leeresInputArray);
                commit("UPDATE_TAB_ELEMENTS_LOADING", false, { root: true })
            })


    },
    /**
    * @param dispatch dispatch is used to call another action from this function
    * @param rootState rootState allows access to states of other modules in store
    * @param files files to upload
     * 
     * uploads every file from files array to drupal backend and calls addInputDocument for every file, which links the content type inputdocuments to the file
     * 
     */
    async uploadFilesToDatabase({ dispatch, rootState }, files) {
        for (const file of files) {
            var config = {
                method: 'post',
                url: `jsonapi/media/document/field_media_document`,
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
                    let payload = {
                        file: file,
                        id: response.data.data.id
                    }
                    return dispatch('addInputDocument', payload);
                })
                .catch(function (error) {
                    if (error.response.status == 422 || error.response.status == 402) {
                        alert("Dieser Dateityp wird nicht unterstützt")
                    } else {
                        console.log(error)
                    }
                })
        }

    },

    /**
     * @param commit commit is used to call a mutation from this function
     * @param rootState rootState allows access to states of other modules in store
     * @param payload payload is exactly one file object
     * saves every uploaded file as a relation in the content type inputdocuments
     */
    addInputDocument({ rootState, commit }, payload) {
        var phaseId = rootState.project_phases.current_phase.phase_id
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
            url: `jsonapi/node/inputdateien?include=field_documentid`,
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
                const urlBackend = axios.defaults.baseURL;
                let file = {
                    name: payload.file.name,
                    size: payload.file.size,
                    id: response.data.data.id,
                    url: urlBackend + response.data.included[0].attributes.uri.url
                }
                commit("UPDATE_INPUTS", file);
            })
            .catch(function (error) {
                if (error.response.status == 422 || error.response.status == 402) {
                    alert("Dieser Dateityp wird nicht unterstützt")
                } else {
                    console.log(error)
                }
            })

    },

    /**
     * @param commit commit is used to call a mutation from this function
     * @param rootState rootState allows access to states of other modules in store
     * @param payload payload is exactly one file object
     * deletes file from backend and deletes it from state
     */
    deleteInputDocuments({ rootState, commit }, payload) {
        commit('deleteInput', payload);
        var config = {
            method: 'delete',
            url: `jsonapi/node/inputdateien/${payload.input.dataId}`,

            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };
        axios(config)
            .then((response) => {
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