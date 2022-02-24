<template>
  <div class="projektAnlegen">
    <h3>Neu Prejekt Erstellen</h3>
    <br />
    <table>
      <tr>
        <td>
          <label for="title">Projekttitel</label>
        </td>
      </tr>
      <tr>
        <td>
          <div class="form-group">
            <input
              id="title"
              v-model="project.title"
              type="text"
              placeholder="hier eingeben"
              class="form-control"
            />
            <span
              v-if="!$v.project.title.required && $v.project.title.$dirty"
              class="text-danger"
              >Bitte trage einen Titel ein!</span
            >
            <span
              v-if="!$v.project.title.minLength && $v.project.title.$dirty"
              class="text-danger"
              >Der Titel sollte mindestens 4 Zeichen lang sein.</span
            >
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <label for="betreuenderDozent"
            >Betreuer*innen (Mehrfachauswahl möglich)</label
          >
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <div class="add-lecturer">
              <div>
                <select
                  v-model="selectedLecturer"
                  class="form-control"
                  @change="addLecturer(selectedLecturer)"
                >
                  <option value="" disabled>
                    Bitte wahlen Sie ein oder mehr Betreuerinnen
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
                  v-for="(betreuenderDozent, i) in project.betreuenderDozent"
                  :key="i"
                >
                  <li>
                    {{ project.betreuenderDozent[i].name }}
                    <b-button variant="link" @click="deleteLecturer(i)"
                      ><b-icon size="xs" icon="x" variant="light"></b-icon
                    ></b-button>
                  </li>
                </ul>
              </div>
            </div>
            <span
              v-if="
                !$v.project.betreuenderDozent.required &&
                $v.project.betreuenderDozent.$dirty
              "
              class="text-danger"
              >Bitte füge einen Betreuer oder eine Betreuerin hinzu.</span
            >
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="form-group">
            <label for="tags-basic">Externe Partner*innen </label>
            <b-form-tags
              input-id="tags-basic"
              variant="info"
              v-model="project.externeMitwirkende"
              placeholder="Externe Partner*innen | Type and press enter"
            ></b-form-tags>
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="form-group">
            <label for="tags-basic">Schlagwörter </label>
            <b-form-tags
              input-id="tags-basic"
              v-model="project.schlagworter"
              placeholder="Schlagwörter | Type a new tag and press enter"
            ></b-form-tags>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <label for="kurzbeschreibung">Projektbeschreibung</label>
        </td>
      </tr>
      <tr>
        <td>
          <div class="form-group">
            <b-form-textarea
              id="kurzbeschreibung"
              v-model="project.kurzbeschreibung"
              type="text"
              placeholder="hier eingeben"
              class="form-control"
            />
            <span
              v-if="
                !$v.project.kurzbeschreibung.required &&
                $v.project.kurzbeschreibung.$dirty
              "
              class="text-danger"
              >Bitte gebe deinem Projekt eine kurze Beschreibung.</span
            >
            <span
              v-if="
                !$v.project.kurzbeschreibung.minLength &&
                $v.project.kurzbeschreibung.$dirty
              "
              class="text-danger"
              >Die Beschreibung sollte mindestens 4 Zeichen lang sein.</span
            >
          </div>
        </td>
      </tr>
    </table>
    <div class="buttons">
      <b-button size="sm" @click="submitForm">Hinzufügen</b-button>
      <b-button size="sm" @click="clearForm">Absagen</b-button>
    </div>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  components: {},
  data() {
    return {
      selectedLecturer: "",
      project: {
        kurzbeschreibung: "",
        betreuenderDozent: [],
        externeMitwirkende: [],
        schlagworter: [],
        uuid: "",
        title: "",
      },
    };
  },

  props: {
    title: String,
  },
  validations: {
    project: {
      title: {
        required,
        minLength: minLength(4),
      },
      betreuenderDozent: {
        required,
      },
      kurzbeschreibung: {
        required,
        minLength: minLength(4),
      },
    },
  },
  methods: {
    addLecturer(betreuenderDozent) {
      if (betreuenderDozent != "") {
        this.project.betreuenderDozent.push(betreuenderDozent);
      } else {
        alert("Bitte wähle einen Dozenten aus");
      }
    },

    deleteLecturer(index) {
      this.project.betreuenderDozent.splice(index, 1);
    },

    submitForm(evt) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.addNewProject();
      } else {
        evt.preventDefault();
      }
    },
    addNewProject() {
      var keywords = "";
      if (this.project.schlagworter.length > 0) {
        keywords = Object.assign({}, this.project.schlagworter);
      }

      let dozent_filtered = this.project.betreuenderDozent
        .map((item) => item.uuid)
        .filter(
          (value, index, self) =>
            self.indexOf(value) === index && value != undefined
        );
      let dataArray = [];
      for (const dozent of dozent_filtered) {
        dataArray.push({ type: "user--user", id: dozent });
      }
      const dozenten = Object.assign({}, dataArray);
      var addProj = {
        title: this.project.title,
        kurzbeschreibung: this.project.kurzbeschreibung,
        betreuenderDozent: dozenten,
        externeMitwirkende: this.project.externeMitwirkende,
        schlagworter: keywords,
        gruppenadmin: this.$store.state.sparky_api.drupalUserID,
      };
      console.log(addProj);
      this.$store.dispatch("project/createProject", addProj).then(() => {
        this.clearForm();
      });
    },
    clearForm() {
      this.project.title = "";
      this.project.kurzbeschreibung = "";
      this.project.betreuenderDozent = [];
      this.project.externeMitwirkende = "";
      this.project.schlagworter = "";
    },
  },

  computed: {
    getLecturers() {
      return this.$store.getters["user/getLecturers"];
    },
    getStudents() {
      return this.$store.getters["user/getStudents"];
    },
  },
};
</script>
<style scoped>
.add-lecturer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid gray;
  width: 100%;
  padding: 0.3rem 0.1rem;
  min-height: 6rem;
}
.add-lecturer select {
  width: 100% !important;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.projektAnlegen {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
