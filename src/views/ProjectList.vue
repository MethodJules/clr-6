<template>
  <div>
    <h1>Meine Projekte</h1>
    <br />
    <b-row class="projectlist-container">
      <b-card title="Neues Projekt" v-if="getUserRole != 'lecturer'">
        <ProjectForm :project="project"></ProjectForm>
      </b-card>

      <div v-for="project in getMyProjectlist" :key="project.uuid">
        <b-card class="projects">
          <h3>
            {{ project.title }}
          </h3>

          <b-link
            :to="{
              name: 'Home',
              params: {
                project_id: project.uuid,
              },
            }"
            class="btn btn-outline-dark btn-block mb-2"
            @click="setCurrentProject(project)"
            >Dashboard</b-link
          >
          <ReflexionAuswahl :projectId="project.uuid" />
        </b-card>
      </div>
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

    setCurrentProject(project) {
      console.log(project);
      this.$store.commit("todo/SET_CURRENT_PROJECT", project);
    },
  },

  computed: {
    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },
    getCurrentUserInternalUID() {
      // return true
      return this.$store.state.drupal_api.user.uid;
    },

    getLoadingStatus() {
      return this.$store.state.loadingStatus;
    },
    getMyProjectlist() {
      return this.$store.state.project.myProjects;
    },
  },

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
<style scoped>
.projectlist-container {
  display: flex;
}
.projectlist-container * {
  margin-right: 1rem;
  max-width: 15rem;
}
.projects * {
  width: 100%;
}
</style>