import axios from "@/config/custom_axios";

//TO DO: comments

const state = () => ({
  allKeywordsList: [],
  myProjects: [],
  currentProject: {},
  currentProjectGroupAdmins: [],
  currentProjectLecturers: [],
  keywordsInString: "",
  projectsFilteredbyKeywords: [],


})


/*   const getters = {
    getRowData(state) {
        return state.rowData;

    }
} */
/* 
const getters = {

  getLecturersFromUser(state, rootGetters) {
    console.log(rootGetters.user.getLecturers)
    return rootGetters["user/getLecturers"];


  },

  getStudentsFromUser(state, rootGetters) {
    console.log(rootGetters.user.getStudents)
    return rootGetters.user.getStudents

  }

} */

const setters = {

}



const actions = {





  /**
* loads all  projects from Backend and commits the mutation LOAD_ALL_PROJECTS
* and passes drupal user id gotten from rootState on
* @param state state as parameter for access and manipulation of state data
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
*/
  async loadProjectFilterbyKeyword({ commit, rootState }, keywords) {
    //var drupalUserID = rootState.sparky_api.drupalUserID
    let keyword_filter = ""
    for (var i = 0; i < keywords.length; ++i) {
      keyword_filter += `&filter[keywords][condition][value][${i + 1}]=${keywords[i]}`
    }
    console.log(keyword_filter)


    const full_filter = `?filter[keywords][condition][path]=field_schlagworter&filter[keywords][condition][operator]=IN${keyword_filter}`

    var config = {
      method: 'get',
      url: `jsonapi/node/projekt/${full_filter}`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
    };

    axios(config)
      .then(function (response) {
        const projects = response.data.data
        commit('PROJECTS_FILTERED_BY_KEYWORD', { projects });


      })
      .catch(function (error) {
        console.log(error)
      })

  },


  /**
 * loads all  projects from Backend and commits the mutation LOAD_ALL_KEYWORDS
 * and passes drupal user id gotten from rootState on
* @param state state as parameter for access and manipulation of state data
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
*/
  async loadAllKeywords({ commit, state, rootState }) {
    //var drupalUserID = rootState.sparky_api.drupalUserID
    console.log(rootState.drupal_api.user)
    var config = {
      method: 'get',
      url: `jsonapi/node/projekt`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(response)
        /* console.log($store.state.sparky_api.validCredential)
        console.log($store.state.sparky_api.drupalUserID) */
        const projects = response.data.data;
        commit('LOAD_ALL_KEYWORDS', { projects });


      })
      .catch(function (error) {
        console.log(error)
      })

  },









  /**
   * loads all those projects from Backend where the current user is recorded inside filed_gruppenmitglieder and commits the mutation LOAD_PROJECTs
   * and passes drupal user id gotten from rootState on
  * @param state state as parameter for access and manipulation of state data
  * @param commit commit us used to call a mutation from this function
  * @param rootState rootState allows access to states of other modules in store
  */
  async loadProjectsFromBackend({ commit, state, rootState, dispatch }) {
    commit("loadingStatus", true, { root: true })
    //var drupalUserID = rootState.sparky_api.drupalUserID
    var drupalUserUID = rootState.drupal_api.user.uid
    console.log(rootState.drupal_api.user)
    //console.log(drupalUserUID)
    //BUG: filter does not find projects where user is group admin, but no group member can be found -> afterwards createproject() can be changed so that the creating user only is groupadmin and not both member and admin

    const filter_or_group = `?filter[or-group][group][conjunction]=OR`
    const filter_gruppenmitglieder = `&filter[gruppenmitglieder][condition][path]=field_gruppenmitglieder.drupal_internal__uid&filter[gruppenmitglieder][condition][operator]=IN&filter[gruppenmitglieder][condition][value]=${drupalUserUID}&filter[gruppenmitglieder][condition][memberOf]=or-group`
    const filter_gruppenadministrator = `&filter[gruppenadministrator][condition][path]=field_gruppenadministrator.drupal_internal__uid&filter[gruppenadministrator][condition][operator]=IN&filter[gruppenadministrator][condition][value]=${drupalUserUID}&filter[gruppenadministrator][condition][memberOf]=or-group`
    const filter_joined = filter_or_group + filter_gruppenmitglieder + filter_gruppenadministrator


    var config = {
      method: 'get',
      url: `jsonapi/node/projekt/${filter_joined}`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
    };

    axios(config)
      .then(function (response) {

        const projects = response.data.data;
        commit('LOAD_MY_PROJECTS', { projects });
        dispatch('todo/loadTodosAllProjects', projects, { root: true })
        commit("loadingStatus", false, { root: true })


      })
      .catch(function (error) {
        console.log(error)
      })

  },


  /**
* loads chosen project from backend
* and passes drupal user id gotten from rootState on
* @param state state as parameter for access and manipulation of state data
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
*/
  async loadCurrentProject({ commit, rootState, dispatch, rootGetters }, projectId) {
    commit("loadingStatus", true, { root: true })
    console.log(projectId)

    //console.log(state)
    //console.log(projectId)
    var config = {
      method: 'get',
      url: `jsonapi/node/projekt?include=field_gruppenmitglieder&filter[id]=${projectId}`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
    };
    console.log(config)
    axios(config)
      .then(function (response) {
        console.log(response)
        // console.log("single project")
        /* console.log($store.state.sparky_api.validCredential)
        console.log($store.state.sparky_api.drupalUserID) */

        /*         console.log(rootGetters["user/getLecturers"])
                let lecturer_array = rootGetters["user/getLecturers"]
        
                console.log(rootGetters["user/getStudents"])
                let student_array = rootGetters["user/getStudents"]
                console.log(response.data.included)
                var intersection = response.data.included.filter(element => student_array.includes(element));
                //intersection = lecturer_array.filter(e => response.data.included.indexOf(e) !== -1);
                console.log(intersection) */

        const projects = response.data;
        console.log(projectId)
        dispatch('loadCurrentProjectWithGroupAdmins', projectId)
        dispatch('loadCurrentProjectWithLecturers', projectId)
        commit('LOAD_CURRENT_PROJECT', { projects });
        commit("loadingStatus", false, { root: true })

      })
      .catch(function (error) {
        console.log(error)
      })

  },

  /**
* @param state state as parameter for access and manipulation of state data
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
*/
  async loadCurrentProjectWithGroupAdmins({ commit, rootState }, projectId) {
    //console.log(state)
    //console.log(projectId)
    var config = {
      method: 'get',
      url: `jsonapi/node/projekt?include=field_gruppenadministrator&filter[id]=${projectId}`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response)

        const groupadmins = response.data.included;
        commit('LOAD_CURRENT_PROJECT_GROUP_ADMIN', { groupadmins });

      })
      .catch(function (error) {
        console.log(error)
      })

  },


  /**
* @param state state as parameter for access and manipulation of state data
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
*/
  async loadCurrentProjectWithLecturers({ commit, rootState }, projectId) {



    //console.log(state)
    //console.log(projectId)
    var config = {
      method: 'get',
      url: `jsonapi/node/projekt?include=field_betreuender_dozent&filter[id]=${projectId}`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response)

        const lecturers = response.data.included;
        commit('LOAD_CURRENT_PROJECT_LECTURERS', { lecturers });

      })
      .catch(function (error) {
        console.log(error)
      })

  },

  /**
* @param state state as parameter for access and manipulation of state data
* @param dispatch calls another action
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* creates a project and makes the person who created it a group admin and a group member. then creates all 8 phases for the project
*/
  createProject({ commit, dispatch, rootState }, projEntry) {
    const keywords = JSON.stringify(projEntry.schlagworter)
    const dozenten = JSON.stringify(projEntry.betreuenderDozent)

    // { "data": [{ "type": "user--user", "id": <user1> }, { "type": "user--user", "id": <user2> }, .... ]};


    //projEntry.betreuenderDozent= "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
    //projEntry.gruppenadmin = "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
    //"field_schlagworter": `${keywords}`,
    //drupal_internal__uid
    //user id of currently logged in user
    //TODO: when a project is created the user is groupadmin and member nobody else - but it should be possible to include multiple dozenten
    //remove groupmember - only admin needed when filter works correctly with admin only

    // { "data": [{ "type": "user--user", "id": <user1> }, { "type": "user--user", "id": <user2> }, .... ]};

    /* 
       let dataArray = [];
    for (const lecturer of allLecturers) {
        dataArray.push({"type": "user--user", "id": lecturerId});
    }
    
    const data = {"data": dataArray};
    
       let dozenten = "["
       for(dozent in projEntry.betreuenderDozent){
         dozenten+= `{ "type": "user--user", "id": <user1> }`,
       } */

    let userID = rootState.profile.userData.uuid
    //the id of the system user, which is needed because of the filtering bug here https://www.drupal.org/project/drupal/issues/3072384
    let system_user_id = "bf1820d0-5477-4df6-b4dd-a1824d5e7794"
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

                    "field_gruppenadministrator": {
                      "data": {
                        "0": {
                          "type": "user--user",
                          "id": "${userID}"
                        }
                      }
                    },
                    "field_gruppenmitglieder": {
                      "data": {
                        "0": {
                          "type": "user--user",
                          "id": "${system_user_id}"
                        }
                      }
                    },
                    "field_betreuender_dozent": {
                      "data":  ${dozenten}
                      
                    }
                  }
                }
              }`;

    console.log(projEntry.schlagworter)
    console.log(data)
    var config = {
      method: 'post',
      url: 'jsonapi/node/projekt',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response)
        let id_newly_created_project = response.data.data.id
        console.log(id_newly_created_project)
        //createAllPhasesforNewProject creates all 8 Phases for this project, is in project_phases.js
        //  dispatch('project_phases/createAllPhasesforNewProject', id_newly_created_project, { root: true })

        //addLecturer does not push one lecturer after the other. array of 3 lecturers -> only 1 lecturer is saved. maybe the quick sequence of post requests leads to a replacement instead of additrion
        /*         for (let gruppenadmin of projEntry.betreuenderDozent) {
                  console.log(gruppenadmin)
                  dispatch('addLecturer', { gruppenadmin, id_newly_created_project })
                } */
        //is the id for new project in frontend when pushing from frontend only? is it needed?
        commit('ADD_PROJECT', projEntry)
      })
      .catch(function (error) {
        console.log(error)
      })



  },

  updateProject({ commit, rootState }, projEntry) {
    let userID = rootState.profile.userData.uuid
    console.log(projEntry)

    //let index = state.myProjects.indexOf(projEntry);
    //state.myProjects[index]=projEntry;
    //projEntry.gruppenadmin = "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
    //projEntry.betreuenderDozent= "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
    //TODO: remove gruppenadmin and gruppenadministrator, or change it -> they can be changed in another function
    const keywords = JSON.stringify(projEntry.schlagworter)
    var data = `{
        "data": {
          "type": "node--projekt",
           "id": "${projEntry.projectuuid}",
          "attributes": {
            "title": "${projEntry.title}",
            "field_schlagworter": ${keywords},
            "field_kurzbeschreibung": "${projEntry.kurzbeschreibung}",
            "field_externe_mitwirkende": "${projEntry.externeMitwirkende}"
          }
        }
      }`;
    var config = {
      method: 'patch',
      url: `jsonapi/node/projekt/${projEntry.projectuuid}`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        commit('UPDATE_PROJECT', projEntry);
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })


  },

  addLecturer({ state, rootState, commit }, { gruppenadmin, id_newly_created_project }) {
    //TODO: Gruppenadministrator in Backend zu array ändern

    /*     let index = state.currentProject.gruppenmitglieder.indexOf(mitglied)
        state.currentProject.gruppenmitglieder.splice(index, 1); */
    console.log(gruppenadmin)
    console.log(id_newly_created_project)


    var data = `{ "data": [{
            "type": "user--user",
             "id": "${gruppenadmin}"
          }]}`;

    var config = {
      method: 'post',
      url: `jsonapi/node/projekt/${id_newly_created_project}/relationships/field_betreuender_dozent`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
      data: data
    };
    axios(config)
      .then((response) => {
        console.log(response);

      }).catch(function (error) {
        console.log(error);
      });

  },


  addMember({ state, rootState, commit }, { mitglied, role }) {

    /*     let index = state.currentProject.gruppenmitglieder.indexOf(mitglied)
        state.currentProject.gruppenmitglieder.splice(index, 1); */
    console.log(mitglied)


    var data = `{ "data": [{
            "type": "user--user",
             "id": "${mitglied.userid}"
          }]}`;

    var config = {
      method: 'post',
      url: `jsonapi/node/projekt/${state.currentProject.uuid}/relationships/${role}`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
      data: data
    };
    axios(config)
      .then((response) => {
        console.log(response);
        console.log(mitglied)
        if (role == "field_gruppenmitglieder") {
          commit('ADD_GROUPMEMBER', mitglied);
        } else {
          commit('ADD_GROUPADMIN', mitglied);
        }

      }).catch(function (error) {
        console.log(error);
      });

  },



  deleteMembers({ rootState, state }, mitglied) {


    console.log(mitglied)

    var data = `{ "data": [{
            "type": "user--user",
             "id": "${mitglied.userid}"
          }]}`;

    var config = {
      method: 'delete',
      url: `jsonapi/node/projekt/${state.currentProject.uuid}/relationships/field_gruppenmitglieder`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
      data: data
    };
    axios(config)
      .then((response) => {
        console.log(response);
        let index = state.currentProject.gruppenmitglieder.indexOf(mitglied)
        state.currentProject.gruppenmitglieder.splice(index, 1);
        // commit('deleteMemberFrontend', payload);
      }).catch(function (error) {
        console.log(error);
      });

  },

  /*works not before groupadmins is an array in the backend*/
  deleteAdmin({ rootState, state }, mitglied) {
    let index = state.currentProjectGroupAdmins.indexOf(mitglied)
    state.currentProjectGroupAdmins.splice(index, 1);

    var data = `{ "data": [{
            "type": "user--user",
             "id": "${mitglied.userid}"
          }]}`;

    var config = {
      method: 'delete',
      url: `jsonapi/node/projekt/${state.currentProject.uuid}/relationships/field_gruppenadministrator`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': rootState.drupal_api.authToken,
        'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
      },
      data: data
    };
    axios(config)
      .then((response) => {
        console.log(response);
        // commit('deleteMemberFrontend', payload);
      }).catch(function (error) {
        console.log(error);
      });

  },

}


const mutations = {

  loadingStatus(state, newLoadingStatus) {
    state.loadingStatus = newLoadingStatus
  },



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


  UPDATE_KEYWORDS(state, keywords) {
    console.log(keywords)
    console.log(state.keywordsInString)

    state.keywordsInString = keywords
    console.log(state.keywordsInString)
  },


  UPDATE_PROJECT(state, projEntry) {
    console.table(projEntry)
    console.table(state)
  },





  PROJECTS_FILTERED_BY_KEYWORD(state, { projects }) {
    console.log(projects)
    state.projectsFilteredbyKeywords = []
    //TODO: maybe just save all the keywords for projectsearch and not everything, because every search is a new http request?


    projects.forEach(element => {
      console.log(element)
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
      const field_gruppenmitglieder_IDs = element.relationships.field_gruppenmitglieder.data

      //console.log(field_gruppenmitglieder_IDs)
      let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, uuid: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder_IDs }
      // hier vorübergehend in myProjects gepusht, um neuen Login zu testen
      state.projectsFilteredbyKeywords.push(projectObject)

      //console.log(projectObject)

    });

    console.log(state.projectsFilteredbyKeywords)
    //filter duplicates (indexof) and empty entries (item != "") from array before making an dozent object array 
    console.log(state.projectsFilteredbyKeywords)
  },


  /**
* takes all projects and puts all relevant data of the project in state.projectList
* filters through all projects and puts all projects of the user in state.myProjects
* @param projects all project existing in the backend
* @param drupalUserID id of the user in drupal backend
* @param state state as parameter for access and manipulation of state data
*/
  LOAD_ALL_KEYWORDS(state, { projects }) {
    state.allKeywordsList = []
    //TODO: maybe just save all the keywords for projectsearch and not everything, because every search is a new http request?
    projects.forEach(element => {
      element.attributes.field_schlagworter.forEach(element => {
        state.allKeywordsList.push(element)
      })
    });
    console.log(state.allKeywordsList)
    //filter duplicates (indexof) and empty entries (item != "") from array before making an dozent object array 
    state.allKeywordsList = state.allKeywordsList.filter(
      (item, index) => {
        return (
          state.allKeywordsList.indexOf(item) === index && item != ""
        );
      }
    );
    console.log(state.allKeywordsList)
  },



  /**
* takes all projects and puts all relevant data of the project in state.projectList
* filters through all projects and puts all projects of the user in state.myProjects
* @param projects all project existing in the backend
* @param drupalUserID id of the user in drupal backend
* @param state state as parameter for access and manipulation of state data
*/
  LOAD_MY_PROJECTS(state, { projects }) {
    state.myProjects = []

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

      //console.log(field_gruppenmitglieder_IDs)
      let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, uuid: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder_IDs }
      // hier vorübergehend in myProjects gepusht, um neuen Login zu testen
      state.myProjects.push(projectObject)

      //console.log(projectObject)

    });
    // console.log(state.myProjects)
  },


  /**
* takes all projects and puts all relevant data of the project in state.projectList
* filters through all projects and puts all projects of the user in state.myProjects
* @param projects all project existing in the backend
* @param drupalUserID id of the user in drupal backend
* @param state state as parameter for access and manipulation of state data
*/
  LOAD_CURRENT_PROJECT(state, { projects }) {

    let included_data = projects.included
    let user_array = []
    // TODO: error handling, in case there is nothing included?
    included_data.forEach(element => {
      const internal_uid = element.attributes.drupal_internal__uid
      const username = element.attributes.field_fullname;
      const userid = element.id
      user_array.push({ username: username, userid: userid, internal_uid: internal_uid })
      console.log(internal_uid)



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

      // console.log(field_gruppenmitglieder)
      let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, uuid: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder }
      //TODO: remove second projectobject here and everywhere else, after projektbeschreibung is changed and cleaned up -> isnt needed anymore after that

      // hier vorübergehend in myProjects gepusht, um neuen Login zu testen

      state.currentProject = projectObject
      console.log(state.currentProject)

    });
    let keywords = state.currentProject.schlagworter;
    console.log(keywords);
    let keywordsInString = keywords.join();
    console.log(keywordsInString);
    state.keywordsInString = keywordsInString
  },
  LOAD_CURRENT_PROJECT_GROUP_ADMIN(state, { groupadmins }) {

    let included_data = groupadmins
    let groupadmins_array = []
    // TODO: error handling, in case there is nothing included?
    included_data.forEach(element => {

      const username = element.attributes.field_fullname;
      const userid = element.id
      const internal_uid = element.attributes.drupal_internal__uid
      groupadmins_array.push({ username: username, userid: userid, internal_uid: internal_uid })

    })
    state.currentProjectGroupAdmins = groupadmins_array
    console.log(state.currentProjectGroupAdmins)
  },

  LOAD_CURRENT_PROJECT_LECTURERS(state, { lecturers }) {

    let included_data = lecturers
    let lecturers_array = []
    // TODO: error handling, in case there is nothing included?
    included_data.forEach(element => {

      const username = element.attributes.field_fullname;
      const userid = element.id
      lecturers_array.push({ username: username, userid: userid, })

    })
    state.currentProjectLecturers = lecturers_array
    console.log(state.currentProjectLecturers)
    //console.log(lecturers_array)
  },

  ADD_GROUPMEMBER(state, mitglied) {
    state.currentProject.gruppenmitglieder.push(mitglied)
  },

  ADD_GROUPADMIN(state, mitglied) {
    state.currentProjectGroupAdmins.push(mitglied)

  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  setters,
}
