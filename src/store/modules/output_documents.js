import axios from "axios"
// const urlBackend = "https://clr-backend.x-navi.de"

const state = {
    outputs: [], // we are using this array to store the file names and sizes only
    outputsForDatabase: [], // we are going to use this array in order to upload our files to database
}

const getters = {
    /**
     * Getter to bringuploaded files in outputs array. 
     * @param state our state
     * @returns files, uploaded files in state
     * we send them reversed in order to see the last uploaded on top.
     */
    getOutputs(state) {
        let files = state.outputs.reverse();
        return files;
    },

}

const mutations = {

    /**
     * 
     * @param state we send our state to the method
     * @param {objekt} payload files that we are going to use 
     * 
     * uploads the name of the file to the state. 
     * we need another function to upload the file to the database. We can figure it out when it comes to it. 
     * We have all files at variable files. We can easily send it to the database.
     */

    LOAD_FILES_TO_STATE_FROM_BACKEND(state, payload) {
        state.outputs.push(payload);
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

    setOkButtonClicked(state, isClicked) {
        state.okButtonClicked = isClicked;
    }



}

const actions = {

    async loadOutputdocumentsFromBackend({ rootState, commit }) {
        var drupalUserUID = rootState.drupal_api.user.uid;
        console.log(rootState.drupal_api);
        console.log(drupalUserUID);

        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/jsonapi/node/outputdateien?include=field_output_datei`,
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
                let files = response.data.included;
                files.forEach(file => {
                    let payload = {
                        id: file.id,
                        name: file.attributes.filename,
                        size: file.attributes.filesize,
                        url: urlBackend + file.attributes.uri.url,
                    }
                    commit('LOAD_FILES_TO_STATE_FROM_BACKEND', payload);

                });

            })
            .catch(function (error) {
                console.log(error)
            })


    },
    /**
     * 
     * @param state we send our state to method
     * To upload files to database. 
     * Will be written later.... 
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
                    dispatch('addOutputDocument', payload);

                })
                .catch(function (error) {
                    console.log(error)
                })
        }

    },

    addOutputDocument({ state, rootState, commit }, payload) {

        console.log(state)
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
                        
                    }
                }
                
            }
        }`;

        var config = {
            method: 'post',
            url: `https://clr-backend.x-navi.de/jsonapi/node/outputdateien?include=field_output_datei`,
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
                commit("LOAD_FILES_TO_STATE_FROM_BACKEND", file);
            })
            .catch(function (error) {
                console.log(error)
            })

    },

    deleteOutputDocuments({ rootState, commit }, payload) {
        commit('deleteOutput', payload);

        console.log(payload.output.id);

        var config = {
            method: 'delete',
            url: `https://clr-backend.x-navi.de/jsonapi/node/outputdateien/${payload.output.id}`,

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