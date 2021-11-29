<template>
  <div class="projektAnlegen">
    <div>
      <b-modal
        ref="create_project"
        title="Projekt anlegen"
        @ok="submitForm"
        cancel-title="Abbrechen"
      >
        <form @submit.prevent="submitForm">
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
                    v-if="
                      !$v.project.title.minLength && $v.project.title.$dirty
                    "
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
                  <div
                    class="add-lecturer"
                    v-for="(betreuenderDozent, i) in project.betreuenderDozent"
                    :key="i"
                  >
                    <b-form-input
                      disabled
                      v-model="project.betreuenderDozent[i].name"
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

                  <b-button size="sm" @click="addLecturer(selectedLecturer)"
                    >Dozenten hinzufügen</b-button
                  >
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
                <label for="externeMitwirkende"
                  >Externe Partner*innen (bitte mit Komma trennen)
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-group">
                  <input
                    id="title"
                    v-model="project.externeMitwirkende"
                    type="text"
                    placeholder="externe Mitwirkende eingeben"
                    class="form-control"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label for="schlagworter"
                  >Schlagwörter (bitte mit Komma trennen)
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-group">
                  <input
                    v-model="project.schlagworter"
                    type="text"
                    placeholder="hier eingeben"
                    class="form-control"
                  />
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
                    >Die Beschreibung sollte mindestens 4 Zeichen lang
                    sein.</span
                  >
                </div>
              </td>
            </tr>
          </table>
        </form>
      </b-modal>
      <div>
        <!--         <b-button @click="showThisModal()" size="lg" v-b-modal.create_project>{{getLecturers}}</b-button> -->
        <b-button @click="showThisModal()" size="lg" v-b-modal.create_project
          >+</b-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength /* alpha */ } from "vuelidate/lib/validators";
export default {
  components: {},
  data() {
    return {
      selectedLecturer: "",
    };
  },

  props: {
    title: String,
    project: Object,
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
    showThisModal() {
      this.$refs["create_project"].show();
    },

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
        this.newProject();
      } else {
        //prevents form from closing, when inputs are invalid
        evt.preventDefault();
      }
    },
    newProject() {
      var keywords = "";
      //when keywords are not required, it is possible the user creating a problem does not set a single keyword. following operations would lead to an error, therefore we check if schlagworter.length>0
      if (this.project.schlagworter.length > 0) {
        //split keyword string into array. seperated by comma
        var schlagwortarray = this.project.schlagworter.split(",");
        //trims whitespace
        for (var i = 0; i < schlagwortarray.length; ++i) {
          schlagwortarray[i] = schlagwortarray[i].trim();
        }
        //removes duplicates and empty keywords
        let keywords_filtered = schlagwortarray.filter((item, index) => {
          return schlagwortarray.indexOf(item) === index && item != "";
        });
        keywords = Object.assign({}, keywords_filtered);
      }

      //filter duplicates (indexof) and empty entries (item != "") from array before making an dozent object array

      /*filter duplicate objects out, by using map to get userid from lecturers and then filtering by it, by looking if indexOf this value (userid) is already in the array. 
        If indexof and index are not the same, this means the userid and respectively the object were already found before in the array, are therefore duplicates and will be removed.
        the end result is an array of the ID attribute only
        Solution from: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript*/

      let dozent_filtered = this.project.betreuenderDozent
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

      var addProj = {
        title: this.project.title,
        kurzbeschreibung: this.project.kurzbeschreibung,
        betreuenderDozent: dozenten,
        externeMitwirkende: this.project.externeMitwirkende,
        schlagworter: keywords,
        gruppenadmin: this.$store.state.sparky_api.drupalUserID,
      };
      this.$store.dispatch("project/createProject", addProj).then(() => {
        this.$refs["create_project"].hide();
        this.project.title = " ";
        this.project.kurzbeschreibung = "";
        this.project.betreuenderDozent = [];
        this.project.externeMitwirkende = " ";
        this.project.schlagworter = " ";
      });
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
  mounted() {},
};
</script>
<style scoped>
.add-lecturer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
