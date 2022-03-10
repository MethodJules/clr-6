import axios from "@/config/custom_axios";


const state = () => ({
    documentations: [],
    documentation: '',
})
//TO DO: commetns
const actions = {

    /**
    * loads all documentations of all phases from the backend and calls mutation and passes on the documentation array
    * @param commit commit is used to call a mutation from this function
    */
    async loadDocusFromBackend({ commit }) {
        await axios.get('jsonapi/node/documentation')
            .then((response) => {

                const data = response.data.data; //TODO: Anpassen wie bei concepts.js so dass hier das Array mit Objekten aufgebaut wird, s. concepts.js Zeile 53
                //console.log(data)
                let documentations = [];
                for (var i in data) {
                    //console.log(i)
                    documentations.push({ uuid: data[i].id, title: data[i].attributes.title, documentation: data[i].attributes.field_documentationtext })
                }

                //console.log(documentations)
                commit('SAVE_DOCUMENTATION', documentations);
                //commit('SAVE_DOCUMENTATION', documentation)
            }).catch(error => {
                throw new Error(`API ${error}`);
            });

    },


    /*     async loadSingleDocuFromBackend({commit}, documentID) {

            var config = {
                method: 'get',
                url: `jsonapi/node/documentation/${docuEntry.uuid}`,
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                },
                withCredentials: true,
            };
            axios(config)
            .then(function(response){
                console.log("dies ist einzelne doku")
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
            }, */





    /**
    * takes a new documentation as param and passes it on to mutation
    * @param commit commit is used to call a mutation from this function
    * @param docuEntry newly created documentation
    */
    createDocumentation({ commit }, docuEntry) {

        commit('ADD_DOCUMENTATION', docuEntry)

    },

    /**
* takes existing documentation as param and passes it on to mutation
* @param commit commit is used to call a mutation from this function
* @param docuEntry newly created documentation
*/
    updateDocumentation({ commit }, docuEntry) {

        commit('UPDATE_DOCUMENTATION', docuEntry);
        var data = `{
            "data": {
                "type": "node--documentation", 
                "id": "${docuEntry.uuid}", 
                "attributes": {
                    "title": "${docuEntry.title}", 
                    "field_documentationtext": "${docuEntry.documentation}" 
                }
            }
        }`;
        var config = {
            method: 'patch',
            url: `jsonapi/node/documentation/${docuEntry.uuid}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
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

    /**
    * takes a new documentation param and saves it in drupal backend
    * @param state state as parameter for access and manipulation of state data
    * @param docuEntry newly created documentation
    */
    ADD_DOCUMENTATION(state, docuEntry) {
        console.log(docuEntry.documentation)
        console.log("hello")
        var data = `
        {
            "data": {
                "type": "node--documentation", 
                "attributes": {
                    "title": "Documentation Gruppe + Phase", 
                    "field_documentationtext": "${docuEntry.documentation}" 
                }
            }
        }`;
        var config = {
            method: 'post',
            url: 'jsonapi/node/documentation',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
            },
            withCredentials: true,
            data: data

        };
        console.log("text");
        axios(config)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    },

    /**
* saves loaded documentation in state
* @param state state as parameter for access and manipulation of state data
* @param documentations newly created documentation
*/
    SAVE_DOCUMENTATION(state, documentations) {

        /*  documentations.forEach(element => {
             const field_documentationtext = element.attributes.field_documentationtext;
             //console.log(field_documentationtext)
             const field_id = element.id;
             //console.log(element.id)
             const field_title = element.attributes.title;
             //console.log(element.id)
             state.rowData.push({ documentation: field_documentationtext, uuid: field_id, title: field_title })
             //console.log(state)
         }); */

        //console.log(documentations)
        state.documentations = documentations
    },

    /**
* update existing documentation in drupal backend
* @param state state as parameter for access and manipulation of state data
* @param docuEntry existing documentation, which is about to get updated
*/
    UPDATE_DOCUMENTATION(state, docuEntry) {
        //let index = state.rowData.indexOf(dailyEntry);
        //state.rowData[index]=dailyEntry;
        //console.log(dailyEntry.todaydoings)
        var data = `{
            "data": {
                "type": "node--documentation", 
                "id": "${docuEntry.uuid}", 
                "attributes": {
                    "title": "${docuEntry.title}", 
                    "field_documentationtext": "${docuEntry.documentation}" 
                }
            }
        }`;
        var config = {
            method: 'patch',
            url: `jsonapi/node/documentation/${docuEntry.uuid}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
            },
            withCredentials: true,
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

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
