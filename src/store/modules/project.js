import axios from "@/config/custom_axios";

const state = () => ({
  allKeywordsList: [],
  myProjects: [],
  currentProject: {},
  currentProjectGroupAdmins: [],
  currentProjectLecturers: [],
  keywordsInString: "",
  projectsFilteredbyKeywords: [],
})

const getters = {

  /**
* @param state state as parameter for access and manipulation of state data
* getter for current project
*/
  getCurrentProject(state) {
    return state.currentProject;
  },

  /**
  * @param state state as parameter for access and manipulation of state data
  * getter for group members of current project. filters the system user out. see function create_project for clarification why this user exists
  */
  getGroupMembers(state) {
    let unfiltered_members =
      state.currentProject.gruppenmitglieder;
    return unfiltered_members.filter(function (member) {
      return member.username != "System";
    });
  },

  /**
* @param state state as parameter for access and manipulation of state data
* getter for group admins of current project
*/
  getGroupAdmins(state) {
    return state.currentProjectGroupAdmins;
  },

  /**
* @param state state as parameter for access and manipulation of state data
* getter for lecturers of current project
*/
  getProjectLecturers(state) {
    return state.currentProjectLecturers;
  },
}



const actions = {
  /**
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* @param keywords keyword string array for filtering/searching projects
* loads all projects from Backend filtered by keywords given as params
*/
  async loadProjectFilterbyKeyword({ commit, rootState }, keywords) {
    let keyword_filter = ""
    for (var i = 0; i < keywords.length; ++i) {
      keyword_filter += `&filter[keywords][condition][value][${i + 1}]=${keywords[i]}`
    }
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
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
 * loads all  projects from Backend and commits mutation which only saves all unique keywords given for projects
*/
  async loadAllKeywords({ commit, rootState }) {
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
        const projects = response.data.data;
        commit('LOAD_ALL_KEYWORDS', { projects });
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  /**
   * loads all those projects from Backend where the current user is recorded inside filed_gruppenmitglieder and commits the mutation LOAD_MY_PROJECTs
   * also calls loadTodosAllProjects, which loads all todos of all projects
  * @param rootState rootState allows access to states of other modules in store
  * @param commit commit us used to call a mutation from this function
  * @param dispatch dispatch is used to call another action from this function
  */
  async loadProjectsFromBackend({ commit, rootState, dispatch }) {
    let filter_joined = ""
    const authToken = sessionStorage.getItem("auth_token");
    const csrfToken = localStorage.getItem("csrf_token");
    const user = JSON.parse(sessionStorage.getItem("current_user"));
    const drupalUserUID = user.uid;
    // var drupalUserUID = rootState.drupal_api.user.uid;
    console.log(user)
    //depending on role of a user (if user is student or lecturer) the filters are different: student -> filter by id in gruppenadministrator and gruppenmitglied; lecturer -> filter by id in betreuender_dozent
    //TODO: maybe make another else part for "superdozent/admin" role.
    if (user.role == "student") {
      const filter_or_group = `?filter[or-group][group][conjunction]=OR`
      const filter_gruppenmitglieder = `&filter[gruppenmitglieder][condition][path]=field_gruppenmitglieder.drupal_internal__uid&filter[gruppenmitglieder][condition][operator]=IN&filter[gruppenmitglieder][condition][value]=${drupalUserUID}&filter[gruppenmitglieder][condition][memberOf]=or-group`
      const filter_gruppenadministrator = `&filter[gruppenadministrator][condition][path]=field_gruppenadministrator.drupal_internal__uid&filter[gruppenadministrator][condition][operator]=IN&filter[gruppenadministrator][condition][value]=${drupalUserUID}&filter[gruppenadministrator][condition][memberOf]=or-group`
      filter_joined = filter_or_group + filter_gruppenmitglieder + filter_gruppenadministrator
    } else if (user.role == "lecturer") {
      filter_joined = `?filter[field_betreuender_dozent][condition][path]=field_betreuender_dozent.drupal_internal__uid&filter[field_betreuender_dozent][condition][operator]=IN&filter[field_betreuender_dozent][condition][value]=${drupalUserUID}`
    }
    //if user has no valid role -> dont load anything
    else {
      return
    }

    commit("loadingStatus", true, { root: true })
    var config = {
      method: 'get',
      url: `jsonapi/node/projekt/${filter_joined}`,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': authToken,
        'X-CSRF-Token': csrfToken
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
* @param dispatch dispatch is used to call another action from this function
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* @param projectId id of project to load
* loads chosen project from backend, then dispatches 2 other functions which load groupadmins and lecturers of chosen project (done in 3 seperate fnctions because response.data.include does not differntiate between different content and only returns a single list)
*/
  async loadCurrentProject({ commit, rootState, dispatch }) {
    let projectId = sessionStorage.getItem("projectId");

    commit("loadingStatus", true, { root: true })
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
    axios(config)
      .then(function (response) {
        console.log(response)
        const projects = response.data;
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
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* @param projectId id of project to load
* loads chosen project from backend and saves groupadmins of chosen project(done in 3 seperate fnctions because response.data.include does not differntiate between different content and only returns a single list)
*/
  async loadCurrentProjectWithGroupAdmins({ commit, rootState }, projectId) {
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
    return axios(config)
      .then(function (response) {
        const groupadmins = response.data.included;
        commit('LOAD_CURRENT_PROJECT_GROUP_ADMIN', { groupadmins });
      })
      .catch(function (error) {
        console.log(error)
      })
  },


  /**
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* @param projectId id of project to load
* loads chosen project from backend and saves lecturers of chosen project(done in 3 seperate fnctions because response.data.include does not differntiate between different content and only returns a single list)
*/
  async loadCurrentProjectWithLecturers({ commit, rootState }, projectId) {
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
        const lecturers = response.data.included;
        commit('LOAD_CURRENT_PROJECT_LECTURERS', { lecturers });
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  /**
* @param dispatch calls another action
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* @param projEntry project object which shall be created in backend
* creates a project and makes the person who created it a group admin. The user "System" is put in as a group member (needed because of issue described here https://www.drupal.org/project/drupal/issues/3072384). 
*then creates all 8 phases for the project
*/
  createProject({ commit, dispatch, rootState }, projEntry) {
    const keywords = JSON.stringify(projEntry.schlagworter)
    const dozenten = JSON.stringify(projEntry.betreuenderDozent)
    let beschreibung = projEntry.kurzbeschreibung.replace(/(\r\n|\r|\n)/g, '<br>');
    let userID = rootState.profile.userData.uuid
    //the id of the system user, which is needed because of the filtering bug here https://www.drupal.org/project/drupal/issues/3072384
    let system_user_id = "bf1820d0-5477-4df6-b4dd-a1824d5e7794"

    var data = `{
                "data": {
                  "type": "node--projekt",
                  "attributes": {
                    "title": "${projEntry.title}",
                    "field_schlagworter": ${keywords},
                    "field_kurzbeschreibung": "${beschreibung}",
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
        let id_newly_created_project = response.data.data.id
        //createAllPhasesforNewProject creates all 8 Phases for this project, is in project_phases.js
        dispatch('project_phases/createAllPhasesforNewProject', id_newly_created_project, { root: true })
        let new_project = response.data.data
        commit('ADD_PROJECT', new_project)
        alert("Dein neues Projekt wurde erfolgreich erstellt");
      })
      .catch(function (error) {
        alert("Dein neues Projekt konnte leider nicht erstellt werden");
        console.log(error)
      })
  },
  /**
* @param rootState rootState allows access to states of other modules in store
* @param projEntry project object which is about to be updated
* updates a project in projektbeschreibung.vue (not all values can be changed here)
*/
  updateProject({ rootState }, projEntry) {
    const dozenten = JSON.stringify(projEntry.betreuenderDozent)
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
          },
          "relationships": {
            "field_betreuender_dozent": {
              "data":  ${dozenten}    
            }
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
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  /**
* @param state state as parameter for access and manipulation of state data
* @param commit commit us used to call a mutation from this function
* @param rootState rootState allows access to states of other modules in store
* @param mitglied member to be added
* @param role role the member is should have (gruppenmitglied or gruppenadministrator)
* adds a new member to the group/project
*/
  addMember({ state, rootState, commit }, { mitglied, role }) {

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
        if (role == "field_gruppenmitglieder") {
          commit('ADD_GROUPMEMBER', mitglied);
        } else {
          commit('ADD_GROUPADMIN', mitglied);
        }

      }).catch(function (error) {
        console.log(error);
      });

  },


  /**
* @param state state as parameter for access and manipulation of state data
* @param rootState rootState allows access to states of other modules in store
* @param mitglied member to be deleted (only gruppenmitglieder) 
* deletes a member from group/project
*/
  deleteMembers({ rootState, state }, mitglied) {

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
        let index = state.currentProject.gruppenmitglieder.indexOf(mitglied)
        state.currentProject.gruppenmitglieder.splice(index, 1);
      }).catch(function (error) {
        console.log(error);
      });

  },

  /**
* @param state state as parameter for access and manipulation of state data
* @param rootState rootState allows access to states of other modules in store
* @param mitglied member to be deleted (only gruppenadministratoren) 
* deletes an admin from group/project
*/
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
      }).catch(function (error) {
        console.log(error);
      });

  },

  /**
* @param state state as parameter for access and manipulation of state data
* @param rootState rootState allows access to states of other modules in store
* @param mitglied member to be deleted (only lecturers) 
* deletes a lecturer from group/project
*/
  leaveGroupLecturer({ rootState, state }, mitglied) {

    var data = `{ "data": [{
            "type": "user--user",
             "id": "${mitglied.uuid}"
          }]}`;

    var config = {
      method: 'delete',
      url: `jsonapi/node/projekt/${state.currentProject.uuid}/relationships/field_betreuender_dozent`,
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
      }).catch(function (error) {
        console.log(error);
      });
  },
}


const mutations = {

  /**
* @param new_project project which will be added to the backend
* @param state state as parameter for access and manipulation of state data
* saves the new project in state, pushes it in myproject array
*/
  ADD_PROJECT(state, new_project) {

    const field_betreuender_dozent = new_project.relationships.field_betreuender_dozent.data;
    const field_externe_mitwirkende = new_project.attributes.field_externe_mitwirkende;
    const field_schlagworter = new_project.attributes.field_schlagworter;
    const field_kurzbeschreibung = new_project.attributes.field_kurzbeschreibung;
    const field_id = new_project.id;
    const field_title = new_project.attributes.title;
    let field_gruppenmitglieder_IDs = new_project.relationships.field_gruppenmitglieder.data
    let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, uuid: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder_IDs }
    state.myProjects.push(projectObject)
  },

  /**
* @param keywords keywords to be updated
* @param state state as parameter for access and manipulation of state data
* setter for keywords in projektbeschreibung
*/
  UPDATE_KEYWORDS(state, keywords) {
    state.keywordsInString = keywords
  },



  /**
* @param projects projects filtered by keywords
* @param state state as parameter for access and manipulation of state data
* projects filtered by keywords saved in state to show user projects that match his search result
*/
  PROJECTS_FILTERED_BY_KEYWORD(state, { projects }) {
    state.projectsFilteredbyKeywords = []
    projects.forEach(element => {
      const field_betreuender_dozent = element.relationships.field_betreuender_dozent.data.id;
      const field_externe_mitwirkende = element.attributes.field_externe_mitwirkende;
      const field_schlagworter = element.attributes.field_schlagworter;
      const field_kurzbeschreibung = element.attributes.field_kurzbeschreibung;
      const field_id = element.id;
      const field_title = element.attributes.title;
      const field_gruppenmitglieder_IDs = element.relationships.field_gruppenmitglieder.data
      let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, uuid: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder_IDs }
      state.projectsFilteredbyKeywords.push(projectObject)
    });
  },


  /**
* @param projects all projects existing in the backend
* @param state state as parameter for access and manipulation of state data
* saves only keywords from all projects in state
*/
  LOAD_ALL_KEYWORDS(state, { projects }) {
    state.allKeywordsList = []
    projects.forEach(element => {
      element.attributes.field_schlagworter.forEach(element => {
        state.allKeywordsList.push(element)
      })
    });
    //filter duplicates (indexof) and empty entries (item != "") from array before making an dozent object array 
    state.allKeywordsList = state.allKeywordsList.filter(
      (item, index) => {
        return (
          state.allKeywordsList.indexOf(item) === index && item != ""
        );
      }
    );
  },



  /**
* filters through all projects and puts all projects of the user in state.myProjects
* @param projects all project existing in the backend
* @param state state as parameter for access and manipulation of state data
*/
  LOAD_MY_PROJECTS(state, { projects }) {
    state.myProjects = []
    projects.forEach(element => {
      const field_betreuender_dozent = element.relationships.field_betreuender_dozent.data;
      const field_externe_mitwirkende = element.attributes.field_externe_mitwirkende;
      const field_schlagworter = element.attributes.field_schlagworter;
      const field_kurzbeschreibung = element.attributes.field_kurzbeschreibung.replace(/<br>/gi, '\n');
      const field_id = element.id;
      const field_title = element.attributes.title;
      let field_gruppenmitglieder_IDs = element.relationships.field_gruppenmitglieder.data
      let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, uuid: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder_IDs }
      state.myProjects.push(projectObject)
    });
  },


  /**
* puts current project with all its data in state
* @param projects all project existing in the backend
* @param state state as parameter for access and manipulation of state data
*/
  LOAD_CURRENT_PROJECT(state, { projects }) {

    let included_data = projects.included
    let user_array = []
    if (included_data != undefined) {
      included_data.forEach(element => {
        const internal_uid = element.attributes.drupal_internal__uid
        const username = element.attributes.field_fullname;
        const userid = element.id
        user_array.push({ username: username, userid: userid, internal_uid: internal_uid })
      })
    }

    projects.data.forEach(element => {
      const field_betreuender_dozent = element.relationships.field_betreuender_dozent.data.id;
      const field_externe_mitwirkende = element.attributes.field_externe_mitwirkende;
      const field_schlagworter = element.attributes.field_schlagworter;
      const field_kurzbeschreibung = element.attributes.field_kurzbeschreibung.replace(/<br>/gi, '\n');
      const field_id = element.id;
      const field_title = element.attributes.title;
      let field_gruppenmitglieder = user_array
      let projectObject = { betreuenderDozent: field_betreuender_dozent, externeMitwirkende: field_externe_mitwirkende, schlagworter: field_schlagworter, kurzbeschreibung: field_kurzbeschreibung, uuid: field_id, title: field_title, gruppenmitglieder: field_gruppenmitglieder }

      state.currentProject = projectObject
    });
    let keywords = state.currentProject.schlagworter;
    let keywordsInString = keywords.join();
    state.keywordsInString = keywordsInString
  },

  /**
* puts current project/group admins in state
* @param groupadmins all project existing in the backend
* @param state state as parameter for access and manipulation of state data
*/
  LOAD_CURRENT_PROJECT_GROUP_ADMIN(state, { groupadmins }) {
    let groupadmins_array = []
    if (groupadmins != undefined) {
      let included_data = groupadmins
      included_data.forEach(element => {
        const username = element.attributes.field_fullname;
        const userid = element.id
        const internal_uid = element.attributes.drupal_internal__uid
        groupadmins_array.push({ username: username, userid: userid, internal_uid: internal_uid })
      })
    }
    state.currentProjectGroupAdmins = groupadmins_array
  },

  /**
* puts current project/group lecturers in state
* @param mitglied member to be deleted (only gruppenmitglieder) 
* @param state state as parameter for access and manipulation of state data
*/
  LOAD_CURRENT_PROJECT_LECTURERS(state, { lecturers }) {
    let lecturers_array = []
    let included_data = lecturers
    if (included_data != undefined) {
      included_data.forEach(element => {
        const name = element.attributes.field_fullname;
        const uuid = element.id
        lecturers_array.push({ name: name, uuid: uuid, })
      })
    }
    state.currentProjectLecturers = lecturers_array
  },

  /**
* adds new groupmember/gruppenmitglied to state, after it was uploaded to backend in action
* @param projects all project existing in the backend
* @param state state as parameter for access and manipulation of state data
*/
  ADD_GROUPMEMBER(state, mitglied) {
    state.currentProject.gruppenmitglieder.push(mitglied)
  },

  /**
* adds new groupadmin/gruppenadministrator to state, after it was uploaded to backend in action
* @param mitglied member to be deleted (only gruppenadministratoren) 
* @param state state as parameter for access and manipulation of state data
*/
  ADD_GROUPADMIN(state, mitglied) {
    state.currentProjectGroupAdmins.push(mitglied)
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
