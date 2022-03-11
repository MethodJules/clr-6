import axios from "@/config/custom_axios";

const state = {
    phases: []
}
const actions = {
    load_phases({ commit }) {
        axios.get('https://clr-backend.x-navi.de/jsonapi/taxonomy_term/phase/')
            .then((response) => {
                const data = response.data.data;
                // sort the data by weight
                data.sort((a, b) => (a.attributes.weight > b.attributes.weight) ? 1 : ((b.attributes.weight > a.attributes.weight) ? -1 : 0))
                commit('load_phases', data);
            }).catch((error) => {
                throw new Error(`API ${error}`);
            })
    }
}


const mutations = {
    load_phases(state, data) {
        state.phases.push(...data)
    }
}

const getters = {
    getPhasesIds(state) {
        const phases = state.phases;
        return state.phases.map(phase => phase.id);
    }
}


export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters
}