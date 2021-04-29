import axios from 'axios';

const state = () => ({
    projectList: []
})


const actions = {
    loadProjectListFromBackend({commit}) {
    axios.get('https://clr-backend.x-navi.de/jsonapi/node/projekt')
        .then((response) => {
            console.log(response);
            const data = response.data.data;
            
            commit('SAVE_NEW_PROJECT', data);
           
        }).catch(error =>{
            throw new Error(`API ${error}`);
        });         
    }
}

const mutations = {
    SAVE_NEW_PROJECT(state, projectList) {
        projectList.forEach(element => {
            console.log(element)
            state.projectList.push({
                titel: element.attributes.title,
                kurzbeschreibung: element.attributes.body.value
            })
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
