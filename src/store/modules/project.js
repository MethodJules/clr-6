import axios from 'axios';
//TO DO: comments

const state = () => ({
    projectList: [],
    myProjects: []

})


/*   const getters = {
    getRowData(state) {
        return state.rowData;

    }
} */



const actions = {

    /**
     * loads all projects from Backend and commits the mutation LOAD_PROJECT
     * and passes drupal user id gotten from rootstate on
    * @param state state as parameter for access and manipulation of state data
    * @param commit commit us used to call a mutation from this function
    * @param rootState rootState allows access to states of other modules in store
    */
    async loadProjectsFromBackend({commit, state, rootState}) {
        console.log(state)
            console.log("hallo")
        //console.log(rootState.sparky_api.sparkyUserID)
        //var drupalUserID = rootState.sparky_api.drupalUserID
                //b0e1c888-6304-4fe0-83fc-255bb4a3cfe3
        var drupalUserUID = rootState.drupal_api.user.uid
        console.log(rootState.sparky_api.drupalUserID)
        console.log(drupalUserUID)


        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/jsonapi/node/projekt?filter[field_gruppenmitglieder.drupal_internal__uid][operator]=IN&filter[field_gruppenmitglieder.drupal_internal__uid]=${drupalUserUID}`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };

        axios(config)
            .then(function(response){
                console.log(response)
                console.log(response);
                console.log("es lfniosdn")
                /* console.log($store.state.sparky_api.validCredential)
                console.log($store.state.sparky_api.drupalUserID) */
                const projects = response.data.data;
                commit('LOAD_PROJECT', {projects});

            })
            .catch(function(error) {
                console.log(error)
            })





        // funzt //await  axios.get(`https://clr-backend.x-navi.de/jsonapi/node/projekt?filter[field_kurzbeschreibung][operator]=CONTAINS&filter[field_kurzbeschreibung][value]=rojekt`)
        //await  axios.get(`https://clr-backend.x-navi.de/jsonapi/node/projekt?filter[field_gruppenmitglieder.id][operator]=IN&filter[field_gruppenmitglieder.id][value]=e14117e8-9278-46fc-9e26-217494f611d8`)
       // await  axios.get(`https://clr-backend.x-navi.de/jsonapi/node/projekt?filter[field_gruppenadministrator.id]=e14117e8-9278-46fc-9e26-217494f611d8`)
 // funzt // await  axios.get(`https://clr-backend.x-navi.de/jsonapi/node/projekt?filter[field_schlagworter][operator]=IN&filter[field_schlagworter][value]=schlagwort`)
//projekt neu     b0e1c888-6304-4fe0-83fc-255bb4a3cfe3    gruppenadmin b0e1c888-6304-4fe0-83fc-255bb4a3cfe3 selbe gruppenmitglied  projectid mit phase= 6f01abff-4e23-4425-94b4-3743c3ebd82f
// e14117e8-9278-46fc-9e26-217494f611d8
    
            
    },

    
    createProject({commit}, projEntry) {
        
        commit('ADD_PROJECT', projEntry)

    },
}
const mutations ={
    //TODO: authorization token ist noch statisch, dynamisch aus state holen

        /**
    * saves the new project in the backend
    * @param projEntry project which will be added to the backend
    * @param state state as parameter for access and manipulation of state data
    */
    ADD_PROJECT({state, rootState}, projEntry) {
        console.log(projEntry)
        console.log(state)
        projEntry.dozentID= "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
        projEntry.externeID= "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"

        console.log(projEntry.schlagworter)
        const keywords = JSON.stringify(projEntry.schlagworter)
        //projEntry.gruppenadmin= "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
        var data = `{"data": {"type": "node--projekt", "attributes": 
        {"title": "${projEntry.title}", "field_schlagworter": ${keywords}, "field_kurzbeschreibung": "${projEntry.kurzbeschreibung}", "field_externe_mitwirkende": "${projEntry.externeMitwirkende}" }, 
        "relationships": {"field_betreuender_dozent": {"data": {"0": {"type": "user--user", "id": "${projEntry.dozentID}" }}}, 
        "field_gruppenadministrator": {"data": {"0": {"type": "user--user", "id": "${projEntry.gruppenadmin}" }}}, 
        "field_gruppenmitglieder": {"data": {"0": {"type": "user--user", "id": "${projEntry.gruppenadmin}" }}} }}}`;
        var config = {
            method: 'post',
            url: 'https://clr-backend.x-navi.de/jsonapi/node/projekt',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken
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

        /**
    * takes all projects and puts all relevant data of the project in state.projectList
    * filters through all projects and puts all projects of the user in state.myProjects
    * @param projects all project existing in the backend
    * @param drupalUserID id of the user in drupal backend
    * @param state state as parameter for access and manipulation of state data
    */
    LOAD_PROJECT(state, {projects}) {
        
        projects.forEach(element => {
            //const field_betreuender_dozent = element.relationships.field_betreuender_dozent.data.[0].id; -> gets the id, but not the name of the referenced user
            const field_betreuender_dozent = element.relationships.field_betreuender_dozent.data.id;
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
            let field_gruppenmitglieder_IDs = element.attributes.field_gruppenmitglieder

            //console.log(state)
            let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, idd: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder_IDs  }
            // hier vorübergehend in myProjects gepusht, um neuen Login zu testen
            state.myProjects.push(projectObject)



            //console.log(projectObject)

        });
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
