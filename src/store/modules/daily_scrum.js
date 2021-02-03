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

    createDaily({commit}, dailyEntry) {
        console.log(dailyEntry.todaydoings)
        commit('ADD_DAILY_ENTRY', dailyEntry)

    },

    deleteDaily({commit}, dailyEntry) {

        commit('DELETE_DAILY_ENTRY', dailyEntry);
    },

    updateDaily({commit}, dailyEntry) {

        commit('UPDATE_DAILY_ENTRY', dailyEntry);
    },

   

    

}

const mutations = {

    DELETE_DAILY_ENTRY({commit}, dailyEntry) {
        var config = {
            method: 'delete',
            url: `http://clr-backend.x-navi.de/jsonapi/node/dailyscrum/${dailyEntry.id}`,
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

        let date = state.rowData.indexOf(dailyEntry);
        state.rowData.splice(date, 1);
        commit('DELETE_DAILY_ENTRY', dailyEntry);
    },

    ADD_DAILY_ENTRY(state, dailyEntry) {
        console.log(dailyEntry.todaydoings)
        var data = `{"data": {"type": "node--dailyscrum", "attributes": {"title": "My custom title", "field_datum": "${dailyEntry.date}", "field_gestern": "${dailyEntry.doings}" , "field_heute": "${dailyEntry.todaydoings}", "field_probleme": "${dailyEntry.problems}" }}}`;
        var config = {
            method: 'post',
            url: 'http://clr-backend.x-navi.de/jsonapi/node/dailyscrum',
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

    UPDATE_DAILY_ENTRY(state, dailyEntry) {
        console.log(dailyEntry.todaydoings)
        var data = `{"data": {"type": "node--dailyscrum", "id": "${dailyEntry.id}", "attributes": {"title": "My updated title", "field_datum": "${dailyEntry.date}", "field_gestern": "${dailyEntry.doings}" , "field_heute": "${dailyEntry.todaydoings}", "field_probleme": "${dailyEntry.problems}" }}}`;
        var config = {
            method: 'patch',
            url: 'http://clr-backend.x-navi.de/jsonapi/node/dailyscrum/${dailyEntry.id}',
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


