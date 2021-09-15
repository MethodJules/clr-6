<template>
  <b-col class="border border-dark">
    <transition name="fade" mode="out-in">
      <div v-if="testButClicked" class="alert" role="alert">
        Erfolgreich Gespeichert !
      </div>
    </transition>

    <b-container fluid>
      <b-row>
        <b-row>
          <!-- In this part [line 14-23] we load all the user data of testacc (name, matrikelnummer and email from the backend ) -->

          <b-col cols="8"> <h5>Persönliche Daten:</h5> </b-col>
        </b-row>

        <b-row>
          <b-col sm="5">
            <strong> Name: {{ getUser.fullname }}</strong>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="5">
            <strong> Matrikelnummer: {{ getUser.matrikelnummer }} </strong>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="5">
            <strong> E-Mail: {{ getUser.mail }}</strong>
          </b-col>
        </b-row>
        <br />

        <b-row>
          <br />
        </b-row>
        <!-- In this part [line 32-158] we load all the profile data from the backend by filtering the drupaluserID to have the right profile of the user who creates that profile  ) -->

        <b-row>
          <b-col cols="8"> <h5>Profildaten:</h5> </b-col>
        </b-row>

        <b-col sm="5">
          <label for="input-1"> <strong> Studiengang </strong> </label>
        </b-col>

        <b-col sm="10">
          <b-form-input
            v-model="getProfileData.studiengang"
            v-on:input="$v.getProfileData.studiengang.$touch"
            v-bind:class="{
              error: $v.getProfileData.studiengang.$error,
              valid:
                $v.getProfileData.studiengang.$dirty &&
                !$v.getProfileData.studiengang.$invalid,
            }"
            id="input-1"
          >
          </b-form-input>

          <br />
        </b-col>

        <b-col sm="5">
          <label for="input-2">
            <strong> Durchgeführte Literaturreviews </strong>
          </label>
        </b-col>

        <b-col sm="10">
          <b-form-input
            v-model="getProfileData.anzahl_literaturreviews"
            v-on:input="$v.getProfileData.anzahl_literaturreviews.$touch"
            v-bind:class="{
              error: $v.getProfileData.anzahl_literaturreviews.$error,
              valid:
                $v.getProfileData.anzahl_literaturreviews.$dirty &&
                !$v.getProfileData.anzahl_literaturreviews.$invalid,
            }"
            id="input-2"
          >
          </b-form-input>

          <br />
        </b-col>

        <b-row>
          <b-col sm="5">
            <label for="textfeld-3"
              >E-Mail im Profil anzeigen?
              <b-form-checkbox
                id="checkbox-1"
                v-model="status"
                name="checkbox-1"
              >
              </b-form-checkbox>
            </label>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="7">
            <strong>Ich kenne mich in den folgenden... aus:</strong> <br />
          </b-col>
          <br />
        </b-row>

        <b-col sm="10">
          <br />

          <label for="input-3"
            ><strong> Datenbanken & Suchmaschinen </strong>
          </label>
          <b-row> z.B. AISeL, IEEE, Google Scholar, Web of Science, ... </b-row>
        </b-col>

        <b-col sm="10">
          <b-form-input
            v-model="getProfileData.datenbanken"
            v-on:input="$v.getProfileData.datenbanken.$touch"
            v-bind:class="{
              error: $v.getProfileData.datenbanken.$error,
              valid:
                $v.getProfileData.datenbanken.$dirty &&
                !$v.getProfileData.datenbanken.$invalid,
            }"
            id="input-3"
          >
          </b-form-input>

          <br />
        </b-col>

        <b-col sm="5">
          <label for="input-4">
            <strong> Referenzmanagement-Tools </strong>
          </label>
          <b-row> z.B. Citavi, Mendeley, Endnote, ... </b-row>
        </b-col>

        <b-col sm="10">
          <b-form-input
            v-model="getProfileData.referenztool"
            v-on:input="$v.getProfileData.referenztool.$touch"
            v-bind:class="{
              error: $v.getProfileData.referenztool.$error,
              valid:
                $v.getProfileData.referenztool.$dirty &&
                !$v.getProfileData.referenztool.$invalid,
            }"
            id="input-4"
          >
          </b-form-input>

          <br />
        </b-col>

        <b-col sm="7">
          <label for="input-5"> <strong> Analysetools </strong> </label>
          <b-row> z.B. Excel, MAXQDA, NVivo, R, ... </b-row>
        </b-col>

        <b-col sm="10">
          <b-form-input
            v-model="getProfileData.analysetool"
            v-on:input="$v.getProfileData.analysetool.$touch"
            v-bind:class="{
              error: $v.getProfileData.analysetool.$error,
              valid:
                $v.getProfileData.analysetool.$dirty &&
                !$v.getProfileData.analysetool.$invalid,
            }"
            id="input-5"
          >
          </b-form-input>

          <br />
        </b-col>

        <!-- source: https://www.npmjs.com/package/vue-picture-input
                        From this site, we have this method how to upload or drag an image in the frontend by using vue-picture-input -->

        <b-col sm="7">
          <label for="bild"> <strong> Profilbild </strong> </label>

          <div>
            <picture-input
              v-model="profilbild"
              @change="onFileChanged"
              ref="pictureInput"
              width="400"
              height="400"
              margin="16"
              accept="image/jpeg,image/png"
              size="10"
              buttonClass="btn"
              :customStrings="{
                upload: '<h1>Bild ändern</h1>',
                drag: 'Bild hochladen',
              }"
            >
            </picture-input>
            <!-- <input type="file" @change="onFileChanged" accept="image/jpeg,image/png"> -->
            <button @click="onUpload">Upload!</button>
          </div>
        </b-col>

        <div id="app">
          <b-container class="bv-example-row">
            <b-row>
              <b-col lg="4" class="pb-2"
                ><b-button @click="addProfile()">Profil erstellen </b-button>
              </b-col>
              <b-col lg="4" class="pb-2"
                ><b-button @click="updateProfile()"
                  >Änderung Speichern</b-button
                >
              </b-col>
              <!-- TODO: Abbrechen Funktion clear 
                                    <b-col lg="4" class="pb-2"><b-button to="/einstellungen">Abbrechen</b-button> </b-col> -->
            </b-row>
          </b-container>
        </div>
      </b-row>
    </b-container>
  </b-col>
</template>

<script>
import PictureInput from "vue-picture-input";
import { required, minLength } from "vuelidate/lib/validators";
//import axios from 'axios';

export default {
  data() {
    return {
      testButClicked: false,
      //images: [],
      image: null,

      /* getProfileData: {

                studiengang: '',
                anzahl_literaturreviews: '',
                datenbanken: '',
                referenztool: '',
                analysetool: '',
                profilbild: this.getProfileData.profilbild   

            }
            
            */
    };
  },

  validations: {
    getProfileData: {
      studiengang: { required, minLength: minLength(1) },
      anzahl_literaturreviews: { required, minLength: minLength(1) },
      datenbanken: { required, minLength: minLength(1) },
      referenztool: { required, minLength: minLength(1) },
      analysetool: { required, minLength: minLength(1) },
    },
  },

  components: {
    PictureInput,
  },

  methods: {
    onFileChanged(image) {
      //this.selectedFile = image.target.files[0]

      if (image) {
        console.log(image);
        this.image = image;
      }
    },

    onUpload() {
      this.$store.dispatch("profile/uploadImage", this.image);
    },

    /** In this method, we create an profile with all the profile data to the backend */
    addProfile() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        var ausgabe = {
          studiengang: this.getProfileData.studiengang,
          anzahl_literaturreviews: this.getProfileData.anzahl_literaturreviews,
          datenbanken: this.getProfileData.datenbanken,
          referenztool: this.getProfileData.referenztool,
          analysetool: this.getProfileData.analysetool,
          profilbild: this.profilbild,
        };

        this.testButClicked = true;

        this.$store.dispatch("profile/createProfile", ausgabe),
          this.$store.dispatch("profile/uploadImage", ausgabe);
      }
    },

    /** In this method, we update the existing profile to the backend */

    updateProfile() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        var ausgabe = {
          studiengang: this.getProfileData.studiengang,
          anzahl_literaturreviews: this.getProfileData.anzahl_literaturreviews,
          datenbanken: this.getProfileData.datenbanken,
          referenztool: this.getProfileData.referenztool,
          analysetool: this.getProfileData.analysetool,
          profilbild: this.profilbild,
          idd: this.getProfileData.idd,
        };

        this.testButClicked = true;

        this.$store.dispatch("profile/updateProfile", ausgabe),
          this.$store.dispatch("profile/uploadImage", ausgabe);
      } else {
        alert("Bitte alles ausfüllen");
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

  /** load the profile data and the user data from backend */
  mounted() {
    this.$store.dispatch("profile/loadProfileFromBackend"),
      this.$store.dispatch("profile/loadUserFromBackend");

    console.log(this.$store.state.profile.profileData);
    this.profileData = this.$store.state.profile.profileData;
    this.userData = this.$store.state.profile.userData;
  },

  /* With the getters, we can show the loading data from the backend, that it can be visible in the frontend for the users */

  computed: {
    getUser() {
      return this.$store.state.profile.userData;
    },

    getProfileData() {
      return this.$store.state.profile.profileData;
    },
  },
};
</script>
<style scoped>
body {
  padding: 20px;
  font-family: Helvetica;
}

#app {
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
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

input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
}

.error {
  border-color: red;
  background: #fdd;
}

.error:focus {
  outline-color: #f99;
}

.valid {
  border-color: #5a5;
  background: #efe;
}

.valid:focus {
  outline-color: #8e8;
}
</style>

