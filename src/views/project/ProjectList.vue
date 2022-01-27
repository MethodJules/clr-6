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
import { mapGetters } from "vuex";

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
        betreuenderDozent: [],
        externeMitwirkende: "",
        schlagworter: [],
        uuid: "",
        title: "",
      },
    };
  },

  methods: {
    fetchData(proj) {
      this.project.title = proj.title;
    },
  },

  computed: {
    ...mapGetters({
      getUserRole: "drupal_api/getUserRole",
      getCurrentProject: "project/getCurrentProject",
      userUID: "drupal_api/getCurrentUserInternalUID",
    }),

    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },
    getCurrentUserInternalUID() {
      return this.$store.state.drupal_api.user.uid;
    },

    getMyProjectlist() {
      return this.$store.state.project.myProjects;
    },
  },

  mounted() {
    // why there is a then here. there is nothing in it....
    // this.$store.dispatch("project/loadProjectsFromBackend").then(() => {});
    this.$store.dispatch("project/loadProjectsFromBackend");
    this.$store.dispatch("user/loadLecturersFromBackend");
    this.$store.dispatch("user/loadStudentsFromBackend");
    this.$store.dispatch("profile/loadProfileFromBackend", this.userUID);
    this.$store.dispatch("profile/loadUserFromBackend", this.userUID);
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