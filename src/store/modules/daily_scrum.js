import axios from 'axios';

const state = () => ({
    rowData: [
       // { id: 1, date: " ", doings: " ", todaydoings: " ", problems: " "  },
    ]
})

const actions = {
   

    async loadDailysFromBackend({commit}) {
        await  axios.get('http://clr-backend.x-navi.de/jsonapi/node/dailyscrum')
            .then((response) => {
                console.log(response);
                const data = response.data.data;
                //let dailys = [];
                commit('SAVE_DAILYSCRUM_FEATURE', data);
                //commit('SAVE_DAILYSCRUM_FEATURE', dailyscrum_feature)
            }).catch(error =>{
                throw new Error(`API ${error}`);
            });         
            
    },

}

const mutations = {

    
    
    SAVE_DAILYSCRUM_FEATURE(state, dailyscrum_feature) {
        
        dailyscrum_feature.forEach(element => {
            const field_datum = element.attributes.field_datum;
            console.log(field_datum)
            const field_gestern = element.attributes.field_gestern;
            console.log(field_gestern)
            const field_heute = element.attributes.field_heute;
            console.log(field_heute)
            const field_probleme = element.attributes.field_probleme;
            console.log(field_probleme)
            state.rowData.push( { date: field_datum, doings: field_gestern, todaydoings: field_heute, problems: field_probleme })
            console.log(state)



            
        });
        
        /* dailyscrum_feature.forEach(element => {
            console.log(element);
            const field_datum = element.attributes.field_datum.data;
            const field_gestern = element.attributes.field_gestern.data;
            const field_heute = element.attributes.field_heute.data;
            const field_probleme = element.attributes.field_probleme.data;
            console.log(`Title: ${title}`)
        

        }); */
    }      
    
    

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}



