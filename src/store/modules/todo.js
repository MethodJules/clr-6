import axios from 'axios';

const state = () => ({
    listOfToDos: [
       // { id: 1, todo:"", date:" "},
    ]
})

const actions = {

    async loadToDoFromBackend({commit}) {
        await  axios.get('https://clr-backend.x-navi.de/jsonapi/node/to_dos')
            .then((response) => {
                console.log(response);
                const data = response.data.data;
                //let to-dos = [];
                commit('SAVE_TODO', data);
                
            }).catch(error =>{
                throw new Error(`API ${error}`);
            });         
            
    },
    createToDo({commit}, todoEntry) {
        console.log(todoEntry.todo)
        commit('ADD_TODO_ENTRY', todoEntry)

    },
    deleteTodo({commit}, todoEntry) {
        var config = {
            method: 'delete',
            url: `https://clr-backend.x-navi.de/jsonapi/node/to_dos/${todoEntry.idd}`,
           
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
        commit('DELETE_TODO_ENTRY', todoEntry);
    },
    updateTodo({commit}, todoEntry) {

        commit('UPDATE_TODO_ENTRY', todoEntry);
    },
}
const mutations = {
    DELETE_TODO_ENTRY(state, todoEntry) {
        let index = state.listOfToDos.indexOf(todoEntry);
        state.listOfToDos.splice(index, 1);
    },
    ADD_TODO_ENTRY(state, todoEntry) {
        var data = `{"data": {"type": "node--to_dos", "attributes": {"title": "${todoEntry.title}", "field_aufgabe": "${todoEntry.todo}", "field_date": "${todoEntry.date}"}}}`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/to_dos',
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
    UPDATE_TODO_ENTRY(state, todoEntry) {
    var data = `{"data": {"type": "node--to_dos", "id": "${todoEntry.idd}", "attributes": {"title": "${dailyEntry.title}", "field_aufgabe": "${todoEntry.todo}", "field_date": "${todoEntry.date} }}}`;
    var config = {
        method: 'patch',
        url: `https://clr-backend.x-navi.de/jsonapi/node/to_dos/${todoEntry.idd}`,
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
    SAVE_DAILYSCRUM_FEATURE(state, dailyscrum_feature) {
        
        dailyscrum_feature.forEach(element => {
            const field_aufgabe = element.attributes.field_aufgabe;
            console.log(field_aufgabe)
            const field_date = element.attributes.field_date;
            console.log(field_date)
            const field_id = element.id;
            console.log(element.id)
            const field_title = element.attributes.title;
            console.log(element.id)
            state.listOfToDos.push( { date: field_date, todo: field_aufgabe, idd: field_id, title: field_title })
            console.log(state)  
        });
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}