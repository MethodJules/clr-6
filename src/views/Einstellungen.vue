<template>
  <div class="page-container">
    <b-row
      class="table-container table table-striped"
      v-if="getUserRole != 'lecturer'"
    >
      <transition name="fade" mode="out-in">
        <div v-if="testButClicked" class="alert" role="alert">
          Erfolgreich gespeichert!
        </div>
      </transition>
      <table class="table table-borderless table-sm table-hover">
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
          <thead>
            <tr>
              <th class="table-header">Profildaten:</th>
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
                v-model="getProfileData.anzahlLiteraturreviews"
                v-on:input="$v.getProfileData.anzahlLiteraturreviews.$touch"
                v-bind:class="{
                  error: $v.getProfileData.anzahlLiteraturreviews.$error,
                  valid:
                    $v.getProfileData.anzahlLiteraturreviews.$dirty &&
                    !$v.getProfileData.anzahlLiteraturreviews.$invalid,
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
                v-model="getProfileData.showEmail"
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
                v-b-tooltip.hover
                title="Klicken Sie bitte hier drauf, um ein Bild hochzuladen!"
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
            </td>
          </tr>
        </tbody>
      </table>
      <b-row>
        <b-row class="buttons">
          <b-button @click="updateProfile()">Änderungen speichern</b-button>
          <b-button @click="cancelUpdate()">Änderungen verwerfen</b-button>
        </b-row>
      </b-row>
    </b-row>

    <b-row
      class="table-container table table-striped"
      v-if="getUserRole == 'lecturer'"
    >
      <transition name="fade" mode="out-in">
        <div v-if="testButClicked" class="alert" role="alert">
          Erfolgreich gespeichert!
        </div>
      </transition>
      <table class="table table-borderless table-sm table-hover">
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
            <th scope="row">E-Mail</th>
            <td>{{ getUser.mail }}</td>
          </tr>
          <thead>
            <tr>
              <th>Profildaten:</th>
            </tr>
          </thead>

          <tr>
            <th scope="row">Abteilung</th>
            <td>
              <b-form-input
                v-model="getProfileData.abteilung"
                v-on:input="$v.getProfileData.abteilung.$touch"
                v-bind:class="{
                  error: $v.getProfileData.abteilung.$error,
                  valid:
                    $v.getProfileData.abteilung.$dirty &&
                    !$v.getProfileData.abteilung.$invalid,
                }"
                id="input-6"
              >
              </b-form-input>
            </td>
          </tr>
          <tr>
            <th scope="row">Telefonnummer</th>
            <td>
              <b-form-input
                v-model="getProfileData.telefonnummer"
                v-on:input="$v.getProfileData.telefonnummer.$touch"
                v-bind:class="{
                  error: $v.getProfileData.telefonnummer.$error,
                  valid:
                    $v.getProfileData.telefonnummer.$dirty &&
                    !$v.getProfileData.telefonnummer.$invalid,
                }"
                id="input-7"
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
                v-model="getProfileData.showEmail"
              >
              </b-form-checkbox>
            </td>
          </tr>
          <tr>
            <th scope="row">Telefon-Nr. im Profil anzeigen?</th>
            <td>
              <b-form-checkbox
                name="checkbox-phone"
                @input="updatePhoneNumberCheckbox()"
                v-model="getProfileData.showPhoneNumber"
              >
              </b-form-checkbox>
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
            </td>
          </tr>
        </tbody>
      </table>
      <b-row>
        <b-row class="buttons">
          <b-button @click="updateProfile()">Änderungen speichern</b-button>
          <b-button @click="cancelUpdate()">Änderungen verwerfen</b-button>
        </b-row>
      </b-row>
    </b-row>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import { required, minLength, integer } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      testButClicked: false,
      image: null,
      profilbild: null,
    };
  },

  validations: {
    getProfileData: {
      studiengang: { minLength: minLength(1) },
      anzahlLiteraturreviews: { integer, minLength: minLength(1) },
      datenbanken: { minLength: minLength(1) },
      referenztool: { minLength: minLength(1) },
      analysetool: { minLength: minLength(1) },
      abteilung: { minLength: minLength(1) },
      telefonnummer: { minLength: minLength(1) },
    },
  },

  components: {
    PictureInput,
  },
  computed: {
    ...mapGetters({
      getUserRole: "drupal_api/getUserRole",
      userUID: "drupal_api/getCurrentUserInternalUID",
    }),
    getUser() {
      return this.$store.state.profile.userData;
    },

    getProfileData() {
      return this.$store.state.profile.profileData;
    },
  },

  methods: {
    onFileChanged(image) {
      if (image) {
        this.image = image;
      }
    },

    updateEmailCheckbox() {
      this.$store.dispatch("profile/updateEmailCheckbox", this.getProfileData);
    },

    updatePhoneNumberCheckbox() {
      this.$store.dispatch("profile/updatePhoneCheckbox", this.getProfileData);
    },
    /** In this method, we update the existing profile to the backend */

    updateProfile() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        var ausgabe = {
          title: this.getProfileData.title,
          studiengang: this.getProfileData.studiengang,
          anzahlLiteraturreviews: this.getProfileData.anzahlLiteraturreviews,
          datenbanken: this.getProfileData.datenbanken,
          referenztool: this.getProfileData.referenztool,
          analysetool: this.getProfileData.analysetool,
          abteilung: this.getProfileData.abteilung,
          telefonnummer: this.getProfileData.telefonnummer,
          uuid: this.getProfileData.uuid,
        };

        this.testButClicked = true;
        // console.log(this.getProfileData.uuid);
        this.$store.dispatch("profile/updateProfile", ausgabe);

        if (this.image != null) {
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
      this.$store.dispatch("profile/loadProfileFromBackend", this.userUID);
    },
  },
  watch: {
    testButClicked(val) {
      if (val) {
        setTimeout(() => (this.testButClicked = false), 1000);
      }
    },
  },
};
</script>
<style scoped>
.table-header {
  background-color: #f5f8fe;
}
table thead {
  font-size: 1.5rem;
}
.page-container {
  display: flex;
  justify-content: center;
}
.table-container {
  width: 80% !important;
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

