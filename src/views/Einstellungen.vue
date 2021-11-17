<template>
  <b-row>
    <transition name="fade" mode="out-in">
      <div v-if="testButClicked" class="alert" role="alert">
        Erfolgreich Gespeichert !
      </div>
    </transition>
    <table class="table table-borderless table-sm table-hover">
      <!-- In this part [line 14-23] we load all the user data of testacc (name, matrikelnummer and email from the backend ) -->
      <thead>
        <tr>
          <th>Persönliche Daten:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Name</th>
          <td>{{ getUser.fullname }}</td>
        </tr>
        <tr>
          <th scope="row">Matrikelnummer</th>
          <td>{{ getUser.matrikelnummer }}</td>
        </tr>
        <tr>
          <th scope="row">E-Mail</th>
          <td>{{ getUser.mail }}</td>
        </tr>

        <!-- In this part [line 32-158] we load all the profile data from the backend by filtering the drupaluserID 
            to have the right profile of the user who creates that profile  ) -->
        <thead>
          <tr>
            <th>Profildaten:</th>
          </tr>
        </thead>

        <tr>
          <th scope="row">Studiengang</th>
          <td>
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
          </td>
        </tr>
        <tr>
          <th scope="row">Durchgeführte Literaturreviews</th>
          <td>
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
          </td>
        </tr>
        <tr>
          <th scope="row">E-Mail im Profil anzeigen?</th>
          <td>
            <b-form-checkbox
              name="checkbox-email"
              @input="updateEmailCheckbox()"
              v-model="getProfileData.show_email"
            >
            </b-form-checkbox>
          </td>
        </tr>
        <tr>
          <th scope="row">Ich kenne mich in den folgenden... aus:</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Datenbanken & Suchmaschinen</th>
          <td>
            <span>z.B. AISeL, IEEE, Google Scholar, Web of Science, ...</span>
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
          </td>
        </tr>
        <tr>
          <th scope="row">Referenzmanagement-Tools</th>
          <td>
            <span> z.B. Citavi, Mendeley, Endnote, ... </span>
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
          </td>
        </tr>
        <tr>
          <th scope="row">Analysetools</th>
          <td>
            <span> z.B. Excel, MAXQDA, NVivo, R, ... </span>
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
          </td>
        </tr>
        <tr>
          <th scope="row">Profilbild</th>
          <td class="profilbild-content">
            <picture-input
              v-model="profilbild"
              @change="onFileChanged"
              ref="pictureInput"
              width="100"
              height="100"
              accept="image/jpeg,image/png"
              buttonClass="btn btn-test"
              :hideChangeButton="true"
              :customStrings="{
                upload: '<h1>Bild ändern</h1>',
                drag: 'Bild hochladen',
              }"
            >
            </picture-input>
            <!-- <b-button class="upload-button" size="sm" @click="onUpload"
              >Upload!</b-button  >-->
          </td>
        </tr>
      </tbody>
    </table>
    <b-row>
      <b-row class="buttons">
        <!-- <input type="file" @change="onFileChanged" accept="image/jpeg,image/png"> -->
        <b-button @click="updateProfile()">Änderungen speichern</b-button>
        <b-button @click="cancelUpdate()">Änderungen verwerfen</b-button>
      </b-row>
    </b-row>
  </b-row>
</template>

<script>
import PictureInput from "vue-picture-input";
import { required, minLength, integer } from "vuelidate/lib/validators";
//import axios from 'axios';

export default {
  data() {
    return {
      testButClicked: false,
      selectedFile: null,
      images: [],
      image: null,
      profilbild: null,
      status: false,

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
      anzahl_literaturreviews: { required, integer, minLength: minLength(1) },
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

    updateEmailCheckbox() {
      console.log(this.getProfileData);
      this.$store.dispatch("profile/updateEmailCheckbox", this.getProfileData);
    },

    /*     onUpload() {
      // upload file
      //  const fd = new FormData();
      //       fd.append = ('image', this.selectedFile, this.selectedFile.name)
      //       axios.post('https://clr-backend.x-navi.de/jsonapi//media/image/field_media_image', fd)
      //           .then(res => {
      //               console.log(res)
      //           }) 
      console.log(this.$refs.pictureInput.file);
      this.$store.dispatch("profile/uploadImage", {
        image: this.image,
        filename: this.$refs.pictureInput.file.name,
      });
    },
 */
    /** In this method, we create an profile with all the profile data to the backend */
    /*    addProfile() {
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
    }, */

    /** In this method, we update the existing profile to the backend */

    updateProfile() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        var ausgabe = {
          title: this.getProfileData.title,
          studiengang: this.getProfileData.studiengang,
          anzahl_literaturreviews: this.getProfileData.anzahl_literaturreviews,
          datenbanken: this.getProfileData.datenbanken,
          referenztool: this.getProfileData.referenztool,
          analysetool: this.getProfileData.analysetool,
          uuid: this.getProfileData.uuid,
        };

        this.testButClicked = true;

        this.$store.dispatch("profile/updateProfile", ausgabe);

        if (this.image != null) {
          console.log("upload");
          this.$store.dispatch("profile/uploadImage", {
            image: this.image,
            filename: this.$refs.pictureInput.file.name,
          });
        }
      } else {
        alert("Bitte alles ausfüllen");
      }
    },

    cancelUpdate() {
      this.$store.dispatch(
        "profile/loadProfileFromBackend",
        this.getCurrentUserInternalUID
      );
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
    this.$store.dispatch(
      "profile/loadProfileFromBackend",
      this.getCurrentUserInternalUID
    ),
      this.$store.dispatch(
        "profile/loadUserFromBackend",
        this.getCurrentUserInternalUID
      );

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

    getCurrentUserInternalUID() {
      // return true
      return this.$store.state.drupal_api.user.uid;
    },
  },
};
</script>
<style scoped>
table thead {
  font-size: 1.5rem;
}
.buttons {
  display: flex;
  justify-content: flex-end;
}
.buttons * {
  margin-left: 1rem;
}
.profilbild-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.profilbild-content * {
  width: 20%;

  margin: 0 0 0.5rem 0;
}
body {
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

