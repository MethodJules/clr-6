import axios from "axios"

const state = {
    inputs: [], // we are using this array to store the file names and sizes only
    inputsForDatabase: [], // we are going to use this array in order to upload our files to database
    file: ''
}

const getters = {
    /**
     * Getter to bringuploaded files in inputs array. 
     * @param state our state
     * @returns files, uploaded files in state
     * we send them reversed in order to see the last uploaded on top.
     */
    getInputs(state) {
        let files = state.inputs.reverse();
        return files;
    },

}

const mutations = {

    /**
     * 
     * @param state we send our state to the method
     * @param files files that we are going to use 
     * 
     * uploads the name of the file to the state. 
     * we need another function to upload the file to the database. We can figure it out when it comes to it. 
     * We have all files at variable files. We can easily send it to the database.
     */

    uploadFilesToState(state, files) {
        console.log("files in commit")
        console.log(files)
        // this line uploads the files to inputsForDatabase for database reactions
        state.inputsForDatabase.push(files);
        // after here we are storing data to state
        files.forEach(element => {
            let file = {
                name: element.name,
                size: element.size
            };
            state.inputs.push(file);

        });
    },
    /**
     * 
     * @param state we send our state to the method
     * @param index index of the file that we are going to delete
     * 
     * Deletes the file from state
     */
    deleteInput(state, index) {

        state.inputs.splice(index, 1);

    },

    setOkButtonClicked(state, isClicked) {
        state.okButtonClicked = isClicked;
    }



}

const actions = {
    /**
     * 
     * @param state we send our state to method
     * To upload files to database. 
     * Will be written later.... 
     */
    async uploadFilesToDatabase({ dispatch, commit, rootState }, files) {
        console.log("files in action")
       
        // sende state
        commit("uploadFilesToState", files);

        // Database Reactions....

        let fileDatas = {};
        // const base64FileData = await fetch(files);
        // const binaryFileData = await base64FileData.blob();

        files.forEach((file)=>{
            const binaryFileData =   fetch(file).blob();
            let fileData = {name:file.name, binaryFileData:binaryFileData};
            fileDatas.push(fileData);
        })

        console.log(fileDatas);
        /* const buffer = storedFile.Body; */
        var drupalUserUID = rootState.drupal_api.user.uid
        console.log(drupalUserUID)

        // files.forEach((file)=>{
      
        //     var config = {
        //         method: 'post',
        //         url: `https://clr-backend.x-navi.de/jsonapi/media/document/field_media_document`,
        //         headers: {
        //             'Accept': 'application/vnd.api+json',
        //             'Content-Type': 'application/octet-stream',
        //             'Authorization': rootState.drupal_api.authToken,
        //             'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`,
        //             'Content-Disposition': 'file; filename="' + file.name + '"',

        //         },
        //         data: fetch(file).blob()

        //     };

        //     axios(config)
        //         .then(function (response) {
        //             console.log(response);
        //             //commit('SAVE_FILES', { file });
        //             const documentID = response.data.data.id;
        //             console.log(documentID)
        //             dispatch('addInputDocument', documentID)

        //         })
        //         .catch(function (error) {
        //             console.log(error)
        //         })
        // })

    },

    addInputDocument({ state, rootState }, documentID) {

        console.log(state)
        console.log(documentID)
        var title = "Test Document"
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
                            "id": "${documentID}"
                        }
                        
                    }

                }
                
            }
        }`;

        var config = {
            method: 'post',
            url: `https://clr-backend.x-navi.de/jsonapi/node/inputdateien`,
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

                console.log(response);


            })
            .catch(function (error) {
                console.log(error)
            })

    },


}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions

}