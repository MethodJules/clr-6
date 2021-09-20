<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col sm="5">
          <label for="input-1"> <strong> Projekttitel </strong> </label>
        </b-col>

        <b-col sm="10">
          <b-form-input v-model="getCurrentProject.title" id="input-1">
          </b-form-input>

          <br />
        </b-col>
        <b-col sm="5">
          <label for="input-1"> <strong> Betreuer*in </strong> </label>
        </b-col>

        <b-col sm="10">
          <b-form-select
            v-model="getCurrentProject.betreuenderDozent"
            id="input-1"
          >
            <option
              v-for="lecturer in getLecturers"
              v-bind:value="lecturer.uuid"
              v-bind:key="lecturer.uuid"
            >
              {{ lecturer.name }}
            </option></b-form-select
          >

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

        <b-col sm="5">
          <label for="input-1"> <strong> Schlagwörter </strong> </label>
          <b-row>
            <b-form-input v-model="getKeywords"> </b-form-input>
          </b-row>
        </b-col>

        <b-col sm="10">
          <br />
        </b-col>

        <b-col sm="5">
          <label for="input-1"> <strong> Projektbeschreibung </strong> </label>
        </b-col>

        <b-col sm="10">
          <b-form-textarea
            v-model="getCurrentProject.kurzbeschreibung"
            id="input-1"
          >
          </b-form-textarea>

          <br />
        </b-col>

        <b-col sm="5">
          <label for="input-1"> <strong> Gruppenmitglieder </strong> </label>
          <b-row
            v-for="mitglied in getCurrentProject.gruppenmitglieder"
            :key="mitglied.id"
          >
            <b-form-input
              v-model="mitglied.username"
              id="input-1"
            ></b-form-input>
          </b-row>
        </b-col>

        <b-col sm="10">
          <br />
        </b-col>
      </b-row>
    </b-container>

    <div>
      <b-row>
        <b-col cols="2"> </b-col>
        <b-col cols="3">
          <b-link
            :to="{ name: 'Home' }"
            class="btn btn-outline-dark btn-block mb-2"
            >Zum Dashboard</b-link
          >
        </b-col>
        <b-col cols="3">
          <b-row>
            <div>
              <b-button @click="updateProject()"
                >Beschreibung bearbeiten</b-button
              >
            </div>
          </b-row>
        </b-col>
        <b-col cols="3">
          <b-link
            :to="{ name: 'Groupmanagement' }"
            class="btn btn-outline-dark btn-block mb-2"
            >Zum Gruppenmanagement</b-link
          >
        </b-col>

        <b-col cols="2" />
      </b-row>
    </div>
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

      project2: {
        title: "Projekt",
        betreuenderDozent: ["Muster", "Muster2"],
        externeMitwirkende: "Max",
        kurzbeschreibung: "Kurzbeschreibung x",
        schlagworter: ["Hallo", "test"],
        gruppenmitglieder: ["Max"],
      },

      projectContent: [],
      rightIndex,
      gruppenmitglieder: ["person1", "person 2"],
    };
  },
  methods: {
    findIndex() {
      let rightIndex = 0;
      for (let i = 0; i < this.$store.state.project.myProjects.length; i++) {
        if (
          this.$route.params.project_id ===
          this.$store.state.project.myProjects[i].idd
        ) {
          rightIndex = i;
        }
      }

      return rightIndex;
    },

    updateProject() {
      var schlagwortarray = this.project.schlagworter.split(",");
      var keywords = Object.assign({}, schlagwortarray);
      console.log(keywords);

      var updatedProj = {
        title: this.title,
        kurzbeschreibung: this.project.kurzbeschreibung,
        betreuenderDozent: this.project.betreuenderDozent,
        externeMitwirkende: this.project.externeMitwirkende,
        schlagworter: keywords,
        gruppenadmin: this.$store.state.sparky_api.drupalUserID,
        projectIdd: this.$route.params.project_id,
      };

      this.$store.dispatch("project/updateProject", updatedProj);
    },
  },
  async mounted() {
    this.project2 = this.$store.state.project.currentProject;
    console.log(this.$store.state.project.currentProject);
    console.log(this.project2);
  },
  async created() {
    await this.$store.dispatch("project/loadCurrentProject", this.projectId);
  },

  computed: {
    getCurrentProject() {
      //console.log(this.$store.state.project.currentProject);
      return this.$store.state.project.currentProject;
    },

    getKeywords() {
      let keywords = this.$store.state.project.currentProject.schlagworter;
      console.log(keywords);
      let keywordsInString = keywords.join();
      console.log(keywordsInString);
      return keywordsInString;
    },
    getLecturers() {
      console.log(this.$store.getters.getLecturers);
      console.log(this.$store);
      console.log(this.$store.getters);
      console.log(this.$store.getters["user/getLecturers"]);

      return this.$store.getters["user/getLecturers"];
    },
  },

  mounted() {
    this.$store.dispatch("user/loadLecturersFromBackend");
    this.$store.dispatch("user/loadStudentsFromBackend");
    this.$store.dispatch("profile/loadUserFromBackend");
    console.log(this.$store.state.user.lecturers);
    console.log(this.$store.state.user.students);
  },
};
</script>
