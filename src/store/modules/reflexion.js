import axios from 'axios';

const state = () => ({
    rowData: [
    ]
})

const getters = {
    getRowData(state) {
        return state.rowData;

    }
}



const actions = {
   

     async loadReflexionFromBackend({commit}) {
        await  axios.get("https://clr-backend.x-navi.de/jsonapi/node/reflexionstemplate?filter[sichten][condition][path]=field_sichten.name&filter[sichten][condition][operator]=IN&filter[sichten][condition][value][1]=Ich&filter[sichten][condition][value][2]=Gruppe&filter[sichten][condition][value][3]=Fachlicher%20Kontext")
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

    updateReflexion({commit}, reflexion) {

        commit('UPDATE_REFLEXION', reflexion);
    },

    saveReflexion({commit}, reflexion) {

        commit('SAVE_REFLEXION', reflexion);
    },

    

}

const mutations = {

 
 


    ADD_REFLEXION(state, reflexion) {
        console.log(reflexion.berichten_reagieren)
        var data = `{"data": {"type": "node--reflexionstemplate", "attributes": {"title": "UserName + Reflexionsphase", "field_berichten_reagieren": "${reflexion.berichten_reagieren}", "field_in_bezug_setzen": "${reflexion.in_bezug_setzen}" , "field_rekonstruieren": "${reflexion.rekonstruieren}", "field_schlussfolgern": "${reflexion.schlussfolgern}"  },
        "relationships": {"field_phasenid": {"data": {"0": {"type": "node--phase_vorgehensmodell", "id": "8c8614a2-58b9-4e6b-acd7-89f9097e1205" }}}, 
        "field_sichten" : {"data": {"0": {"type": "taxonomy_term--sichten", "id": "325fd0af-838c-49f5-92d3-2fcc987e6137" }}}, }}}`;
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
 
UPDATE_REFLEXION(state, reflexion){
        let index = state.rowData.indexOf(reflexion);
        state.rowData[index]=reflexion;
    //console.log(dailyEntry.todaydoings)
    var data = `{"data": {"type": "node--reflexionstemplate", "id": "${reflexion.idd}", "attributes": {"title": "${reflexion.title}", "field_berichten_reagieren": "${reflexion.berichten_reagieren}", "field_in_bezug_setzen": "${reflexion.in_bezug_setzen}" , "field_rekonstruieren": "${reflexion.rekonstruieren}", "field_schlussfolgern": "${reflexion.schlussfolgern}" }}}`;
    var config = {
        method: 'patch',
        url: `https://clr-backend.x-navi.de/jsonapi/node/reflexionstemplate/${reflexion.idd}`,
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




    
    SAVE_REFLEXION(state, reflexion) {
        
        reflexion.forEach(element => {
            const field_berichten_reagieren = element.attributes.field_berichten_reagieren;
            const field_in_bezug_setzen = element.attributes.field_in_bezug_setzen;
            const field_rekonstruieren = element.attributes.field_rekonstruieren;
            const field_schlussfolgern = element.attributes.field_schlussfolgern;
            const field_id = element.id;
            const field_title = element.attributes.title;
            state.rowData.push( { berichten_reagieren: field_berichten_reagieren, in_bezug_setzen: field_in_bezug_setzen, rekonstruieren: field_rekonstruieren, schlussfolgern: field_schlussfolgern, idd: field_id, title: field_title })
            //console.log(state)         
        });
    }      
    
    

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}




