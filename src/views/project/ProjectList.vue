<template>
  <div>
    <h1>Meine Projekte</h1>
    <b-row class="projectlist-container">
      <div v-for="project in myProjects" :key="project.uuid">
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
          <b-row class="reflexion-button">
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
import { mapState } from "vuex";
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

  computed: {
    ...mapState("project", ["myProjects"]),
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
.reflexion-button {
  display: flex;
  justify-content: center;
}
</style>