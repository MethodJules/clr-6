const state = {
    inputs: [], // we are using this array to store the file names and sizes only
    inputsForDatabase: [] // we are going to use this array in order to upload our files to database
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
    uploadFiles(state, files) {
        // this line uploads the files to inputsForDatabase for database reactions
        state.inputsForDatabase.push(files);
        // after here we are storing data to state
        files.forEach(element => {
            let size = element.size;
            if (element.size > 100000000) {
                size /= 1073741824;
                size = size.toFixed(2);
                size += " GB"
            } else {
                size /= 1048576;
                size = size.toFixed(2);
                size += " MB";
            }
            let file = {
                name: element.name,
                size: size
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
    uploadFilesToDatabase({ state }) {
        console.log("Files that we are goint upload database");
        console.log(state.inputsForDatabase);
        // Database Reactions....
    },


}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions

}