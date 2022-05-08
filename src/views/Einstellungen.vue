<template>
  <div class="page-container">
    <b-row
      class="table-container table table-striped"
      v-if="user.role != 'lecturer'"
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
            <td>{{ userData.fullname }}</td>
          </tr>
          <tr>
            <th scope="row">Matrikelnummer</th>
            <td>{{ userData.matrikelnummer }}</td>
          </tr>
          <tr>
            <th scope="row">E-Mail</th>
            <td>{{ userData.mail }}</td>
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
                v-model="memberProfile.studiengang"
                v-on:input="$v.profile.studiengang.$touch"
                v-bind:class="{
                  error: $v.profile.studiengang.$error,
                  valid:
                    $v.profile.studiengang.$dirty &&
                    !$v.profile.studiengang.$invalid,
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
                v-model="memberProfile.anzahlLiteraturreviews"
                v-on:input="$v.profile.anzahlLiteraturreviews.$touch"
                v-bind:class="{
                  error: $v.profile.anzahlLiteraturreviews.$error,
                  valid:
                    $v.profile.anzahlLiteraturreviews.$dirty &&
                    !$v.profile.anzahlLiteraturreviews.$invalid,
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
                v-model="memberProfile.showEmail"
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
                v-model="memberProfile.datenbanken"
                v-on:input="$v.profile.datenbanken.$touch"
                v-bind:class="{
                  error: $v.profile.datenbanken.$error,
                  valid:
                    $v.profile.datenbanken.$dirty &&
                    !$v.profile.datenbanken.$invalid,
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
                v-model="memberProfile.referenztool"
                v-on:input="$v.profile.referenztool.$touch"
                v-bind:class="{
                  error: $v.profile.referenztool.$error,
                  valid:
                    $v.profile.referenztool.$dirty &&
                    !$v.profile.referenztool.$invalid,
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
                v-model="memberProfile.analysetool"
                v-on:input="$v.profile.analysetool.$touch"
                v-bind:class="{
                  error: $v.profile.analysetool.$error,
                  valid:
                    $v.profile.analysetool.$dirty &&
                    !$v.profile.analysetool.$invalid,
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
      v-if="user.role == 'lecturer'"
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
            <td>{{ userData.fullname }}</td>
          </tr>
          <tr>
            <th scope="row">E-Mail</th>
            <td>{{ userData.mail }}</td>
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
                v-model="memberProfile.abteilung"
                v-on:input="$v.profile.abteilung.$touch"
                v-bind:class="{
                  error: $v.profile.abteilung.$error,
                  valid:
                    $v.profile.abteilung.$dirty &&
                    !$v.profile.abteilung.$invalid,
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
                v-model="memberProfile.telefonnummer"
                v-on:input="$v.profile.telefonnummer.$touch"
                v-bind:class="{
                  error: $v.profile.telefonnummer.$error,
                  valid:
                    $v.profile.telefonnummer.$dirty &&
                    !$v.profile.telefonnummer.$invalid,
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
                v-model="memberProfile.showEmail"
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
                v-model="memberProfile.showPhoneNumber"
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      testButClicked: false,
      image: null,
      profilbild: null,
    };
  },

  validations: {
    profile: {
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
    ...mapState("drupal_api", ["user"]),
    ...mapState("memberProfiles", ["memberProfile"]),
    ...mapState("profile", ["userData"]),
  },

  methods: {
    onFileChanged(image) {
      if (image) {
        this.image = image;
      }
    },

    updateEmailCheckbox() {
      this.$store.dispatch("profile/updateEmailCheckbox", this.memberProfile);
    },

    updatePhoneNumberCheckbox() {
      this.$store.dispatch("profile/updatePhoneCheckbox", this.memberProfile);
    },
    /** In this method, we update the existing profile to the backend */

    updateProfile() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        var ausgabe = {
          title: this.memberProfile.title,
          studiengang: this.memberProfile.studiengang,
          anzahlLiteraturreviews: this.memberProfile.anzahlLiteraturreviews,
          datenbanken: this.memberProfile.datenbanken,
          referenztool: this.memberProfile.referenztool,
          analysetool: this.memberProfile.analysetool,
          abteilung: this.memberProfile.abteilung,
          telefonnummer: this.memberProfile.telefonnummer,
          uuid: this.memberProfile.uuid,
        };

        this.testButClicked = true;
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
      this.$store.dispatch("profile/loadProfileFromBackend", this.user.uid);
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
    const user = JSON.parse(sessionStorage.getItem("current_user"));
    const drupalUserUID = user.uid;
    this.$store.dispatch("memberProfiles/loadMemberProfile", drupalUserUID);
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

