<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col sm="5">
          <label for="input-1">
            <strong> Projekttitel </strong>
          </label>
        </b-col>

        <b-col sm="10">
          <b-form-input v-model="getCurrentProject.title" id="input-1">
          </b-form-input>

          <br />
        </b-col>
        <b-col sm="5">
          <label for="input-1">
            <strong> Betreuer*in </strong>
          </label>
        </b-col>

        <b-col sm="10">
          <div
            v-for="(betreuenderDozent, i) in getCurrentProjecLecturers"
            :key="i"
          >
            <b-form-input
              v-model="getCurrentProjecLecturers[i].username"
              id="input-2"
            >
            </b-form-input>
          </div>

          <!-- <select v-model="project.betreuenderDozent" class="form-control"> -->
          <!-- <option
              v-for="lecturer in getLecturers"
              v-bind:value="lecturer.uuid"
              v-bind:key="lecturer.uuid"
            > -->
          <!-- {{
              lecturer.name
            }} -->
          <!-- </option> -->
          <!-- </select>
          <span>Selected: {{ project.betreuenderDozent }}</span> -->

          <br />
        </b-col>

        <b-col sm="5">
          <label for="input-1">
            <strong> Externe Partner*innnen </strong>
          </label>
        </b-col>

        <b-col sm="10">
          <b-form-input
            v-model="getCurrentProject.externeMitwirkende"
            id="input-1"
          >
          </b-form-input>

          <br />
        </b-col>

        <b-col sm="10">
          <label for="input-2">
            <strong> Schlagwörter </strong>
          </label>
          <b-row>
            <b-form-input v-model="getKeywords" id="input-2"> </b-form-input>
          </b-row>
        </b-col>

        <b-col sm="10">
          <br />
        </b-col>

        <b-col sm="5">
          <label for="input-1">
            <strong> Projektbeschreibung </strong>
          </label>
        </b-col>

        <b-col sm="10">
          <b-form-textarea
            v-model="getCurrentProject.kurzbeschreibung"
            id="input-1"
          >
          </b-form-textarea>

          <br />
        </b-col>

        <b-col sm="10">
          <label for="input-1">
            <strong> Gruppenmitglieder </strong>
          </label>
          <b-row v-for="mitglied in getGroupMembers" :key="mitglied.id">
            <b-form-input
              v-model="mitglied.username"
              id="input-1"
            ></b-form-input>
          </b-row>
          <!-- gruppenmitglieder und gruppenadmins werden in eine liste ausgegeben - Fehler in filter führt dazu, dass 1 Gruppenmitglied immer vorhanden sein muss -> Gruppenadmin kann auch Gruppenmitglied sein und ist dann hier doppelt -->
          <b-row
            v-for="mitglied in getCurrentProjectGroupAdmins"
            :key="mitglied.id"
          >
            <b-form-input
              v-model="mitglied.username"
              id="input-2"
            ></b-form-input>
          </b-row>
        </b-col>

        <b-col sm="10">
          <br />
        </b-col>
      </b-row>
    </b-container>

    <b-row class="projectBeschreibung-buttons">
      <b-button :to="{ name: 'Home' }">Zum Dashboard</b-button>

      <b-button @click="updateProject()">Beschreibung bearbeiten</b-button>

      <b-button :to="{ name: 'Groupmanagement' }"
        >Zum Gruppenmanagement</b-button
      >
    </b-row>
  </div>
</template>

<script>
import ProjectForm from "@/components/ProjectForm.vue";
export default {
  name: "Projektbeschreibung",
  components: {
    ProjectForm,
  },
  data() {
    var rightIndex;
    return {
      projectId: this.$route.params.project_id,
      rightIndex,
    };
  },
  methods: {
    //TODO: remove unused function?
    findIndex() {
      let rightIndex = 0;
      for (let i = 0; i < this.$store.state.project.myProjects.length; i++) {
        if (
          this.$route.params.project_id ===
          this.$store.state.project.myProjects[i].uuid
        ) {
          rightIndex = i;
        }
      }
      return rightIndex;
    },
    updateProject() {
      console.log(this.$store.state.project.keywordsInString);
      console.log(this.getKeywords);
      var schlagworter = this.$store.state.project.keywordsInString;
      var schlagwortarray = schlagworter.split(",");
      for (var i = 0; i < schlagwortarray.length; ++i) {
        schlagwortarray[i] = schlagwortarray[i].trim();
      }
      var keywords = Object.assign({}, schlagwortarray);
      console.log(keywords);
      var updatedProj = {
        title: this.getCurrentProject.title,
        kurzbeschreibung: this.getCurrentProject.kurzbeschreibung,
        betreuenderDozent: this.getCurrentProject.betreuenderDozent,
        externeMitwirkende: this.getCurrentProject.externeMitwirkende,
        schlagworter: keywords,
        gruppenadmin: this.$store.state.sparky_api.drupalUserID,
        projectuuid: this.$route.params.project_id,
      };
      this.$store.dispatch("project/updateProject", updatedProj);
    },
  },
  async created() {
    console.log(this.$route.params.project_id);
    await this.$store.dispatch(
      "project/loadCurrentProject",
      this.$route.params.project_id
    );
    console.log(this.getCurrentProjecLecturers[0]);
  },
  computed: {
    getGroupMembers() {
      let unfiltered_members =
        this.$store.state.project.currentProject.gruppenmitglieder;
      return unfiltered_members.filter(function (member) {
        //TODO: change the filter criterium to match the static groupmember -> static user in backend has the name "System"
        return member.username != "System";
      });
    },
    getCurrentProject() {
      //console.log(this.$store.state.project.currentProject);
      return this.$store.state.project.currentProject;
    },
    getCurrentProjectGroupAdmins() {
      //console.log(this.$store.state.project.currentProject);
      return this.$store.state.project.currentProjectGroupAdmins;
    },

    getCurrentProjecLecturers() {
      //console.log(this.$store.state.project.currentProject);
      return this.$store.state.project.currentProjectLecturers;
    },

    getKeywords: {
      get() {
        return this.$store.state.project.keywordsInString;
      },
      set(value) {
        //TODO: keyword trimming somewhere?
        this.$store.commit("project/UPDATE_KEYWORDS", value);
      },
    },

    getLecturers() {
      console.log(this.$store.getters["user/getLecturers"]);
      return this.$store.getters["user/getLecturers"];
    },
    getCurrentUserInternalUID() {
      return this.$store.state.drupal_api.user.uid;
    },
  },
  mounted() {
    this.$store.dispatch("user/loadLecturersFromBackend");
    //this.$store.dispatch("user/loadStudentsFromBackend");
    this.$store.dispatch(
      "profile/loadUserFromBackend",
      this.getCurrentUserInternalUID
    );
    console.log(this.$store.state.user.lecturers);
    console.log(this.$store.state.user.students);
  },
};
</script>

<style scoped>
.projectBeschreibung-buttons {
  display: flex;
  justify-content: center;
}
.projectBeschreibung-buttons * {
  margin-right: 1rem;
  margin-bottom: 1rem;
  max-width: 15rem;
}
</style>