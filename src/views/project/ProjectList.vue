<template>
  <div>
    <h1>Meine Projekte</h1>
    <b-row class="projectlist-container">
      <div v-for="project in getMyProjectlist" :key="project.uuid">
        <b-card class="projects">
          <template #header>
            <b-link
              :to="{
                name: 'Home',
                params: {
                  project_id: project.uuid,
                },
              }"
              class="card-title"
            >
              {{ project.title }}
            </b-link>
          </template>
          <b-row>
            <ReflexionAuswahl :projectId="project.uuid" />
          </b-row>
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
    // this.$store.dispatch("project/loadProjectsFromBackend");
    // this.$store.dispatch("user/loadLecturersFromBackend");
    // this.$store.dispatch("user/loadStudentsFromBackend");
    // this.$store.dispatch("profile/loadProfileFromBackend", this.userUID);
    // this.$store.dispatch("profile/loadUserFromBackend", this.userUID);
  },
};
</script>
<style scoped>
h1 {
  width: 100%;
  display: flex;
  justify-content: center;
}
.projectlist-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.projectlist-container * {
  max-width: 15rem;
}
.card-title {
  display: flex;
  justify-content: center;
  margin: 0;

  text-transform: uppercase;
}

.card-title:hover {
  color: black;
  text-decoration: none;
}
</style>