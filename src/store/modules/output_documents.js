import axios from "@/config/custom_axios";
// const urlBackend = "https://clr-backend.x-navi.de"

const state = () => ({
    outputs: [], // we are using this array to store the file names and sizes only
})

const getters = {
    /**
     * Getter to bringuploaded files in outputs array.
     * @param state our state
     * @returns files, uploaded files in state
     * we send them reversed in order to see the last uploaded on top.
     */
    getOutputs(state) {
        let files = state.outputs;
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
     * 'outputs' array from the state is exchanged with the 'outputarrayPayload' array from the action method 'loadOutputdocumentsFromBackend'
     */

    LOAD_FILES_TO_STATE_FROM_BACKEND(state, outputarrayPayload) {
        state.outputs = outputarrayPayload;
    },

    /**
      *
      * @param state our state which we used to add a new inputdocument.
      * @param file uploaded file will be pushed to the state
      */

    UPDATE_OUTPUTS(state, file) {
        state.outputs.push(file);
    },


    /**
     *
     * @param state we send our state to the method
     * @param payload file that we are going to delete
     *
     * Deletes the file from state
     */
    deleteOutput(state, payload) {
        state.outputs.splice(payload.index, 1);
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
 * In this action method, we load the uploaded outputdocuments from backend filtered by the right phase id. For this load method, we included
 * the entity reference to file, in order to get the information about the file size and file url.
 */
    async loadOutputdocumentsFromBackend({ rootState, commit }) {
        commit("UPDATE_TAB_ELEMENTS_LOADING", true, { root: true })
        var phaseId = rootState.project_phases.current_phase.phase_id
        var config = {
            method: 'get',
            url: `jsonapi/node/outputdateien?include=field_output_datei&filter[field_phasenid.id]=${phaseId}`,
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
                let fileDataId = response.data.data; // the fileDataId from node --outputdateien
                /*
               We initialize an empty array here, so that the objects (payload), that are fetched one after the other from the backend
               with the foreach loop are pushed one after the other in the initialized array 'outputarrayPayload'. This means that the
               array does not remain empty. The array consists of the file objects, from the backend.
               */
                var outputarrayPayload = []
                for (let index = 0; index < files.length; index++) {
                    let payload = {
                        dataId: fileDataId[index].id, // id of document from node outputdateien
                        id: files[index].id, // included data --> file-file
                        name: files[index].attributes.filename, // included data --> file-file
                        size: files[index].attributes.filesize, // included data --> file-file
                        url: urlBackend + files[index].attributes.uri.url, // included data --> file-file
                    }
                    outputarrayPayload.push(payload)
                }
                //this array 'outputarrayPayload' is passed as a parameter in the mutation method
                commit('LOAD_FILES_TO_STATE_FROM_BACKEND', outputarrayPayload);
                commit("UPDATE_TAB_ELEMENTS_LOADING", false, { root: true })
            })
            .catch(function (error) {
                let leeresOutputArray = []
                commit('LOAD_FILES_TO_STATE_FROM_BACKEND', leeresOutputArray);
                commit("UPDATE_TAB_ELEMENTS_LOADING", false, { root: true })
            })
    },
    /**
    * @param dispatch dispatch is used to call another action from this function
    * @param rootState rootState allows access to states of other modules in store
    * @param files files to upload
     *
     * uploads every file from files array to drupal backend and calls addOutputDocument for every file, which links the content type outputDocument to the file
     *
     */
    async uploadFilesToDatabase({ dispatch, rootState }, files) {
        // sende state
        // commit("uploadFilesToState", files);

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

                    //commit('SAVE_FILES', { file });
                    let payload = {
                        file: file,
                        id: response.data.data.id
                    }
                    dispatch('addOutputDocument', payload);

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
 * saves every uploaded file as a relation in the content type outputdocuments
 */
    addOutputDocument({ rootState, commit }, payload) {
        var phaseId = rootState.project_phases.current_phase.phase_id
        var title = payload.file.name
        var data = `{
            "data": {
                "type": "node--outputdateien", 
                "attributes": {
                    "title": "${title}"
                },
                "relationships": {
                    "field_output_datei": {
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
            url: `jsonapi/node/outputdateien?include=field_output_datei`,
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
                commit("UPDATE_OUTPUTS", file);
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
    deleteOutputDocuments({ rootState, commit }, payload) {
        commit('deleteOutput', payload);
        var config = {
            method: 'delete',
            url: `jsonapi/node/outputdateien/${payload.output.dataId}`,

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
