const state = {
    inputs: [],
    files: "hello"
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
    getFiles(state) {
        return state;
    }

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
        files.forEach(element => {
            console.log(element.name);
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
        console.log("Hello from mutation");
        console.log(files);
    },


}


export default {
    namespaced: true,
    state,
    getters,
    mutations,

}