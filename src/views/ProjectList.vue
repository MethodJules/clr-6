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
            <table>
              <tr v-for="project in getProjectlist" :key="project.id">
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
                          :to="{ name: 'Home', params: { project_id: project.idd } }"
                          class="btn btn-outline-dark btn-block mb-2"
                          >Dashboard</b-link
                        >
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <ReflexionAuswahl />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-card>
              </tr>
            </table>
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
        betreuenderDozent: "",
        externeMitwirkende: "",
        schlagworter: [],

        idd: "",
        title: "",
        /* TODO: array in backend dafür machen schlagwörter: [],
        TODO: array in backend dafür machen betreuenderDozent: [],
        TODO: array in backend dafür machen externeMitwirkende: [], */
      },

      projectList: this.getProjectlist,
    };
  },

  methods: {
    fetchData(proj) {
      this.project.title = proj.title;
    },
    getProjectTitles: function () {
      this.$http.get(
        "https://clr-backend.x-navi.de/jsonapi/node/projekt",
        function (title) {
          this.$set("title", title);
          console.log(title);
        }
      );
    },
  },

computed:{

    getUserID() {
     // return true
      return this.$store.state.sparky_api.drupalUserID
    },
    getProjectlist(){
      return this.$store.state.project.myProjects;
    }

},
  ready: function () {
    this.getProjectTitles();
  },
  /* created(){
    return this.$store.state.project[this.$route.params.titel]
    
  }, */
  async mounted() {
    this.$store.dispatch("project/loadProjectsFromBackend");
    //this.projectList = this.$store.state.project.myProjects;
    console.log(this.projectList);
    console.log("mount projectList");
  },
};
</script>
