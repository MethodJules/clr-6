<template>
  <div id="app">
    <div v-if="validCredential != true">
      <transition name="fade" mode="out-in">
        <div v-if="testButClicked" class="alert" role="alert">
          Erfolgreich Gespeichert !
        </div>
      </transition>
      <div class="mx-auto" style="width: 50rem">
        <b-container>
          <b-row align-v="center">
            <b-col>
              <b-card class="login">
                <b-form-group>
                  <b-tabs>
                    <!-- Tab 1 -->
                    <b-tab title="Login">
                      <h5>Melde dich hier mit deinem Uni-Account an</h5>
                      <p>
                        Wenn du dich noch nicht registriert hast, bitte
                        registriere dich mit deinem Uni-Account
                      </p>
                      <table>
                        <tr>
                          <td>
                            <label for="zugangsKennung" class="mr-1"
                              >Zugangskennung</label
                            >
                          </td>
                          <td>
                            <b-form-input
                              v-model="zugangsKennung"
                              v-on:input="$v.zugangsKennung.$touch"
                              v-bind:class="{
                                error: $v.zugangsKennung.$error,
                                valid:
                                  $v.zugangsKennung.$dirty &&
                                  !$v.zugangsKennung.$invalid,
                              }"
                              id="zugangsKennung"
                              placeholder=""
                            >
                            </b-form-input>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label for="password" class="mr-1 mt-1"
                              >Passwort</label
                            >
                          </td>
                          <td>
                            <b-form-input
                              v-model="passwort"
                              v-on:input="$v.passwort.$touch"
                              v-bind:class="{
                                error: $v.passwort.$error,
                                valid:
                                  $v.passwort.$dirty && !$v.passwort.$invalid,
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
                      <!--  TODO: make new variables for registration -->
                      <h5>Registriere dich hier mit deinem Uni-Account</h5>
                      <p>
                        Falls du Hilfe benötigst, wende dich an
                        mail@uni-hildesheim.de
                      </p>
                      <table>
                        <tr>
                          <td>
                            <label for="zugangsKennung" class="mr-1"
                              >Zugangskennung</label
                            >
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
                            <label for="password" class="mr-1 mt-1"
                              >Passwort</label
                            >
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
                              type="password2"
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
                                  $v.matrikelnummer.$dirty &&
                                  !$v.matrikelnummer.$invalid,
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
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <div v-else>
      <b-container fluid class="p-0 m-0">
        <MenueLeiste />

        <b-row class="page-container">
          <b-col class="linkeSeite m-0 p-0" md="2">
            <b-row class="m-0 p-0">
              <b-col class="m-0">
                <TodoList />
              </b-col>
            </b-row>

            <b-row>
              <b-col class="d-flex m-0">
                <Kalender />
              </b-col>
            </b-row>
          </b-col>

          <b-col class="mainContent m-0 p-0">
            <router-view :key="$route.path"></router-view>
          </b-col>
          <!-- Sobald der Nutzer auf die Projektliste geht, blendet er 
        die Komponente SeitenNavigation aus . Siehe https://stackoverflow.com/questions/56681106/vue-hide-view-components-conditionally-based-on-url-->
          <b-col
            v-if="!isChanged"
            class="
              d-flex
              flex-column
              justify-content-between
              p-0
              m-0
              rechtseite
            "
            md="1"
          >
            <b-row>
              <b-col class="m-0">
                <SeitenNavigation />
              </b-col>
            </b-row>
          </b-col>
          <b-col v-else> </b-col>
        </b-row>
        <!-- 
                <b-row class="untereLeiste p-4 d-flex align-center">
                    <h3>Footer oder Impressium vielleicht</h3>
                </b-row> -->
      </b-container>
    </div>
  </div>
</template>

<script>
import SeitenNavigation from "@/components/SeitenNavigation.vue";
import TodoList from "@/components/TodoList.vue";
import MenueLeiste from "@/components/MenueLeiste.vue";
import Kalender from "@/components/Kalender.vue";
import {
  //required,
  minLength,
  integer,
  alpha,
  minValue,
} from "vuelidate/lib/validators";
//import ProjectList from "@/views/ProjectList.vue"

export default {
  props: {
    showRightMenu: Boolean,
  },
  name: "App",
  components: {
    SeitenNavigation,
    //ProjectList,
    TodoList,
    MenueLeiste,
    Kalender,
  },

  data() {
    return {
      zugangsKennung: "",
      passwort: "",
      registrierungsKennung: "",
      registrierungsPasswort: "",
      matrikelnummer: "",
      nameState: null,
      showMenu: true,
      testButClicked: false,
      eintragTodo: {
        todo: "",
      },
    };
  },
  validations: {
    zugangsKennung: { minLength: minLength(1), alpha },
    passwort: { minLength: minLength(1) },
    registrierungsKennung: { minLength: minLength(1), alpha },
    registrierungsPasswort: { minLength: minLength(1) },
    matrikelnummer: { integer, minLength: minLength(1), minValue: minValue(0) },
  },

  methods: {
    registrieren() {
      this.$store.dispatch("sparky_api/registrate", {
        username: this.registrierungsKennung,
        password: this.registrierungsPasswort,
        matrikelnummer: this.matrikelnummer,
      });

      //remove so username and password arent saved after login
      this.registrierungsKennung = "";
      this.registrierungsPasswort = "";
      this.matrikelnummer = "";
      /*       this.$store.dispatch('drupal_api/getSessionToken', {
        username: this.registrierungsKennung,
        password: this.registrierungsPasswort,
        generatedPassword: this.generatePassword(this.registrierungsKennung)
      })  */
    },

    closeMenu() {
      this.showMenu = false;
    },
    /*     generatePassword(username) {
      const crypto = require("crypto");
      const md5sum = crypto.createHash("md5");
      let str = username;
      const res = md5sum.update(str).digest("hex");
      console.log(res);
      return res;
    }, */
    login() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        let username = this.zugangsKennung;
        let password = this.passwort;
        // wenn das hier genutzt wird -> password wird aus namen generiert - die "richtige" anmeldung des nutzers erfolgt beim sparky backend mit rz kennung
        //password=this.generatePassword(username)
        let authorization_token = this.encodeBasicAuth(username, password);
        this.$store.dispatch("drupal_api/loginToDrupal", {
          username,
          password,
        });
        this.$store.dispatch("drupal_api/saveBasicAuth", authorization_token);
        console.log(authorization_token);
        //remove so username and password arent saved after login
        this.makeToast();

        this.zugangsKennung = "";
        this.passwort = "";
        this.testButClicked(true);
      } else {
        alert("Bitte alles ausfüllen");
      }
      return authorization_token;
    },
    encodeBasicAuth(user, password) {
      var creds = user + ":" + password;
      var base64 = btoa(creds);
      return "Basic " + base64;
    },
    // welcome message with toast
    makeToast() {
      this.$bvToast.toast(
        `Willkommen zu dem kollaborativen Literaturreview Tool ${this.$store.state.drupal_api.user.name}`,
        {
          title: "Willkommen",
          autoHideDelay: 4000,
          variant: "info",
        }
      );
    },
  },
  computed: {
    account() {
      return this.$store.state.sparky_api.account;
    },

    validCredential() {
      // return true;
      // return this.$store.state.sparky_api.validCredential;
      // When we login, it breaks the z-circle at the main page.
      // Zircle is hidden when we double click outside of the zcircle
      return this.$store.state.drupal_api.validCredential;
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
    //this.$store.dispatch("todo/loadToDoFromBackend");
    this.$store.dispatch("drupal_api/loadTokensfromSessionStorage");
    this.listOfToDos = this.$store.state.todo.listOfToDos;

    // we need to take some values one time from database.
    // When we take them in cpomponent mounted or created, it brings the values every time we renew the component.
    // this problem occurs the commits that we use push in it.
    // When we set values then it brings again but it seems that nothing has changed in the page.
    //this.$store.dispatch("daily_scrum/loadDailysFromBackend");
  },
};
</script>
<style>
@import "assets/style.css";
@import "assets/loading.css";

.row {
  width: 100% !important;
  margin: 0 !important;
}
.page-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem !important;
}
@media (max-width: 765px) {
  .page-container {
    flex-wrap: wrap-reverse !important;
  }
}

.linkeSeite {
  min-width: 25rem;
}

.rechtseite {
  min-width: 25rem;
}
.mainContent {
  padding: 0 !important;
  min-width: 25rem;
  height: 90vh;
  width: 100%;
}
.postfach {
  text-align: center;
  display: flex;
  justify-content: space-evenly;
}

.chat {
  text-align: center;
}
.login {
  margin-top: 25rem;
}
.untereLeiste {
  height: 100%;
  border: 1px solid black;
  margin: 0;
}
</style>
<style scoped>
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
input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
  margin-bottom: 0.3em;
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
