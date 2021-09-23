import axios from 'axios';
//TO DO: comments

const state = () => ({
  projectList: [],
  myProjects: [],
  currentProject: {},
  currentProjectGroupAdmins: [],
  currentProjectLecturers: [],
  currentProject2: null



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


const actions = {

  /**
   * loads all those projects from Backend where the current user is recorded inside filed_gruppenmitglieder and commits the mutation LOAD_PROJECT
   * and passes drupal user id gotten from rootstate on
  * @param state state as parameter for access and manipulation of state data
  * @param commit commit us used to call a mutation from this function
  * @param rootState rootState allows access to states of other modules in store
  */
  async loadProjectsFromBackend({ commit, state, rootState }) {
    //var drupalUserID = rootState.sparky_api.drupalUserID
    var drupalUserUID = rootState.drupal_api.user.uid
    //console.log(drupalUserUID)

    /*https://clr-backend.ddns.net/jsonapi/node/projekt?
  
  
?filter[rock-group][group][conjunction]=OR
&filter[field_gruppenmitglieder.drupal_internal__uid][operator]=IN&filter[field_gruppenmitglieder.drupal_internal__uid]=${drupalUserUID}
&filter[memberOf]=rock-group

?filter[rock-group][group][conjunction]=OR
&filter[field_gruppenadministrator.drupal_internal__uid][operator]=IN&filter[field_gruppenadministrator.drupal_internal__uid]=${drupalUserUID}
&filter[memberOf]=rock-group`*/
    //TODO: make group_admin_field an array and change the filtering method here from equals to IN
    const filter = `?filter[or-group][group][conjunction]=OR&filter[gruppenmitglieder][condition][path]=field_gruppenmitglieder.drupal_internal__uid&filter[gruppenmitglieder][condition][operator]=IN&filter[gruppenmitglieder][condition][value]=${drupalUserUID}&filter[gruppenmitglieder][condition][memberOf]=or-group&filter[gruppenadministrator][condition][path]=field_gruppenadministrator.drupal_internal__uid&filter[gruppenadministrator][condition][value]=${drupalUserUID}&filter[gruppenadministrator][condition][memberOf]=or-group`

    var config = {
      method: 'get',
      url: `https://clr-backend.ddns.net/jsonapi/node/projekt/${filter}`,
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
        commit('LOAD_PROJECT', { projects });

      })
      .catch(function (error) {
        console.log(error)
      })

  },



  /**
* loads chosen project from backend
* and passes drupal user id gotten from rootstate on
* @param state state as parameter for access and manipulation of state data
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
*/
  async loadCurrentProject({ commit, rootState, dispatch, rootGetters }, projectId) {
    //console.log(state)
    //console.log(projectId)
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
        dispatch('loadCurrentProjectWithGroupAdmins', projectId)
        dispatch('loadCurrentProjectWithLecturers', projectId)
        commit('LOAD_CURRENT_PROJECT', { projects });

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
      url: `https://clr-backend.ddns.net/jsonapi/node/projekt?include=field_gruppenadministrator&filter[id]=${projectId}`,
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
      url: `https://clr-backend.ddns.net/jsonapi/node/projekt?include=field_betreuender_dozent&filter[id]=${projectId}`,
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

    //projEntry.betreuenderDozent= "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
    //projEntry.gruppenadmin = "b0e1c888-6304-4fe0-83fc-255bb4a3cfe3"
    //"field_schlagworter": `${keywords}`,
    //drupal_internal__uid
    //user id of currently logged in user
    //TODO: when a project is created the user is groupadmin and member nobody else - but it should be possible to include multiple dozenten
    let userID = rootState.profile.userData.idd
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
      .then(function (response) {
        console.log(response)
        let id_newly_created_project = response.data.data.id
        console.log(id_newly_created_project)
        //createAllPhasesforNewProject creates all 8 Phases for this project, is in phases.js
        dispatch('phases/createAllPhasesforNewProject', id_newly_created_project, { root: true })
        commit('ADD_PROJECT', projEntry)
      })
      .catch(function (error) {
        console.log(error)
      })



  },

  updateProject({ commit, rootState }, projEntry) {
    let userID = rootState.profile.userData.idd
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
      .then(function (response) {
        commit('UPDATE_PROJECT', projEntry);
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })


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
      url: `https://clr-backend.ddns.net/jsonapi/node/projekt/${state.currentProject.idd}/relationships/${role}`,
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

        commit('ADD_MEMBER', mitglied);
      }).catch(function (error) {
        console.log(error);
      });

  },



  deleteMembers({ rootState, state }, mitglied) {

    let index = state.currentProject.gruppenmitglieder.indexOf(mitglied)
    state.currentProject.gruppenmitglieder.splice(index, 1);

    var data = `{ "data": [{
            "type": "user--user",
             "id": "${mitglied.userid}"
          }]}`;

    var config = {
      method: 'delete',
      url: `https://clr-backend.ddns.net/jsonapi/node/projekt/${state.currentProject.idd}/relationships/field_gruppenmitglieder`,
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

  /*works not before groupadmins is an array in the backend*/
  deleteAdmin({ rootState, state }, mitglied) {

    let index = state.currentProject.gruppenmitglieder.indexOf(mitglied)
    state.currentProject.gruppenmitglieder.splice(index, 1);

    var data = `{ "data": [{
            "type": "user--user",
             "id": "${mitglied.userid}"
          }]}`;

    var config = {
      method: 'delete',
      url: `https://clr-backend.ddns.net/jsonapi/node/projekt/${state.currentProject.idd}/relationships/field_gruppenadministrator`,
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


  UPDATE_PROJECT(state, projEntry) {
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
  LOAD_PROJECT(state, { projects }) {
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
      let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, idd: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder_IDs }
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

      const username = element.attributes.field_fullname;
      const userid = element.id
      user_array.push({ username: username, userid: userid, })



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
      let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, idd: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder }
      //TODO: remove second projectobject here and everywhere else, after projektbeschreibung is changed and cleaned up -> isnt needed anymore after that
      let projectObject2 = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, idd: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder }

      // hier vorübergehend in myProjects gepusht, um neuen Login zu testen

      state.currentProject = projectObject
      console.log(state.currentProject)
      state.currentProject2 = projectObject2

    });

  },
  LOAD_CURRENT_PROJECT_GROUP_ADMIN(state, { groupadmins }) {

    let included_data = groupadmins
    let groupadmins_array = []
    // TODO: error handling, in case there is nothing included?
    included_data.forEach(element => {

      const username = element.attributes.field_fullname;
      const userid = element.id
      groupadmins_array.push({ username: username, userid: userid, })

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

  ADD_MEMBER(state, mitglied) {

    console.log(mitglied)
    state.currentProject.gruppenmitglieder.push(mitglied)
    console.log(state.currentProject.gruppenmitglieder)
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
