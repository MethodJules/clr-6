import axios from 'axios';

const state = () => ({
    projectList: [
      /* {titel: "Testtitel",
        kurzbeschreibung: "Dies ist nur eine Kurzbeschreibung",
        betreuenderDozent: "Julien, Maren",
        externeMitwirkende: "Nithusha, Aylin",
        schlagworter: "test, projektliste, projekte"} */
    ]
})

const actions = {
    async loadProjectsFromBackend({commit}) {
        await  axios.get('https://clr-backend.x-navi.de/jsonapi/node/projektanlegeformular')
            .then((response) => {
                console.log(response);
                const data = response.data.data;
                
                commit('SAVE_NEW_PROJECT', data);
               
            }).catch(error =>{
                throw new Error(`API ${error}`);
            });         
            
    },
    createProject({commit}, projEntry) {
        
        commit('ADD_PROJECT', projEntry)

    },
}
const mutations ={
    ADD_PROJECT(state, projEntry) {
        console.log(projEntry.betreuenderDozent)
        var data = `{"data": {"type": "node--projektanlegeformular", "attributes": {"title": "fix", "field_titel": "${projEntry.titel}", "field_betreuender_dozent": "${projEntry.betreuenderDozent}", "field_externe_mitwirkende": "${projEntry.externeMitwirkende}" , "field_schlagworter": "${projEntry.schlagworter}", "field_kurzbeschreibung": "${projEntry.kurzbeschreibung}" }}}`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/projektanlegeformular',
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

    SAVE_NEW_PROJECT(state, project) {
        
        project.forEach(element => {
            const field_titel = element.attributes.field_titel;
            //console.log(field_titel)
            const field_betreuender_dozent = element.attributes.field_betreuender_dozent;
            //console.log(field_betreuender_dozent)
            const field_externe_mitwirkende = element.attributes.field_externe_mitwirkende;
            //console.log(field_externe_mitwirkende)
            const field_schlagworter = element.attributes.field_schlagworter;
            //console.log(field_schlagworter)
            const field_kurzbeschreibung = element.attributes.field_kurzbeschreibung;
            //console.log(field_kurzbeschreibung)
            const field_id = element.id;
            //console.log(element.id)
            const field_title = element.attributes.title;
            //console.log(element.id)
            state.projectList.push( { titel: field_titel, betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, idd: field_id, title: field_title })
            //console.log(state)
        });
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
