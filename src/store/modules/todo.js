import axios from "@/config/custom_axios";


const state = () => ({
    listOfToDos: [], // array to store users todos with given deadline 
    todos: [],//array to store only the todo tasks from listOfToDos[] //TODO: check if still needed
    dates: [],//array to store only the deadlines from listOfToDos[] //TODO: check if still needed
    attributes: [],
    todosOfProject: [],
})


/*  
getter to call the arrays todos[] and dates[] 
*/
const getters = {

    /**
  * @param state state as parameter for access and manipulation of state data
  * getter for calendar
  */
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
    /**
  * @param state state as parameter for access and manipulation of state data
  * getter for all todos of user
  */
    getListOfTodos(state) {
        return state.listOfToDos
    },

    /**
  * @param state state as parameter for access and manipulation of state data
  * getter for todos of current project
  */
    getTodosOfProject(state) {
        return state.todosOfProject;
    }
}

const actions = {

    /**
* @param commit commit us used to call a mutation from this function
* @param dispatch dispatch is used to call another action from this function
* @param rootState rootState allows access to states of other modules in store
* @param projects all projects of current user
* loads all todos of all projects of current user
*/
    async loadTodosAllProjects({ commit, state, rootState }, projects) {
        //TODO: put state.listOfToDos = [] in a mutation to make state manipulation seperate from actions. -> consistent with all other functions
        state.listOfToDos = []
        const user = JSON.parse(sessionStorage.getItem("current_user"));
        const drupalUserUID = user.uid;
        const authToken = sessionStorage.getItem("auth_token");
        const csrfToken = localStorage.getItem("csrf_token");
        for (const project of projects) {
            commit("loadingStatus", true, { root: true })
            var config = {
                method: 'get',
                url: `jsonapi/node/to_dos?filter[field_projektid.id]=${project.id}&filter[field_nutzer.drupal_internal__uid]=${drupalUserUID}`,
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization': authToken,
                    'X-CSRF-Token': csrfToken
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
    /**
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* @param projectId id of current project
* loads all todos of current project of current user
*/
    async loadToDoFromBackend({ commit, rootState }) {
        let projectId = sessionStorage.getItem("projectId");
        const user = JSON.parse(sessionStorage.getItem("current_user"));
        const drupalUserUID = user.uid;
        const authToken = sessionStorage.getItem("auth_token");
        const csrfToken = localStorage.getItem("csrf_token");
        var config = {
            method: 'get',
            url: `jsonapi/node/to_dos?filter[field_projektid.id]=${projectId}&filter[field_nutzer.drupal_internal__uid]=${drupalUserUID}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': authToken,
                'X-CSRF-Token': csrfToken
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

    /**
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* @param todoEntry new created todo
* uploads new todo to backend
*/
    createToDo({ commit, rootState }, todoEntry) {
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

    /**
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* @param todoEntry todo to be deleted
* calls function to delete tool from Backend 
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
            }).catch(function (error) {
                console.log(error);
            });
        commit('DELETE_TODO_ENTRY', todoEntry);
    },

    /**
* @param rootState rootState allows access to states of other modules in store
* @param todoEntry todo to be updated
* updates todo backend checkbox
*/
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
            })
            .catch(function (error) {
                console.log(error)
            })
    },
}

const mutations = {

    /**
* @param state state as parameter for access and manipulation of state data
* @param todoEntry todo to be deleted in frontend
*  delete one entry from state list OfToDos 
*/
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

    /**
* @param state state as parameter for access and manipulation of state data
* @param newTodo todo to be deleted
*  save new todo in frontend 
*/
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
     * @param {*} payload element to go through the array 
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
     * @param {*} payload element to go through the array 
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
