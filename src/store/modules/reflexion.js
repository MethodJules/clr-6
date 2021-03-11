import axios from 'axios';

const state = () => ({
    rowData: [
    ]
})

const actions = {
   

     async loadReflexionFromBackend({commit}) {
        await  axios.get('https://clr-backend.x-navi.de/jsonapi/node/reflexionstemplate')
            .then((response) => {
                console.log(response);
                const data = response.data.data;
                //let dailys = [];
                commit('SAVE_REFLEXION', data);
                //commit('SAVE_DAILYSCRUM_FEATURE', dailyscrum_feature)
            }).catch(error =>{
                throw new Error(`API ${error}`);
            });         
            
    }, 

    createReflexion({commit}, reflexion) {
        console.log("hello")
        console.log(reflexion.berichten_reagieren)
        commit('ADD_REFLEXION', reflexion)

    },

/*     deleteDaily({commit}, dailyEntry) {

        commit('DELETE_DAILY_ENTRY', dailyEntry);
    }, */

/*     deleteDaily({commit}, dailyEntry) {
        //console.log(`das hier ist die ID von Daily Entry ${dailyEntry.idd}`)
        var config = {
            method: 'delete',
            url: `https://clr-backend.x-navi.de/jsonapi/node/dailyscrum/${dailyEntry.idd}`,
           // das hier löscht korrekt einen eintrag -> url: `http://clr-backend.x-navi.de/jsonapi/node/dailyscrum/0765516c-d202-4ceb-ae44-5f86d203a278`,
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
        commit('DELETE_DAILY_ENTRY', dailyEntry);
    },



    updateDaily({commit}, dailyEntry) {

        commit('UPDATE_DAILY_ENTRY', dailyEntry);
    },

   
 */
    

}

const mutations = {

 //der Teil löscht nur die Zeile aus Frontend Tabelle in Vue raus
/* DELETE_DAILY_ENTRY(state, dailyEntry) {
    let index = state.rowData.indexOf(dailyEntry);
    state.rowData.splice(index, 1);
},
 */
 


    ADD_REFLEXION(state, reflexion) {
        console.log(reflexion.berichten_reagieren)
        var data = `{"data": {"type": "node--reflexionstemplate", "attributes": {"title": "UserName + Reflexionsphase", "field_berichten_reagieren": "${reflexion.berichten_reagieren}", "field_in_bezug_setzen": "${reflexion.in_bezug_setzen}" , "field_rekonstruieren": "${reflexion.rekonstruieren}", "field_schlussfolgern": "${reflexion.schlussfolgern}" }}}`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/reflexionstemplate',
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

/*     UPDATE_DAILY_ENTRY(state, dailyEntry) {
            //let index = state.rowData.indexOf(dailyEntry);
            //state.rowData[index]=dailyEntry;
        //console.log(dailyEntry.todaydoings)
        var data = `{"data": {"type": "node--dailyscrum", "id": "${dailyEntry.idd}", "attributes": {"title": "${dailyEntry.title}", "field_datum": "${dailyEntry.date}", "field_gestern": "${dailyEntry.doings}" , "field_heute": "${dailyEntry.todaydoings}", "field_probleme": "${dailyEntry.problems}" }}}`;
        var config = {
            method: 'patch',
            url: `https://clr-backend.x-navi.de/jsonapi/node/dailyscrum/${dailyEntry.idd}`,
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

    
    SAVE_REFLEXION(state, reflexion) {
        
        reflexion.forEach(element => {
            const field_berichten_reagieren = element.attributes.field_berichten_reagieren;
            const field_in_bezug_setzen = element.attributes.field_in_bezug_setzen;
            const field_rekonstruieren = element.attributes.field_rekonstruieren;
            const field_schlussfolgern = element.attributes.field_schlussfolgern;
            const field_id = element.id;
            console.log(element.id)
            const field_title = element.attributes.title;
            console.log(element.id)
            state.rowData.push( { berichten_reagieren: field_berichten_reagieren, in_bezug_setzen: field_in_bezug_setzen, rekonstruieren: field_rekonstruieren, schlussfolgern: field_schlussfolgern, idd: field_id, title: field_title })
            console.log(state)         
        });
    }      
    
    

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}




