<template>
    <div id="app">
        <div v-if="validCredential != true">
            <div class="mx-auto" style="width: 50rem">
                <b-container>
                    <b-row align-v="center">
                        <b-col>
                            <b-card class="login">
                                <b-form-group>
                                    <b-tabs>
                                        <!-- Tab 1 -->
                                        <b-tab title="Login">
                                            <h5>
                                                Melde dich hier mit deinem
                                                Uni-Account an
                                            </h5>
                                            <p>
                                                Wenn du dich noch nicht
                                                registriert hast, bitte
                                                registriere dich mit deinem
                                                Uni-Account
                                            </p>
                                            <table>
                                                <tr>
                                                    <td>
                                                        <label
                                                            for="zugangsKennung"
                                                            class="mr-1"
                                                            >Zugangskennung</label
                                                        >
                                                    </td>
                                                    <td>
                                                        <input
                                                            v-model="
                                                                zugangsKennung
                                                            "
                                                            id="zugangskennung"
                                                            type="text"
                                                            placeholder=""
                                                            class="form-control"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label
                                                            for="password"
                                                            class="mr-1 mt-1"
                                                            >Passwort</label
                                                        >
                                                    </td>
                                                    <td>
                                                        <input
                                                            v-model="passwort"
                                                            id="password"
                                                            type="password"
                                                            placeholder=""
                                                            class="
                                                                form-control
                                                                mt-1
                                                            "
                                                        />
                                                    </td>
                                                </tr>
                                            </table>

                                            <b-button @click="login()"
                                                >Login</b-button
                                            >
                                        </b-tab>

                                        <b-tab title="Registrierung">
                                            <!--  TODO: make new variables for registration -->
                                            <h5>
                                                Registriere dich hier mit deinem
                                                Uni-Account
                                            </h5>
                                            <p>
                                                Falls du Hilfe benötigst, wende
                                                dich an mail@uni-hildesheim.de
                                            </p>
                                            <table>
                                                <tr>
                                                    <td>
                                                        <label
                                                            for="zugangsKennung"
                                                            class="mr-1"
                                                            >Zugangskennung</label
                                                        >
                                                    </td>
                                                    <td>
                                                        <input
                                                            v-model="
                                                                zugangsKennung
                                                            "
                                                            id="zugangskennung2"
                                                            type="text"
                                                            placeholder=""
                                                            class="form-control"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label
                                                            for="password"
                                                            class="mr-1 mt-1"
                                                            >Passwort</label
                                                        >
                                                    </td>
                                                    <td>
                                                        <input
                                                            v-model="passwort"
                                                            id="password2"
                                                            type="password"
                                                            placeholder=""
                                                            class="
                                                                form-control
                                                                mt-1
                                                            "
                                                        />
                                                    </td>
                                                </tr>
                                            </table>
                                            <b-button @click="registrieren()"
                                                >Registrieren</b-button
                                            >
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
            eintragTodo: {
                todo: "",
            },
        };
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
        generatePassword(username) {
            const crypto = require("crypto");
            const md5sum = crypto.createHash("md5");
            let str = username;
            const res = md5sum.update(str).digest("hex");
            console.log(res);
            return res;
        },
        login() {
            let username = this.zugangsKennung;
            let password = this.passwort;
            // wenn das hier genutzt wird -> password wird aus namen generiert - die "richtige" anmeldung des nutzers erfolgt beim sparky backend mit rz kennung
            //password=this.generatePassword(username)
            let authorization_token = this.encodeBasicAuth(username, password);
            this.$store.dispatch("drupal_api/loginToDrupal", {
                username,
                password,
            });
            this.$store.dispatch(
                "drupal_api/saveBasicAuth",
                authorization_token
            );
            console.log(authorization_token);
            //remove so username and password arent saved after login
            this.username = "";
            this.password = "";
            return authorization_token;
        },
        encodeBasicAuth(user, password) {
            var creds = user + ":" + password;
            var base64 = btoa(creds);
            return "Basic " + base64;
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

