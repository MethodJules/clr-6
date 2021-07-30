import axios from 'axios';

const state = () => ({
    listOfToDos: [
       // array to store users todos with given deadline 
    ],
    todos:[],//array to store only the todo tasks from listOfToDos[] 
    dates:[],//array to store only the deadlines from listOfToDos[] 
    token: ""
    
})
/*  
getter to call the arrays todos[] and dates[] 
*/ 
const getters={
    getTodo: state => {
        return state.listOfToDos.todo
    },
    getDate: state => {
        return state.listOfToDos.date
    }
}

const actions = {

    async loadToDoFromBackend({commit}) {
        await  axios.get('https://clr-backend.x-navi.de/jsonapi/node/to_dos')
            .then((response) => {
                //console.log(response);
                const data = response.data.data;
                //let to-dos = [];
                commit('SAVE_TODO', data);

            }).catch(error =>{
                throw new Error(`API ${error}`);
            });

    },
    createToDo({commit, rootState}, todoEntry) {
        //console.log(todoEntry.todo)
        //let token=rootState.drupal_api.csrf_token
        let token=rootState.drupal_api.authToken
        console.log(rootState.drupal_api.csrf_token)
        //todo delete token in diesem state
        state.token=rootState.drupal_api.csrf_token
       


        //console.log(todoEntry.todo)
        var data = `{"data": {"type": "node--to_dos", "attributes": {"title": "Todo Titel", "field_aufgaben": "${todoEntry.todo}", "field_date": "${todoEntry.date}"}}}`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/to_dos',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': token
            },
            data: data
        };
        //console.log("te")
        axios(config)
            .then(function(response){
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })





        commit('ADD_TODO_ENTRY', todoEntry)

    },
    /*  
    calls function to delete tool from Backend 
    */ 
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
    /*
    updateTodo({commit}, todoEntry) {

        commit('UPDATE_TODO_ENTRY', todoEntry);
    }, */
}
const mutations = {
     /* delete one entry from state list OfToDos */ 
    DELETE_TODO_ENTRY(state, todoEntry) {
        let index = state.listOfToDos.indexOf(todoEntry);
        state.listOfToDos.splice(index, 1);
    }, 
     /** 
     * adds a new todo by user input 
     * @param {*} state we send our state to the method 
     * @param {*} todoEntry is the new todo entry to save given attributes like title, date and task as a new todo 
     */ 
    ADD_TODO_ENTRY(state, todoEntry) {
        console.log(state + todoEntry)

    },
    /* UPDATE_TODO_ENTRY(state, todoEntry) {
    var data = `{"data": {"type": "node--to_dos", "id": "${todoEntry.idd}", "attributes": {"title": "${dailyEntry.title}", "field_aufgaben": "${todoEntry.todo}", "field_date": "${todoEntry.date} }}}`;
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
    }, */
    /** 
     * to fill the listOfToDos[] with all entries in the backend 
     * @param {*} state we send our state to the method 
     * @param {*} todo element to go through the array 
     *  
     */ 
    SAVE_TODO(state, todo) {

        todo.forEach(element => {
            const field_aufgaben = element.attributes.field_aufgaben;
            //console.log(field_aufgaben)
            const field_date = element.attributes.field_date;
            //console.log(field_date)
            const field_id = element.id;
            //console.log(element.id)
            const field_title = element.attributes.title;
            //console.log(element.id)
            state.listOfToDos.push( { date: field_date, todo: field_aufgaben, idd: field_id, title: field_title })
            //console.log(state)
            state.todos.push(element.attributes.field_aufgaben)
            state.dates.push(element.attributes.field_date)
        });
        
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
