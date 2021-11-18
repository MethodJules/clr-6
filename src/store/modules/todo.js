import axios from "@/config/custom_axios";


const state = () => ({
    listOfToDos: [], // array to store users todos with given deadline 
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
        state.attributes = []
        let todos = state.listOfToDos;
        todos.forEach(todo => {
            todo.forEach((todo) => {
                state.attributes.push({
                    highlight: todo.erledigt,
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
        var drupalUserUID = rootState.drupal_api.user.uid;
        for (const project of projects) {
            commit("loadingStatus", true, { root: true })
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
                    const data = response.data.data;
                    if (data.length > 0) {
                        let todos = []
                        data.forEach(element => {
                            const field_date = element.attributes.field_date;
                            const field_id = element.id;
                            const field_title = element.attributes.title;
                            const field_erledigt = element.attributes.field_erledigt;
                            todos.push({ projectId: project.id, date: field_date, uuid: field_id, title: field_title, erledigt: field_erledigt, project_title: project.attributes.title })
                        });

                        let payload = {
                            todos: todos,
                            projectId: project.id
                        }
                        commit('SAVE_TODOS_ALL_PROJECTS', payload);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
            commit("loadingStatus", false, { root: true })


        }


    },

    async loadToDoFromBackend({ commit, rootState }, projectId) {
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
                let payload = {
                    todo: data,
                    projectId,
                }
                commit('SAVE_TODO', payload);
            })
            .catch(function (error) {
                console.log(error)
            })

    },
    createToDo({ commit, rootState, state }, todoEntry) {
        state.token = rootState.drupal_api.csrf_token
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
        let index = state.todosOfProject.indexOf(todoEntry);
        state.todosOfProject.splice(index, 1);
        for (let index1 = 0; index1 < state.listOfToDos.length; index1++) {
            const todos = state.listOfToDos[index1];
            for (let index2 = 0; index2 < todos.length; index2++) {
                const todo = todos[index2];
                if (todo.title == todoEntry.title) {
                    state.listOfToDos[index1].splice(index2, 1);
                }
            }
        }
    },
    SAVE_NEW_TODO(state, newTodo) {
        let myIndex;
        let todoNew = {
            uuid: newTodo.id,
            title: newTodo.attributes.title,
            date: newTodo.attributes.field_date,
            erledigt: newTodo.attributes.field_erledigt
        }
        for (let index = 0; index < state.listOfToDos.length; index++) {
            const todos = state.listOfToDos[index];
            for (let index2 = 0; index2 < todos.length; index2++) {
                const todo = todos[index2];
                (todo.projectId == state.todosOfProject[0].projectId) ? myIndex = index : "";
            }
        }
        state.todosOfProject.push(todoNew);
        state.listOfToDos[myIndex].push(todoNew)
    },

    /** 
     * to fill the listOfToDos[] with all entries in the backend 
     * @param {*} state we send our state to the method 
     * @param {*} todo element to go through the array 
     *  
     */
    SAVE_TODO(state, payload) {
        var leeresTodoArray = [];
        payload.todo.forEach(element => {
            const field_date = element.attributes.field_date;
            const field_id = element.id;
            const field_title = element.attributes.title;
            const field_erledigt = element.attributes.field_erledigt;
            leeresTodoArray.push({ projectId: payload.projectId, date: field_date, uuid: field_id, title: field_title, erledigt: field_erledigt })
            state.todos.push(element.attributes.title)
            state.dates.push(element.attributes.field_date)
        });
        state.todosOfProject = leeresTodoArray

    },

    /** 
     * to fill the listOfToDos[] with all entries in the backend 
     * @param {*} state we send our state to the method 
     * @param {*} todo element to go through the array 
     *  
     */
    SAVE_TODOS_ALL_PROJECTS(state, payload) {
        state.listOfToDos.push(payload.todos)

    },





}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
