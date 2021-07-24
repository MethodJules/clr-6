import axios from 'axios';

const state = () => ({
    profileData: [],
    //myProfiles: []

})





const actions = {
   

     async loadProfileFromBackend({commit}) {
        await  axios.get("https://clr-backend.x-navi.de/jsonapi/node/profil")
            .then((response) => {
                console.log(response);
                const data = response.data.data;
                //let dailys = [];
                commit('SAVE_PROFILE', data);
                //commit('SAVE_DAILYSCRUM_FEATURE', dailyscrum_feature)
            }).catch(error =>{
                throw new Error(`API ${error}`);
            });         
            
    }, 

    createProfile({commit}, profile) {
        
        commit('ADD_PROFILE', profile)

    },

    updateProfile({commit}, profile) {

        commit('UPDATE_PROFILE', profile);
    },

    

    

}

const mutations = {

 
 


    ADD_PROFILE(state, profile) {
        
        /* var data = `
        {
            "data": 
            {
                "type": "node--profil", 
                "attributes":
                {
                    "title": "Profil", 
                    "field_studiengang": "${profile.studiengang}", 
                    "field_anzahl_literaturreviews": "${profile.anzahl_literaturreviews}" , 
                    "field_datenbanken": "${profile.datenbanken}",
                    "field_referenztool": "${profile.referenztool}", 
                    "field_analysetool": "${profile.analysetool}"  
                },
               
            }
        }`; */
        console.log(profile.studiengang)
        var title = "Profil"
        var data = `{"data": {"type": "node--profil", "attributes": {"title": "${title}", "field_studiengang": "${profile.studiengang}", "field_anzahl_literaturreviews": "${profile.anzahl_literaturreviews}", "field_datenbanken": "${profile.datenbanken}", "field_referenztool": "${profile.referenztool}", 
        "field_analysetool": "${profile.analysetool}"  }}}`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/profil',
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
 
UPDATE_PROFILE(state, profile){
        let index = state.profileData.indexOf(profile);
        state.profileData[index]=profile;
    //console.log(dailyEntry.todaydoings)
    var data = `{"data": {"type": "node--profil", "id": "${profile.idd}" "attributes": {"title": "${profile.title}", "field_studiengang": "${profile.studiengang}", "field_anzahl_literaturreviews": "${profile.anzahl_literaturreviews}" , "field_datenbanken": "${profile.datenbanken}", "field_referenztool": "${profile.referenztool}", "field_analysetool": "${profile.analysetool}" }}}`;
    var config = {
        method: 'patch',
        url: `https://clr-backend.x-navi.de/jsonapi/node/profil/${profile.idd}`,
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




    
    SAVE_PROFILE(state, profile) {
        
        profile.forEach(element => {
            console.log(field_studiengang)
            const field_studiengang = element.attributes.field_studiengang;
            console.log(field_anzahl_literaturreviews)
            const field_anzahl_literaturreviews = element.attributes.field_anzahl_literaturreviews;
            console.log(field_datenbanken)
            const field_datenbanken = element.attributes.field_datenbanken;
            console.log(field_analysetool)
            const field_analysetool = element.attributes.field_analysetool;
            console.log(field_referenztool)
            const field_referenztool = element.attributes.field_referenztool;
            const field_id = element.id;
            const field_title = element.attributes.title;
            state.profileData.push( { studiengang: field_studiengang, anzahl_literaturreviews: field_anzahl_literaturreviews, datenbanken: field_datenbanken, analysetool: field_analysetool, referenztool: field_referenztool, idd: field_id, title: field_title })
            //console.log(state)         
        
            //let profileObject = { studiengang: field_studiengang, anzahl_literaturreviews: field_anzahl_literaturreviews, datenbanken: field_datenbanken, analysetool: field_analysetool, referenztool: field_referenztool, idd: field_id, title: field_title   }
            //state.projectList.push(projectObject)
            //state.myProfile.push(profileObject)
            console.log(state.profileData)
            
        
        
        });


    }      
    
    

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    
}




