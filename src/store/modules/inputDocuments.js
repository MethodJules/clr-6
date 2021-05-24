const state = {
    inputs: [{ name: "deneme" }],
}

const getters = {
    getInputs(state) {
        console.log("Hello from getter.................");
        console.log(state.inputs);

        return state.inputs;
    },

}


const mutations = {
    uploadFiles(state, files) {
        state.inputs.push(files);
        console.log("Hello from mutation");
        console.log(state.inputs);
    },


}


export default {
    namespaced: true,
    state,
    getters,
    mutations,

}