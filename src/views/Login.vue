<template>
  <div class="container">
    <b-card class="container-form">
      <b-form-group>
        <b-tabs>
          <!-- Class name is automatically "tabs" -->
          <!-- Tab 1 -->
          <b-tab title="Login">
            <div class="login-header">
              <h5>Melde dich hier mit deinem Uni-Account an</h5>
              <p>
                Wenn du dich noch nicht registriert hast, bitte registriere dich
                mit deinem Uni-Account
              </p>
            </div>
            <table>
              <tr>
                <td>
                  <label for="zugangsKennung">Zugangskennung</label>
                </td>
                <td>
                  <b-form-input
                    v-model="zugangsKennung"
                    v-on:input="$v.zugangsKennung.$touch"
                    v-bind:class="{
                      error: $v.zugangsKennung.$error,
                      valid:
                        $v.zugangsKennung.$dirty && !$v.zugangsKennung.$invalid,
                    }"
                    id="zugangsKennung"
                    placeholder=""
                  >
                  </b-form-input>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="password">Passwort</label>
                </td>
                <td>
                  <b-form-input
                    v-model="passwort"
                    v-on:input="$v.passwort.$touch"
                    v-bind:class="{
                      error: $v.passwort.$error,
                      valid: $v.passwort.$dirty && !$v.passwort.$invalid,
                    }"
                    type="password"
                    id="password"
                    placeholder=""
                  >
                  </b-form-input>
                </td>
              </tr>
            </table>

            <b-button @click="login()">Login</b-button>
          </b-tab>
          <b-tab title="Registrierung">
            <div class="registrierung-header">
              <h5>Registriere dich hier mit deinem Uni-Account</h5>
              <p>
                Falls du Hilfe benötigst, wende dich an mail@uni-hildesheim.de
              </p>
            </div>
            <table>
              <tr>
                <td>
                  <label for="zugangsKennung">Zugangskennung</label>
                </td>
                <td>
                  <b-form-input
                    v-model="registrierungsKennung"
                    v-on:input="$v.registrierungsKennung.$touch"
                    v-bind:class="{
                      error: $v.registrierungsKennung.$error,
                      valid:
                        $v.registrierungsKennung.$dirty &&
                        !$v.registrierungsKennung.$invalid,
                    }"
                    id="zugangskennung2"
                    type="text"
                    placeholder=""
                  >
                  </b-form-input>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="password">Passwort</label>
                </td>
                <td>
                  <b-form-input
                    v-model="registrierungsPasswort"
                    v-on:input="$v.registrierungsPasswort.$touch"
                    v-bind:class="{
                      error: $v.registrierungsPasswort.$error,
                      valid:
                        $v.registrierungsPasswort.$dirty &&
                        !$v.registrierungsPasswort.$invalid,
                    }"
                    type="password"
                    id="password2"
                    placeholder=""
                  >
                  </b-form-input>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="Matrikelnummer" class="mr-1 mt-1"
                    >Matrikelnummer</label
                  >
                </td>
                <td>
                  <b-form-input
                    v-model="matrikelnummer"
                    v-on:input="$v.matrikelnummer.$touch"
                    v-bind:class="{
                      error: $v.matrikelnummer.$error,
                      valid:
                        $v.matrikelnummer.$dirty && !$v.matrikelnummer.$invalid,
                    }"
                    id="matrikelnummer"
                    placeholder=""
                  >
                  </b-form-input>
                </td>
              </tr>
            </table>
            <b-button @click="registrieren()">Registrieren</b-button>
          </b-tab>
        </b-tabs>
      </b-form-group>
    </b-card>
  </div>
</template>
<script>
import {
  requiredIf,
  minLength,
  integer,
  alpha,
  minValue,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      zugangsKennung: "",
      passwort: "",
      registrierungsKennung: "",
      registrierungsPasswort: "",
      matrikelnummer: "",
    };
  },
  /* 
  validations for log in input fields
  input is only valid, when either log in data or registration data is complete
  requiredIF takes the boolean returned by a function to determine if this field is required. true means it is required
   */
  validations: {
    zugangsKennung: {
      required: requiredIf(function () {
        return this.validate_login(this.passwort);
      }),
      minLength: minLength(1),
      alpha,
    },
    passwort: {
      required: requiredIf(function () {
        return this.validate_login(this.zugangsKennung);
      }),
      minLength: minLength(1),
    },
    registrierungsKennung: {
      required: requiredIf(function () {
        return this.validate_login(this.registrierungsPasswort);
      }),
      minLength: minLength(1),
      alpha,
    },
    registrierungsPasswort: {
      required: requiredIf(function () {
        return this.validate_login(this.registrierungsKennung);
      }),
      minLength: minLength(1),
    },
    matrikelnummer: {
      integer,
      minLength: minLength(1),
      minValue: minValue(0),
      maxLength: maxLength(10),
    },
  },
  computed: {
    account() {
      return this.$store.state.sparky_api.account;
    },

    validCredential() {
      return true;
      // return this.$store.state.sparky_api.validCredential;
      // When we login, it breaks the z-circle at the main page.
      // Zircle is hidden when we double click outside of the zcircle

      // return this.$store.state.drupal_api.validCredential;
    },
  },
  methods: {
    /* function validates log in and registration input
    returns true, when the associated input field (dependent_field) is not empty or all fields are empty
    e.g. if passwort is not empty, zugansKennung is also required*/
    validate_login(dependent_field) {
      let ausgabe = dependent_field != "";
      if (
        (this.passwort == "") &
        (this.zugangsKennung == "") &
        (this.registrierungsKennung == "") &
        (this.registrierungsPasswort == "")
      ) {
        ausgabe = true;
      }
      return ausgabe;
    },
    /* registrates a user first at sparky backend and then uses the data from sparky backend to register/create a new user at clr drupal backend
     * students have to put in their matrikelnummer, lecturers don't
     * functions called in sequence: sparky_api/registrate -> sparky_api/getWhoamI -> drupal_api/getSessionToken -> drupal_api/createUser
     */
    registrieren() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$store.dispatch("sparky_api/registrate", {
          username: this.registrierungsKennung,
          password: this.registrierungsPasswort,
          matrikelnummer: this.matrikelnummer,
        });
        this.registrierungsKennung = "";
        this.registrierungsPasswort = "";
        this.matrikelnummer = "";
      } else {
        alert("Bitte Registriedungsdaten eingeben");
      }
      //remove so username and password arent saved after login

      /*       this.$store.dispatch('drupal_api/getSessionToken', {
        username: this.registrierungsKennung,
        password: this.registrierungsPasswort,
        generatedPassword: this.generatePassword(this.registrierungsKennung)
      })  */
    },

    generatePassword(username) {
      const crypto = require("crypto");
      const md5sum = crypto.createHash("md5");
      let str = username;
      const res = md5sum.update(str).digest("hex");
      console.log(res);
      return res;
    },

    /* logs a user in at drupal backend
     * then saves the basic Authentication token in the state
     * login only works if validation is true
     * a log in message is displayed when user is logged in
     */
    login() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        let username = this.zugangsKennung;
        let password = this.passwort;
        let authorization_token = this.encodeBasicAuth(username, password);
        this.$store
          .dispatch("drupal_api/loginToDrupal", {
            username,
            password,
          })
          .then(() => {
            this.$router.push("/");
          });
        this.$store.dispatch("drupal_api/saveBasicAuth", authorization_token);

        this.makeToast();
        //remove so username and password arent saved after login
        this.zugangsKennung = "";
        this.passwort = "";
        //this.testButClicked(true);
      } else {
        alert("Bitte Logindaten eingeben");
      }
      return authorization_token;
    },
    /* creates the basic authentication token */
    encodeBasicAuth(user, password) {
      var creds = user + ":" + password;
      var base64 = btoa(creds);
      return "Basic " + base64;
    },
    // welcome message with toast
    makeToast() {
      this.$bvToast.toast(
        // removed because of new routing this is not available at login at this point of time `Willkommen zu dem kollaborativen Literaturreview Tool ${this.$store.state.drupal_api.user.name}`,
        `Willkommen zu dem kollaborativen Literaturreview Tool`,
        {
          title: "Willkommen",
          autoHideDelay: 4000,
          variant: "info",
        }
      );
    },

    encodeBasicAuth(user, password) {
      var creds = user + ":" + password;
      var base64 = btoa(creds);
      return "Basic " + base64;
    },
  },
  // mounted() {
  //     this.$store.dispatch("drupal_api/loadTokensfromSessionStorage");
  // },
};
</script>
<style scoped>
.container {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(5, 1fr);
}

.container-form {
  grid-row: 2 / 3;
  grid-column: 2 / 5;
}
.login-header,
.registrierung-header {
  margin-top: 20px;
}
/*css for form validation*/
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

.alert {
  background-color: lightgreen;
  padding: 15px;
}
</style>
