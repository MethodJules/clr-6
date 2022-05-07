<template>
  <div class="page-container">
    <transition name="fade" mode="out-in">
      <div v-if="testButClicked" class="alert" role="alert">
        Erfolgreich gespeichert!
      </div>
    </transition>

    <table>
      <tbody>
        <tr>
          <label class="first-row" for="input-1"> Projekttitel</label>
          <b-form-input
            :disabled="user.role == 'lecturer' || !currentUserisAdmin"
            v-model="currentProject.title"
            id="input-1"
          >
          </b-form-input>
        </tr>
        <tr>
          <label for="betreuenderDozent">Betreuer*innen</label>
          <div class="add-lecturer">
            <div>
              <select
                :disabled="user.role == 'lecturer' || !currentUserisAdmin"
                v-model="selectedLecturer"
                class="form-control"
                @change="addLecturer(selectedLecturer)"
              >
                <option value="" disabled>
                  Bitte wähle eine*n oder mehr Betreuer*innen
                </option>
                <option
                  v-for="lecturer in getLecturers"
                  v-bind:value="lecturer"
                  v-bind:key="lecturer.uuid"
                >
                  {{ lecturer.name }}
                </option>
              </select>
            </div>
            <div class="lecturerTags">
              <ul
                v-for="(betreuenderDozent, i) in currentProjectLecturers"
                :key="i"
              >
                <li>
                  {{ currentProjectLecturers[i].name }}
                  <b-button
                    variant="link"
                    @click="deleteLecturer(i)"
                    :disabled="user.role == 'lecturer' || !currentUserisAdmin"
                    ><b-icon
                      v-if="currentUserisAdmin"
                      size="xs"
                      icon="x"
                      variant="light"
                    ></b-icon
                  ></b-button>
                </li>
              </ul>
            </div>
          </div>
        </tr>
        <tr>
          <label for="tags-basic">Externe Partner*innen </label>
          <b-form-tags
            input-id="tags-basic"
            :disabled="user.role == 'lecturer' || !currentUserisAdmin"
            variant="info"
            v-model="currentProject.externeMitwirkende"
            placeholder="Externe Partner*innen | Eingabe und Enter drücken"
          ></b-form-tags>
        </tr>
        <tr>
          <label for="tags-basic">Schlagwörter </label>
          <b-form-tags
            input-id="tags-basic"
            v-model="currentProject.schlagworter"
            :disabled="user.role == 'lecturer' || !currentUserisAdmin"
            placeholder="Schlagwörter | Eingabe und Enter drücken"
          ></b-form-tags>
        </tr>
        <tr>
          <label for="input-projektBeschreibung"> Projektbeschreibung </label>
          <b-form-textarea
            :disabled="user.role == 'lecturer' || !currentUserisAdmin"
            v-model="currentProject.kurzbeschreibung"
            id="input-projektBeschreibung"
          >
          </b-form-textarea>
        </tr>
        <tr>
          <label for="input-gruppenMitglieder"> Gruppenmitglieder </label>
          <b-row v-for="mitglied in gruppenmitglieder" :key="mitglied.id">
            <b-form-input
              disabled
              v-model="mitglied.username"
              id="input-gruppenMitglieder"
            ></b-form-input>
          </b-row>
          <!-- gruppenmitglieder und gruppenadmins werden in eine liste ausgegeben - Fehler in filter führt dazu, dass 1 Gruppenmitglied immer vorhanden sein muss -> Gruppenadmin kann auch Gruppenmitglied sein und ist dann hier doppelt -->
          <b-row
            v-for="mitglied in currentProjectGroupAdmins"
            :key="mitglied.id"
          >
            <b-form-input
              disabled
              v-model="mitglied.username"
              id="input-2"
            ></b-form-input>
          </b-row>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <b-row class="projectBeschreibung-buttons">
            <b-button :to="{ name: 'Home' }">Zum Dashboard</b-button>

            <b-button v-if="currentUserisAdmin" @click="updateProject()"
              >Änderungen speichern</b-button
            >
            <b-button
              v-if="user.role != 'lecturer'"
              :to="{ name: 'Groupmanagement' }"
              >Zum Gruppenmanagement</b-button
            >

            <b-button
              v-if="user.role == 'lecturer'"
              @click="$bvModal.show('lecturer-leave-group')"
              >Gruppe verlassen
            </b-button>

            <b-modal
              @ok="lecturerLeaveGroup"
              id="lecturer-leave-group"
              title="Bist du dir sicher?"
              ><p>
                Du kannst nicht mehr auf das Projekt zugreifen, wenn du das
                Projekt verlässt!
              </p>
            </b-modal>
          </b-row>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

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
  computed: {
    ...mapGetters({
      getCurrentUserUUID: "profile/getCurrentUserUUID",
      getLecturers: "user/getLecturers",
    }),
    ...mapState("drupal_api", ["user"]),
    ...mapState("project", [
      "currentProject",
      "gruppenmitglieder",
      "currentProjectGroupAdmins",
      "currentProjectLecturers",
    ]),

    // checks if current user is a group administrator by looking for the currentuserid in group admin array
    //needed for some actions like adding and removing members
    currentUserisAdmin() {
      return this.currentProjectGroupAdmins.some(
        (e) => e.userid === this.getCurrentUserUUID
      );
    },
  },
  methods: {
    showThisModal() {
      this.$refs["add_lecturer"].show();
    },

    addLecturer(betreuenderDozent) {
      if (betreuenderDozent != "") {
        this.currentProjectLecturers.push(betreuenderDozent);
      } else {
        alert("Bitte wähle einen Dozenten aus");
      }
    },
    deleteLecturer(index) {
      this.currentProjectLecturers.splice(index, 1);
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
        var keywords = Object.assign({}, this.currentProject.schlagworter);
        let externeMitwirkende = Object.assign(
          {},
          this.currentProject.externeMitwirkende
        );
        /*filter duplicate objects out, by using map to get userid from lecturers and then filtering by it, by looking if indexOf this value (userid) is already in the array. 
        If indexof and index are not the same, this means the userid and respectively the object were already found before in the array, are therefore duplicates and will be removed.
        the end result is an array of the ID attribute only
        Solution from: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript*/

        let dozent_filtered = this.currentProjectLecturers
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
        const kurzbeschreibung = this.currentProject.kurzbeschreibung
          .replace(/(\r\n|\r|\n)/g, "<br>")
          .replace(/(")/g, '\\"');
        var updatedProj = {
          title: this.currentProject.title,
          kurzbeschreibung: kurzbeschreibung,
          betreuenderDozent: dozenten,
          externeMitwirkende: externeMitwirkende,
          schlagworter: keywords,
          projectuuid: this.currentProject.uuid,
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

  watch: {
    testButClicked(val) {
      if (val) {
        setTimeout(() => (this.testButClicked = false), 1000);
      }
    },
  },
  async created() {
    await this.$store.dispatch(
      "project/loadCurrentProject",
      this.$route.params.project_id
    );
  },
  mounted() {
    this.$store.dispatch("user/loadLecturersFromBackend");
    this.$store.dispatch("profile/loadUserFromBackend", this.user.uid);
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
}
table {
  width: 90%;
}

table label {
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
}
table .first-row {
  margin-top: 0 !important;
}

table tbody tr {
  padding-top: 10rem !important;
}
.projectBeschreibung-buttons {
  display: flex;
  justify-content: center;
  margin-top: 1rem !important;
  gap: 1rem;
}
.projectBeschreibung-buttons * {
  max-width: 15rem;
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

.add-lecturer {
  display: flex !important;
  flex-direction: column;
  justify-content: flex-start !important;

  width: 100%;
  padding: 0.3rem 0.1rem;
  min-height: 6rem;
}
.add-lecturer select {
  width: 100% !important;
}

.lecturerTags ul {
  display: inline-block;
  margin: 0;
  padding: 0;
}
.lecturerTags li {
  list-style: none;
  border: 1px solid gray;
  border-radius: 0.5rem;
  background-color: gray;
  color: white;
  margin: 0.2rem 0.1rem 0.2rem 0 !important;
  padding: 0.1rem;
  font-size: 75%;
  font-weight: 400;
  line-height: 1;
}
.lecturerTags li:hover {
  cursor: pointer;
}
.lecturerTags button {
  padding: 0;
  margin: 0;
}
</style>