<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="testButClicked" class="alert" role="alert">
        Erfolgreich gespeichert!
      </div>
    </transition>
    <b-container fluid>
      <b-row>
        <b-col sm="5">
          <label for="input-1">
            <strong> Projekttitel </strong>
          </label>
        </b-col>

        <b-col sm="10">
          <b-form-input :disabled="getUserRole == 'lecturer' || !currentUserisAdmin" v-model="getCurrentProject.title" id="input-1">
          </b-form-input>

          <br />
        </b-col>
        <b-col sm="5">
          <label for="input-1">
            <strong> Betreuer*in </strong>
          </label>
        </b-col>

        <b-col sm="10">
          <div v-for="(betreuenderDozent, i) in getProjectLecturers" :key="i">
            <b-form-input
              disabled
              v-model="getProjectLecturers[i].name"
              id="input-2"
            >
            </b-form-input>
          </div>
          <b-modal
            ref="add_lecturer"
            title="Dozent hinzufügen"
            cancel-title="Abbrechen"
          >
            <div
              class="add-lecturer"
              v-for="(betreuenderDozent, i) in getProjectLecturers"
              :key="i"
            >
              <b-form-input
                disabled
                v-model="getProjectLecturers[i].name"
                id="input-2"
              >
              </b-form-input>
              <b-button variant="link" @click="deleteLecturer(i)"
                ><b-icon icon="x-circle"></b-icon
              ></b-button>
            </div>
            <div class="add-lecturer">
              <select v-model="selectedLecturer" class="form-control">
                <option
                  v-for="lecturer in getLecturers"
                  v-bind:value="lecturer"
                  v-bind:key="lecturer.uuid"
                >
                  {{ lecturer.name }}
                </option>
              </select>
              <div style="width: 3rem"></div>
            </div>
            <br />

            <b-button size="sm" @click="addLecturer(selectedLecturer)"
              >Weiteren Dozenten hinzufügen</b-button
            >
          </b-modal>
          <b-button
            variant="link"
            v-if="currentUserisAdmin"
            @click="showThisModal()"
            v-b-tooltip.hover
            title="Bitte fügen Sie hier weitere Dozenten hinzu!"
            size="lg"
            ><b-icon icon="plus-circle"></b-icon>
          </b-button>

          <br />
        </b-col>

        <b-col sm="5">
          <label for="input-1">
            <strong> Externe Partner*innnen </strong>
          </label>
        </b-col>

        <b-col sm="10">
          <b-form-input
            :disabled="getUserRole == 'lecturer' || !currentUserisAdmin"
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
            <b-form-input 
            :disabled="getUserRole == 'lecturer' || !currentUserisAdmin"
            v-model="getKeywords" id="input-2"> </b-form-input>
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
            :disabled="getUserRole == 'lecturer' || !currentUserisAdmin"
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
              disabled
              v-model="mitglied.username"
              id="input-1"
            ></b-form-input>
          </b-row>
          <!-- gruppenmitglieder und gruppenadmins werden in eine liste ausgegeben - Fehler in filter führt dazu, dass 1 Gruppenmitglied immer vorhanden sein muss -> Gruppenadmin kann auch Gruppenmitglied sein und ist dann hier doppelt -->
          <b-row v-for="mitglied in getGroupAdmins" :key="mitglied.id">
            <b-form-input
              disabled
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
    <div>
      <b-row class="projectBeschreibung-buttons">
        <b-button :to="{ name: 'Home' }">Zum Dashboard</b-button>

        <b-button v-if="currentUserisAdmin" @click="updateProject()"
          >Änderungen speichern</b-button
        >
        <b-button
          v-if="getUserRole != 'lecturer'"
          :to="{ name: 'Groupmanagement' }"
          >Zum Gruppenmanagement</b-button
        >

        <b-button
          v-if="getUserRole == 'lecturer'"
          @click="$bvModal.show('lecturer-leave-group')"
          >Gruppe verlassen
        </b-button>

        <b-modal
          @ok="lecturerLeaveGroup"
          id="lecturer-leave-group"
          title="Bist du dir sicher?"
          ><p>
            Du kannst nicht mehr auf das Projekt zugreifen, wenn du das Projekt
            verlässt!
          </p>
        </b-modal>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
      lecturersToAdd: [],
      selectedLecturer: "",
      testButClicked: false,
    };
  },
  methods: {
    showThisModal() {
      this.$refs["add_lecturer"].show();
    },

    addLecturer(betreuenderDozent) {
      if (betreuenderDozent != "") {
        this.getProjectLecturers.push(betreuenderDozent);
      } else {
        alert("Bitte wähle einen Dozenten aus");
      }
    },
    deleteLecturer(index) {
      this.getProjectLecturers.splice(index, 1);
    },
    lecturerLeaveGroup() {
      this.$store
        .dispatch(
          "project/leaveGroupLecturer",
          this.$store.state.drupal_api.user
        )
        .then(() => {
          this.$store.dispatch("project/loadProjectsFromBackend");
        });
      this.$router.push("/");
    },

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
      if (this.currentUserisAdmin) {
        var schlagworter = this.$store.state.project.keywordsInString;
        var schlagwortarray = schlagworter.split(",");
        for (var i = 0; i < schlagwortarray.length; ++i) {
          schlagwortarray[i] = schlagwortarray[i].trim();
        }
        var keywords = Object.assign({}, schlagwortarray);

        /*filter duplicate objects out, by using map to get userid from lecturers and then filtering by it, by looking if indexOf this value (userid) is already in the array. 
        If indexof and index are not the same, this means the userid and respectively the object were already found before in the array, are therefore duplicates and will be removed.
        the end result is an array of the ID attribute only
        Solution from: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript*/

        let dozent_filtered = this.getProjectLecturers
          .map((item) => item.uuid)
          .filter(
            (value, index, self) =>
              // && value != undefined -> redundant filtering? addLecturer already checks, that no empty values are added
              self.indexOf(value) === index && value != undefined
          );
        //make dozent object array for http request
        let dataArray = [];
        for (const dozent of dozent_filtered) {
          dataArray.push({ type: "user--user", id: dozent });
        }

        const dozenten = Object.assign({}, dataArray);

        //gruppenadmin and gruppenmitglied should not/cant be changed here, but in gruppenmanagement
        var updatedProj = {
          title: this.getCurrentProject.title,
          kurzbeschreibung: this.getCurrentProject.kurzbeschreibung,
          betreuenderDozent: dozenten,
          externeMitwirkende: this.getCurrentProject.externeMitwirkende,
          schlagworter: keywords,
          projectuuid: this.getCurrentProject.uuid,
        };

        this.$store.dispatch("project/updateProject", updatedProj).then(() => {
          this.testButClicked = true;
          //TODO: load projectdata from backend again, to keep data as synchronous as possible?
        });
      } else {
        alert(
          "Du kannst die Projektbeschreibung nicht anpassen, da du kein Gruppenadministrator bist "
        );
      }
    },
  },
  async created() {
    await this.$store.dispatch(
      "project/loadCurrentProject",
      this.$route.params.project_id
    );
  },
  computed: {
    ...mapGetters({
      getCurrentProject: "project/getCurrentProject",
      getGroupMembers: "project/getGroupMembers",
      getGroupAdmins: "project/getGroupAdmins",
      getCurrentUserUUID: "profile/getCurrentUserUUID",
      getProjectLecturers: "project/getProjectLecturers",
      getCurrentUserInternalUID: "drupal_api/getCurrentUserInternalUID",
      getLecturers: "user/getLecturers",
      getUserRole: "drupal_api/getUserRole",
    }),

    // checks if current user is a group administrator by looking for the currentuserid in group admin array
    //needed for some actions like adding and removing members
    currentUserisAdmin() {
      return this.getGroupAdmins.some(
        (e) => e.userid === this.getCurrentUserUUID
      );
    },

    getKeywords: {
      get() {
        return this.$store.state.project.keywordsInString;
      },
      set(value) {
        this.$store.commit("project/UPDATE_KEYWORDS", value);
      },
    },
  },

  watch: {
    testButClicked(val) {
      if (val) {
        setTimeout(() => (this.testButClicked = false), 1000);
      }
    },
  },
  mounted() {
    this.$store.dispatch("user/loadLecturersFromBackend");
    this.$store.dispatch(
      "profile/loadUserFromBackend",
      this.getCurrentUserInternalUID
    );
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
.add-lecturer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert {
  background-color: lightgreen;
  padding: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>