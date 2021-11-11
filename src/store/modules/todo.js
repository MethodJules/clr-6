import axios from "@/config/custom_axios";


const state = () => ({
    listOfToDos: [
        // array to store users todos with given deadline 
    ],
    todos: [],//array to store only the todo tasks from listOfToDos[] 
    dates: [],//array to store only the deadlines from listOfToDos[] 
    token: "",
    attributes: [],
    currentProject: "",
    todosOfProject: [],


})


/*  
getter to call the arrays todos[] and dates[] 
*/
const getters = {

    getAttributesForVcCalendar(state) {
        console.log("It is loading two times? Why?")
        // because it loads two times I have made attributes array empty at the begining of this getter
        // I think at loadTodosAllProjects, it is done because of the same reason. 
        // I have inspired from there. 
        // But it needs to be fixed..
        state.attributes = []
        let todos = state.listOfToDos;
        todos.forEach(todo => {
            todo.forEach((todo) => {

                state.attributes.push({
                    highlight: todo.erledigt,
                    // highlight configuration
                    // You can just delete to see default one. 
                    highlight: {
                        color: 'orange',
                        fillMode: 'light',
                    },
                    dates: todo.date,
                    popover: {
                        label: todo.title,
                    },
                })
            })
        });
        return state.attributes;
    },

    getListOfTodos(state) {

        return state.listOfToDos
    },

    getTodosOfProject(state) {

        return state.todosOfProject;
    }

}

const actions = {


    async loadTodosAllProjects({ commit, state, rootState }, projects) {

        state.listOfToDos = []
        console.log(projects)

        var drupalUserUID = rootState.drupal_api.user.uid;


        for (const project of projects) {
            commit("loadingStatus", true, { root: true })
            console.log(project)
            // dispatch('loadToDoFromBackend', project )


            var config = {
                method: 'get',
                url: `jsonapi/node/to_dos?filter[field_projektid.id]=${project.id}&filter[field_nutzer.drupal_internal__uid]=${drupalUserUID}`,
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization': rootState.drupal_api.authToken,
                    'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
                },
            };

            axios(config)
                .then((response) => {
                    console.log(project.attributes.title)
                    console.log(response)
                    const data = response.data.data;
                    console.log(data)
                    //let to-dos = [];


                    if (data.length > 0) {
                        var leeresTodoArray = [];
                        data.forEach(element => {

                            const field_date = element.attributes.field_date;
                            //console.log(field_date)
                            const field_id = element.id;
                            //console.log(element.id)
                            const field_title = element.attributes.title;
                            const field_erledigt = element.attributes.field_erledigt;
                            leeresTodoArray.push({ date: field_date, uuid: field_id, title: field_title, erledigt: field_erledigt, project_title: project.attributes.title })
                        });

                        //gives array to mutation, which pushes array in state -> state has array of projects, which contain arrays of todos
                        commit('SAVE_TODOS_ALL_PROJECTS', leeresTodoArray);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
            commit("loadingStatus", false, { root: true })


        }


    },

    async loadToDoFromBackend({ commit, rootState }, projectId) {
        console.log("somebody call me")

        var drupalUserUID = rootState.drupal_api.user.uid;



        var config = {
            method: 'get',
            url: `jsonapi/node/to_dos?filter[field_projektid.id]=${projectId}&filter[field_nutzer.drupal_internal__uid]=${drupalUserUID}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };

        axios(config)
            .then((response) => {

                const data = response.data.data;
                //let to-dos = [];
                commit('SAVE_TODO', data);


            })
            .catch(function (error) {
                console.log(error)
            })

    },
    createToDo({ commit, rootState }, todoEntry) {
        //console.log(todoEntry.todo)
        //let token=rootState.drupal_api.csrf_token
        let token = rootState.drupal_api.authToken
        console.log(rootState.drupal_api.csrf_token)
        //todo delete token in diesem state
        state.token = rootState.drupal_api.csrf_token



        //console.log(todoEntry.todo)
        var drupalUserUID = rootState.profile.userData.uuid

        var data = `
        {
            "data": {
                "type": "node--to_dos", 
                "attributes": {
                    "title": "${todoEntry.todo}",  
                    "field_date": "${todoEntry.date}"
                },
                "relationships": {
                    "field_nutzer": {
                        "data": {
                            "type": "user--user",
                            "id": "${drupalUserUID}"
                        }
                    }, 
                    "field_projektid": {
                        "data": {
                            "type": "node--projekt",
                            "id": "${todoEntry.project_id}"
                        }
                    }
                }
                
            }
        }`;
        var config = {
            method: 'post',
            url: 'jsonapi/node/to_dos',
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
                console.log(response)
                commit('SAVE_NEW_TODO', response.data.data)
            })
            .catch(function (error) {
                console.log(error)
            })







    },
    /*  
    calls function to delete tool from Backend 
    */
    deleteTodo({ commit, rootState }, todoEntry) {
        console.log(rootState)
        var config = {
            method: 'delete',
            url: `jsonapi/node/to_dos/${todoEntry.uuid}`,

            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
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
        commit('DELETE_TODO_ENTRY', todoEntry);
    },

    updateTodo({ rootState }, todoEntry) {


        var data = `
        {
            "data": {
                "type": "node--to_dos", 
                "id": "${todoEntry.uuid}", 
                "attributes": {
                    "field_erledigt": ${todoEntry.erledigt}
                }

            }
        }`;
        var config = {
            method: 'patch',
            url: `jsonapi/node/to_dos/${todoEntry.uuid}`,
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
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })



    },



}

const mutations = {


    /* delete one entry from state list OfToDos */
    DELETE_TODO_ENTRY(state, todoEntry) {
        // changed the array here from listOfTodos to the todosOfProject, 
        // because we show that array at that time. 

        // for project page
        let index = state.todosOfProject.indexOf(todoEntry);
        state.todosOfProject.splice(index, 1);

        // For main page

        for (let index1 = 0; index1 < state.listOfToDos.length; index1++) {
            const todos = state.listOfToDos[index1];
            for (let index2 = 0; index2 < todos.length; index2++) {
                const todo = todos[index2];
                console.log(todo)
                console.log("index1", index1)
                console.log("index2", index2)
                if (todo.title == todoEntry.title) {
                    console.log(todo)
                    console.log(state.listOfToDos)
                    state.listOfToDos[index1].splice(index2, 1);

                }
            }

        }
    },
    /** 
    * adds a new todo by user input 
    * @param {*} state we send our state to the method 
    * @param {*} todoEntry is the new todo entry to save given attributes like title, date and task as a new todo 
    */
    ADD_TODO_ENTRY(state, todoEntry) {
        console.log(state + todoEntry)

    },

    SAVE_NEW_TODO(state, newTodo) {
        // changed the array here from listOfTodos to the todosOfProject, 
        // because we show that array at that time. 
        state.todosOfProject.push({
            uuid: newTodo.id,
            title: newTodo.attributes.title,
            date: newTodo.attributes.field_date,
            erledigt: newTodo.attributes.field_erledigt
        })
    },

    /** 
     * to fill the listOfToDos[] with all entries in the backend 
     * @param {*} state we send our state to the method 
     * @param {*} todo element to go through the array 
     *  
     */
    SAVE_TODO(state, todo) {

        var leeresTodoArray = [];
        todo.forEach(element => {
            console.log(element)
            const field_date = element.attributes.field_date;
            const field_id = element.id;
            const field_title = element.attributes.title;
            const field_erledigt = element.attributes.field_erledigt;
            leeresTodoArray.push({ date: field_date, uuid: field_id, title: field_title, erledigt: field_erledigt })
            state.todos.push(element.attributes.title)
            state.dates.push(element.attributes.field_date)
        });

        state.todosOfProject = leeresTodoArray
        console.log(state.todosOfProject)

    },

    /** 
     * to fill the listOfToDos[] with all entries in the backend 
     * @param {*} state we send our state to the method 
     * @param {*} todo element to go through the array 
     *  
     */
    SAVE_TODOS_ALL_PROJECTS(state, todoArray) {
        state.listOfToDos.push(todoArray)
        console.log(state.listOfToDos)

    },

    SET_CURRENT_PROJECT(state, project) {
        console.log(project)
        state.currentProject = project;
    }





}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
