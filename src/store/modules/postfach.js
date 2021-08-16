import axios from 'axios';

const state = () => ({
    listOfPostfach: [
      
    ]
})

const actions = {

    async loadPostfachFromBackend({commit}) {
        await  axios.get('https://clr-backend.x-navi.de/jsonapi/node/postfach')
            .then((response) => {
                //console.log(response);
                const data = response.data.data;
                //let to-dos = [];
                commit('SAVE_POSTFACH', data);

            }).catch(error =>{
                throw new Error(`API ${error}`);
            });

    },
    createPostfach({commit}, postfachEntry) {
        
        commit('ADD_POSTFACH_ENTRY', postfachEntry)

    },
     deletePostfach({commit}, postfachEntry) {
        var config = {
            method: 'delete',
            url: `https://clr-backend.x-navi.de/jsonapi/node/postfach/${postfachEntry.idd}`,

            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
            },
        };
        axios(config)
            .then((response) => {
                console.log(response);
            }).catch(function(error) {
                console.log(error);
            });
        commit('DELETE_POSTFACH_ENTRY', postfachEntry);
    },
   
}
const mutations = {
    DELETE_POSTFACH_ENTRY(state, postfachEntry) {
        let index = state.listOfPostfach.indexOf(postfachEntry);
        state.listOfPostfach.splice(index, 1);
    }, 
    ADD_POSTFACH_ENTRY(state, postfachEntry) {
        
        var data = `
        {
            "data": {
                "type": "node--postfach", 
                "attributes": {
                    "title": "Benachrichtigung", 
                    "field_nachrichten": "${postfachEntry.postfach}"
                }
            }
        }`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/postfach',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
            },
            data: data
        };
        
        axios(config)
            .then(function(response){
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    
    SAVE_POSTFACH(state, postfach) {

        postfach.forEach(element => {
            const field_nachrichten = element.attributes.field_nachrichten;
            
            const field_id = element.id;
           
            const field_title = element.attributes.title;
           
            state.listOfPostfach.push( { postfach: field_nachrichten, idd: field_id, title: field_title })
            
        });
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
