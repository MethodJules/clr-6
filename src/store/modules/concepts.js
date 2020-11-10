import axios from 'axios'

const state = () => ({
    concepts: [
        // {name: 'theory building'},
        // {name: 'interpretive research'},
        // {name: 'artefacts'},
        // {name: 'instantiation'},
        // {name: 'construct'},
        // {name: 'model'},
        // {name: 'method'},
        // {name: 'guidelines'},
        // {name: 'methodology'},
        // {name: 'problem identification'},
    ]
})


const actions = {
    addConcept({commit}, concept) {
        commit('ADD_NEW_CONCEPT', concept);
    },
    deleteConcept({commit}, concept) {
        var config = {
            method: 'delete',
            url: `http://localhost:8080/jsonapi/node/concept/${concept.id}`,
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
        commit('DELETE_CONCEPT', concept);
    },
    //TODO: Load Concept

    loadConcepts({rootState,commit}) {
        const concept_map_nodes = rootState.concept_map.nodes;
        console.log(concept_map_nodes);
        axios.get('http://localhost:8080/jsonapi/node/concept')
            .then((response) => {
                //console.log(response);
                const data = response.data.data;
                let concepts = []
                for (var i in data) {
                    concepts.push({name: data[i].attributes.title, nid: data[i].attributes.drupal_internal__nid, id: data[i].id});
                }

                commit('SAVE_CONCEPTS', concepts)
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
    },
    //TODO: Load Link
    /*
    loadLinks({commit}) {
        axios.get('http://localhost:8080/jsonapi/node/relationship')
            .then((response) => {
                const data = response.data.data;
                let links = []
                for (var i in data) {
                    links.push({
                        sid: data[i].attributes.field_sid,
                        tid: data[i].attributes.field_tid,
                        _color: 'f0f',
                    })
                }
                commit('SAVE_LINKS', links)
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
    },
    */
}

const mutations = {
    ADD_NEW_CONCEPT(state, concept) {
        //TODO: Anbindung Backend

        var data = `{"data":{"type":"node--concept", "attributes": {"title": "${concept}"}}}`;
        var config = {
            method: 'post',
            url: 'http://localhost:8080/jsonapi/node/concept',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ='
            },
            data: data
        };

        //Send to backend
        axios(config)
            .then(function(response) {
                console.log('Concept wurde erstellt');
                console.log(response);
                state.concepts.push({name: concept, nid: response.data.data.attributes.drupal_internal__nid});
            })
            .catch(function(error) {
                console.log(error);
            });

    },
    DELETE_CONCEPT(state, concept) {
        let index = state.concepts.indexOf(concept);
        state.concepts.splice(index, 1);
    },
    SAVE_CONCEPTS(state, concepts) {

        state.concepts = concepts
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}