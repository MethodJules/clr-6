<template>

  <div>
    <h1>Meine Projekte</h1>
    <br />
    <b-row>
      <!-- <b-card class="m-2"

        v-for="proj in projectList"
        :key="proj.projectId"
        :title="proj.titel"
      > -->

      <div>
        <b-row>
          <b-col>
            <div>
              <table>
                <tr v-for="project in getMyProjectlist" :key="project.uuid">
                  <b-card style="max-height: 20rem">
                    <b-col>
                      <b-row>
                        <b-col>
                          <h3>{{ project.title }}</h3>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <!--                         <b-link

                          :to="{ name: 'Home', params: { user_id: getUserID } }"
                          class="btn btn-outline-dark btn-block mb-2"
                          >Dashboard</b-link
                        >
                      </b-col> -->

                          <b-link
                            :to="{
                              name: 'Home',
                              params: { project_id: project.uuid },
                            }"
                            class="btn btn-outline-dark btn-block mb-2"
                            >Dashboard</b-link
                          >
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <ReflexionAuswahl :projectId="project.uuid" />
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-card>
                </tr>
              </table>
            </div>
          </b-col>
        </b-row>
      </div>
      <!-- </b-card> -->

      <b-card title="Neues Projekt" style="max-height: 10rem" class="m-2">
        <b-row>
          <b-col cols="3">
            <ProjectForm :project="project"></ProjectForm>

            <!-- <b-link class=" btn btn-outline-dark mt-5">Neues Projekt</b-link> -->
          </b-col>
        </b-row>
      </b-card>
    </b-row>
  </div>

</template>

<script>
import ReflexionAuswahl from "@/components/ReflexionAuswahl.vue";
import ProjectForm from "@/components/ProjectForm";
export default {

  name: "ProjectList",

  components: {
    ReflexionAuswahl,
    ProjectForm,
  },
  data() {
    return {
      project: {
        kurzbeschreibung: "",
        betreuenderDozent: [""],
        externeMitwirkende: "",
        schlagworter: [],
        uuid: "",
        title: "",
      },

      //projectList: this.getMyProjectlist,
    };
  },

  methods: {
    fetchData(proj) {
      this.project.title = proj.title;

    },
    data() {
        return {
            project: {
                kurzbeschreibung: "",
                betreuenderDozent: [""],
                externeMitwirkende: "",
                schlagworter: [],
                idd: "",
                title: "",
            },
            //projectList: this.getMyProjectlist,
        };
    },

  },

  computed: {
    getCurrentUserInternalUID() {
      // return true
      return this.$store.state.drupal_api.user.uid;

    },
    computed: {
        getUserID() {
            // return true
            return this.$store.state.sparky_api.drupalUserID;
        },
        getMyProjectlist() {
            return this.$store.state.project.myProjects;
        },
        getLoadingStatus() {
            return this.$store.state.project.loadingStatus;
        },
    },

    getLoadingStatus() {
      return this.$store.state.loadingStatus;

    },
    /* created(){
    return this.$store.state.project[this.$route.params.titel]
    
  }, */

  async mounted() {
    this.$store.dispatch("project/loadProjectsFromBackend").then(() => {});

    //load lecturer student and user for different lists
    this.$store.dispatch("user/loadLecturersFromBackend");
    this.$store.dispatch("user/loadStudentsFromBackend");
    this.$store.dispatch(
      "profile/loadUserFromBackend",
      this.getCurrentUserInternalUID
    );
  },

};
</script>