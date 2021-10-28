<template>
  <div class="projektAnlegen">
    <div>
      <b-modal ref="create_project" title="Projekt anlegen">
        <form @submit.prevent="submitForm">
          <table>
            <tr>
              <td>
                <label for="title">Projekttitel: </label>
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
                    >Title is required!</span
                  >
                  <span
                    v-if="
                      !$v.project.title.minLength && $v.project.title.$dirty
                    "
                    class="text-danger"
                    >Title should be at least 4 letters long</span
                  >
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label for="betreuenderDozent"
                  >Betreuer: mehrere eingeben möglich</label
                >
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <div
                    v-for="(betreuenderDozent, i) in project.betreuenderDozent"
                    :key="i"
                  >
                    <select
                      v-model="project.betreuenderDozent[i]"
                      class="form-control"
                    >
                      <option
                        v-for="lecturer in getLecturers"
                        v-bind:value="lecturer.uuid"
                        v-bind:key="lecturer.uuid"
                      >
                        {{ lecturer.name }}
                      </option>
                    </select>

                    <b-button variant="link" @click="deleteLecturer(i)"
                      ><b-icon icon="x-circle"></b-icon
                    ></b-button>
                  </div>
                  <b-button @click="addLecturer('')"
                    >Weiteren Dozenten hinzufügen</b-button
                  >
                  <!--  <span>Selected: {{ project.betreuenderDozent }}</span> -->

                  <!-- <select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span> -->

                  <span
                    v-if="
                      !$v.project.betreuenderDozent.required &&
                      $v.project.betreuenderDozent.$dirty
                    "
                    class="text-danger"
                    >Dozent is required!</span
                  >
                  <!--                   <span
                    v-if="
                      !$v.project.betreuenderDozent.alpha &&
                      $v.project.betreuenderDozent.$dirty
                    "
                    class="text-danger"
                    >A name is only allowed to use letters</span
                  > -->
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label for="externeMitwirkende"
                  >Externe Partner*innen(bitte mit Komma trennen)
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
                  >Schlagwörter(bitte mit Komma trennen)
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
                <label for="kurzbeschreibung">Projektbeschreibung: </label>
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
                    >Kurzbeschreibung is required!</span
                  >
                  <span
                    v-if="
                      !$v.project.kurzbeschreibung.minLength &&
                      $v.project.kurzbeschreibung.$dirty
                    "
                    class="text-danger"
                    >A Kurzbeschreibung must be at least 4 letters long</span
                  >
                </div>
              </td>
            </tr>
          </table>
          <div>
            <b-button @click="submitForm()">Projekt anlegen</b-button>
            <!-- <b-button @click="newProject()">Projekt anlegen</b-button> -->
          </div>
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
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css";
export default {
  components: {
    VueSimpleSuggest,
  },
  data() {
    return {
      lecturer_array: [this.project.betreuenderDozent],
      chosen: "",
      autoCompleteStyle: {
        vueSimpleSuggest: "position-relative",
        inputWrapper: "",
        defaultInput: "form-control",
        suggestions: "position-absolute list-group z-1000",
        suggestItem: "list-group-item",
      },
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
      this.project.betreuenderDozent.push(betreuenderDozent);
    },

    deleteLecturer(index) {
      this.project.betreuenderDozent.splice(index, 1);
    },

    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.newProject();
      }
    },
    newProject() {
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
      var keywords = Object.assign({}, keywords_filtered);

      //filter duplicates (indexof) and empty entries (item != "") from array before making an dozent object array
      let dozent_filtered = this.project.betreuenderDozent.filter(
        (item, index) => {
          return (
            this.project.betreuenderDozent.indexOf(item) === index && item != ""
          );
        }
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

      this.$store.dispatch("project/createProject", addProj);
      //this.projectList.push(addProj)
      this.$refs["create_project"].hide();
      this.project.title = " ";
      this.project.kurzbeschreibung = "";
      this.project.betreuenderDozent = [];
      this.project.externeMitwirkende = " ";
      this.project.schlagworter = " ";
      //this.projectList.length + 1
    },
  },

  computed: {
    simpleSuggestionListLecturers() {
      return this.$store.state.sparky_api.lecturers;
    },

    simpleSuggestionListLecturers2() {
      // console.log(this.$store.state.user.lecturers);
      return this.$store.state.user.lecturers;
    },

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
