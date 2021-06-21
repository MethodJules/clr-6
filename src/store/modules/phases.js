import axios from 'axios';
const state = () => ({
    phases: [
        {
            phase_id: 0,
            phase_name: 'Gruppe bilden',
        },
        {
            phase_id: 1,
            phase_name: 'Ziel & Umfang definieren'
        },
        {
            phase_id: 2,
            phase_name: 'Konzepte & Definitionen identifizieren'
        },
        {
            phase_id: 3,
            phase_name: 'Literatur suchen'
        },
        {
            phase_id: 4,
            phase_name: 'Daten extrahieren'
        },
        {
            phase_id: 5,
            phase_name: 'Literatur analysieren & synthetisieren'
        },
        {
            phase_id: 6,
            phase_name: 'Ergebnisse kommunizieren'
        },
        {
            phase_id: 7,
            phase_name: 'Gruppe auflösen'
        } 
    ],
    phases_this_project: [],
    current_phase: null


})

const actions = {
    async loadPhasesFromBackend({commit, state}, {projectId}) {
        console.log(state)
        await  axios.get('https://clr-backend.x-navi.de/jsonapi/node/phase_vorgehensmodell')
            .then((response) => {
                console.log(response);
                const phases = response.data.data;
                console.log(projectId)
                for(let phase of phases){
                   if (phase.relationships.field_projektid.data.id==projectId){
                        console.log(phase.attributes.title)
                        console.log(phase.relationships.field_projektid.data.id)
                    }

                }
                commit('LOAD_PHASES', {phases, projectId});
               
            }).catch(error =>{
                throw new Error(`API ${error}`);
            });         
            
    },

    async loadSinglePhaseFromState({commit, state}, {phaseId}) {
       let currentPhase = null

        for(let phase of state.phases_this_project){
            if (phase.attributes.field_phase_number== phaseId){
                console.log(phase)
                console.log(phase.attributes.title)
                console.log(phase.relationships.field_projektid.data.id)
                currentPhase= phase
            }
            
        }
            console.log(currentPhase)

                commit('LOAD_PHASE', {currentPhase});
       
            
    },

}




const mutations = {
    LOAD_PHASES(state, {phases, projectId}) {

        for(let phase of phases){
            if (phase.relationships.field_projektid.data.id==projectId){
                state.phases_this_project.push(phase)
                 console.log(phase.attributes.title)
                 console.log(phase.relationships.field_projektid.data.id)
             }

         }
        
           console.log(phases)
            console.log(state);
    },
    LOAD_PHASE(state, currentPhase) {
        console.log(currentPhase.currentPhase)

        state.current_phase=currentPhase.currentPhase
            console.log(state.current_phase)         
        ;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}