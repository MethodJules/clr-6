import axios from 'axios';
//TO DO: comments

const state = () => ({
    projectList: [],
    myProjects: [],
    currentProject: {},
    currentProject2: null

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
         
    },



        /**
     * loads all projects from Backend and commits the mutation LOAD_PROJECT
     * and passes drupal user id gotten from rootstate on
    * @param state state as parameter for access and manipulation of state data
    * @param commit commit us used to call a mutation from this function
    * @param rootState rootState allows access to states of other modules in store
    */
         async loadCurrentProject({commit, state, rootState}, projectId) {
            console.log(state)
          var config = {
                method: 'get',
                url: `https://clr-backend.x-navi.de/jsonapi/node/projekt?include=field_gruppenmitglieder&filter[id]=${projectId}`,
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
                    console.log("single project")
                    /* console.log($store.state.sparky_api.validCredential)
                    console.log($store.state.sparky_api.drupalUserID) */
                    const projects = response.data;
                    commit('LOAD_CURRENT_PROJECT', {projects});
    
                })
                .catch(function(error) {
                    console.log(error)
                })
             
        },

        createProject({commit, dispatch, rootState}, projEntry) {
         const keywords = JSON.stringify(projEntry.schlagworter)

            //projEntry.betreuenderDozent= "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
            projEntry.gruppenadmin= "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
            //"field_schlagworter": `${keywords}`,
            //drupal_internal__uid
            //user id of currently logged in user
            let userID= rootState.profile.userData.idd
            console.log(keywords)

            var data = `{
                "data": {
                  "type": "node--projekt",
                  "attributes": {
                    "title": "${projEntry.title}",
                    "field_schlagworter": ${keywords},
                    "field_kurzbeschreibung": "${projEntry.kurzbeschreibung}",
                    "field_externe_mitwirkende": "${projEntry.externeMitwirkende}"
                  },
                  "relationships": {
                    "field_betreuender_dozent": {
                      "data": {
                        "type": "user--user",
                        "id": "${projEntry.betreuenderDozent}"
                      }
                    },
                    "field_gruppenadministrator": {
                      "data": {
                        "type": "user--user",
                        "id": "${userID}"
                      }
                    },
                    "field_gruppenmitglieder": {
                      "data": {
                        "0": {
                          "type": "user--user",
                          "id": "${userID}"
                        }
                      }
                    }
                  }
                }
              }`;

        console.log(projEntry.schlagworter)
        console.log(data)
            var config = {
                method: 'post',
                url: 'https://clr-backend.x-navi.de/jsonapi/node/projekt',
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization': rootState.drupal_api.authToken,
                    'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
                },
                data: data
            };
            
            axios(config)
                .then(function(response){
                     console.log(response)
                     let id_newly_created_project=response.data.data.id
                     console.log(id_newly_created_project)
                     dispatch('phases/createAllPhasesforNewProject', id_newly_created_project, { root: true })
                     commit('ADD_PROJECT', projEntry)
                })
                .catch(function(error) {
                    console.log(error)
                })
            

    
        },

    updateProject({commit, rootState}, projEntry) {
      let userID= rootState.profile.userData.idd
        console.log(projEntry)

        //let index = state.myProjects.indexOf(projEntry);
        //state.myProjects[index]=projEntry;
    projEntry.gruppenadmin= "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
    //projEntry.betreuenderDozent= "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
    const keywords = JSON.stringify(projEntry.schlagworter)
    var data = `{
        "data": {
          "type": "node--projekt",
           "id": "${projEntry.projectIdd}",
          "attributes": {
            "title": "${projEntry.title}",
            "field_schlagworter": ${keywords},
            "field_kurzbeschreibung": "${projEntry.kurzbeschreibung}",
            "field_externe_mitwirkende": "${projEntry.externeMitwirkende}"
          },
          "relationships": {
            "field_betreuender_dozent": {
              "data": {
                "type": "user--user",
                "id": "${projEntry.betreuenderDozent}"
              }
            },
            "field_gruppenadministrator": {
              "data": {
                "type": "user--user",
                "id": "${userID}"
              }
            },
            "field_gruppenmitglieder": {
              "data": {
                "0": {
                  "type": "user--user",
                  "id": "${userID}"
                }
              }
            }
          }
        }
      }`;
    var config = {
        method: 'patch',
        url: `https://clr-backend.x-navi.de/jsonapi/node/projekt/${projEntry.projectIdd}`,
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'Authorization': rootState.drupal_api.authToken,
            'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
        },
        data: data
    };
    axios(config)
    .then(function(response){
        commit('UPDATE_PROJECT', projEntry);
        console.log(response)
    })
    .catch(function(error) {
        console.log(error)
    })


    },
}
const mutations ={
    //TODO: authorization token ist noch statisch, dynamisch aus state holen

        /**
    * saves the new project in the backend
    * @param projEntry project which will be added to the backend
    * @param state state as parameter for access and manipulation of state data
    */
    ADD_PROJECT(state, projEntry) {
        console.log(projEntry)
        console.log(state)
        state.myProjects.push(projEntry)
        console.log(state.myProjects)

    },


    UPDATE_PROJECT(state, projEntry){
        console.table(projEntry)
        console.table(state)
    },


        /**
    * takes all projects and puts all relevant data of the project in state.projectList
    * filters through all projects and puts all projects of the user in state.myProjects
    * @param projects all project existing in the backend
    * @param drupalUserID id of the user in drupal backend
    * @param state state as parameter for access and manipulation of state data
    */
    LOAD_PROJECT(state, {projects}) {
        state.myProjects=[]
        
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
            let field_gruppenmitglieder_IDs = element.relationships.field_gruppenmitglieder.data

            console.log(field_gruppenmitglieder_IDs)
            let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, idd: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder_IDs  }
            // hier vorübergehend in myProjects gepusht, um neuen Login zu testen
            state.myProjects.push(projectObject)

            //console.log(projectObject)

        });
        console.log(state.myProjects)
    },


            /**
    * takes all projects and puts all relevant data of the project in state.projectList
    * filters through all projects and puts all projects of the user in state.myProjects
    * @param projects all project existing in the backend
    * @param drupalUserID id of the user in drupal backend
    * @param state state as parameter for access and manipulation of state data
    */
             LOAD_CURRENT_PROJECT(state, {projects}) {

              let included_data = projects.included
              let user_array = []
              included_data.forEach(element => {
         
               const username = element.attributes.field_fullname;
               const userid = element.id
               user_array.push({username: username, userid: userid,})
         
         
         
              })

                projects.data.forEach(element => {
        
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
                    let field_gruppenmitglieder = user_array
                    // TODO: in Action ändern -> response.data.data wird als parameter an diese funktion übergeben aber included user objects sind
                    // unter response.data.included => also muss das schon in der action geändert werden müssen
                    //let includedUserObjects
        
                    console.log(field_gruppenmitglieder)
                    let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, idd: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder  }
                    let projectObject2 = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, idd: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder  }

                    // hier vorübergehend in myProjects gepusht, um neuen Login zu testen
                    state.currentProject=projectObject
                    state.currentProject2=projectObject2

                });

                    
        
                    //console.log(projectObject)
        
                
            }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
