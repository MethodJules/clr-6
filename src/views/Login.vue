<template>
    <div class="w-background">
        <Gdpr v-on:gdprAccepted="enableButtons" />
        <div class="container">
            <b-card class="container-form">
                <b-form-group>
                    <b-tabs v-model="tabIndex">
                        <!-- Class name is automatically "tabs" -->
                        <!-- Tab 1 -->
                        <b-tab title="Login">
                            <div class="login-header">
                                <h5>
                                    Melde dich hier mit deinem Uni-Account an
                                </h5>
                                <p>
                                    Wenn du dich noch nicht registriert hast,
                                    bitte registriere dich mit deinem
                                    Uni-Account
                                </p>
                            </div>
                            <table>
                                <tr>
                                    <td>
                                        <label for="zugangsKennung"
                                            >Zugangskennung</label
                                        >
                                    </td>
                                    <td>
                                        <b-form-input
                                            v-model="zugangsKennung"
                                            v-on:input="
                                                $v.zugangsKennung.$touch
                                            "
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
                                        <label for="password">Passwort</label>
                                    </td>
                                    <td>
                                        <b-form-input
                                            v-model="passwort"
                                            v-on:input="$v.passwort.$touch"
                                            v-bind:class="{
                                                error: $v.passwort.$error,
                                                valid:
                                                    $v.passwort.$dirty &&
                                                    !$v.passwort.$invalid,
                                            }"
                                            type="password"
                                            id="password"
                                            placeholder=""
                                        >
                                        </b-form-input>
                                    </td>
                                </tr>
                            </table>

                            <b-button :disabled="!gdprAccepted" @click="login()"
                                >Login</b-button
                            >
                        </b-tab>
                        <b-tab title="Registrierung">
                            <div class="registrierung-header">
                                <h5>
                                    Registriere dich hier mit deinem Uni-Account
                                </h5>
                                <p>
                                    Falls du Hilfe benötigst, wende dich an
                                    maren.stadtlaender@uni-hildesheim.de
                                </p>
                            </div>
                            <table>
                                <tr>
                                    <td>
                                        <label for="checkbox-is-lecturer"
                                            >Ich bin ein Dozent</label
                                        >
                                    </td>
                                    <td>
                                        <b-form-checkbox
                                            style="margin-left: 0.5rem"
                                            name="checkbox-is-lecturer"
                                            v-model="getIsLecturer"
                                        >
                                        </b-form-checkbox>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <label for="zugangsKennung"
                                            >Zugangskennung</label
                                        >
                                    </td>
                                    <td>
                                        <b-form-input
                                            v-model="registrierungsKennung"
                                            v-on:input="
                                                $v.registrierungsKennung.$touch
                                            "
                                            v-bind:class="{
                                                error: $v.registrierungsKennung
                                                    .$error,
                                                valid:
                                                    $v.registrierungsKennung
                                                        .$dirty &&
                                                    !$v.registrierungsKennung
                                                        .$invalid,
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
                                            v-on:input="
                                                $v.registrierungsPasswort.$touch
                                            "
                                            v-bind:class="{
                                                error: $v.registrierungsPasswort
                                                    .$error,
                                                valid:
                                                    $v.registrierungsPasswort
                                                        .$dirty &&
                                                    !$v.registrierungsPasswort
                                                        .$invalid,
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
                                        <label
                                            v-b-tooltip.hover
                                            title="Studenten geben bitte ihre Matrikelnummer mit an"
                                            for="Matrikelnummer"
                                            class="mr-1 mt-1"
                                            >Matrikelnummer</label
                                        >
                                    </td>
                                    <td>
                                        <b-form-input
                                            :disabled="getIsLecturer"
                                            v-model="matrikelnummer"
                                            v-on:input="
                                                $v.matrikelnummer.$touch
                                            "
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
                            <b-button
                                :disabled="!gdprAccepted"
                                @click="registrieren()"
                                >Registrieren</b-button
                            >
                        </b-tab>
                    </b-tabs>
                </b-form-group>
            </b-card>

            <v-footer padless absolute>
                <v-card class="flat tile text-center" color="#6c757d">
                    <v-card-title>
                        eCLR Tool - Das Tool für kollaborative Literaturreviews
                        in der Lehre
                    </v-card-title>
                    <v-card-subtitle>
                        Dieses OpenSource-Projekt wurde im Rahmen der
                        Ausschreibung "Qualität Plus" des MWK Niedersachsen
                        erstellt. Näheres dazu finden Sie
                        <a
                            href="https://www.uni-hildesheim.de/fb4/institute/bwl/informationssysteme-und-unternehmensmodellierung/projekte/qualitaet-plus/"
                            target="_blank"
                            rel="noopener noreferrer"
                            >hier</a
                        >.
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text class="pb-3">
                        <img
                            src="../assets/logo.svg"
                            width="24px"
                            height="24px"
                        />
                        <a
                            href="https://www.uni-hildesheim.de/impressum/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Universität Hildesheim
                        </a>
                        - {{ new Date().getFullYear() }}
                    </v-card-text>
                </v-card>
            </v-footer>
        </div>
    </div>
</template>
<script>
import {
    requiredIf,
    minLength,
    integer,
    alpha,
    alphaNum,
    minValue,
    maxLength,
} from "vuelidate/lib/validators";
import Gdpr from "@/components/Gdpr.vue";
import emailjs from "emailjs-com";

export default {
    components: { Gdpr },

    data() {
        return {
            tabIndex: 0,
            zugangsKennung: "",
            passwort: "",
            registrierungsKennung: "",
            registrierungsPasswort: "",
            matrikelnummer: "",
            gdprAccepted: false,
            isLecturer: false,
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
                return this.validate_login();
            }),
            minLength: minLength(1),
            alphaNum,
        },
        passwort: {
            required: requiredIf(function () {
                return this.validate_login();
            }),
            minLength: minLength(1),
        },
        registrierungsKennung: {
            required: requiredIf(function () {
                return this.validate_login();
            }),
            minLength: minLength(1),
            alphaNum,
        },
        registrierungsPasswort: {
            required: requiredIf(function () {
                return this.validate_login();
            }),
            minLength: minLength(1),
        },
        matrikelnummer: {
            required: requiredIf(function () {
                return !this.getIsLecturer && this.tabIndex == 1;
            }),
            integer,
            minLength: minLength(1),
            minValue: minValue(0),
            maxLength: maxLength(10),
        },
    },
    computed: {
        getIsLecturer: {
            get() {
                return this.$store.state.drupal_api.isLecturer;
            },
            set(value) {
                this.$store.commit("drupal_api/SET_IS_LECTURER"), value;
            },
        },

        account() {
            return this.$store.state.sparky_api.account;
        },
    },
    methods: {
        sendEmail(username) {
            //TODO: get username from state as well, to make it more uniform?
            var templateParams = {
                name: `${username}`,
                email: this.$store.state.sparky_api.sparkyUserObject.data.email,
            };

            emailjs
                .send(
                    "service_1h8ohmh",
                    "template_8ala1li",
                    templateParams,
                    "user_sECTHBIy6LTneEfcljkg9"
                )
                .then(
                    (result) => {
                        alert(
                            "Eine automatische Nachricht an stadtlaender@uni-hildesheim.de wurde versendet. Deine Rollenberechtigungen werden bald freigeschaltet. Bitte warte auf eine entsprechende Bestätigung bevor du dich einloggst"
                        );
                    },
                    (error) => {
                        alert(
                            "Es konnte keine automatische Nachricht an stadtlaender@uni-hildesheim.de versendet werden. Bitte schreibe eine Email an die genannte Email-Adresse und bitte um eine Freischaltung deiner Rollenberechtigung als Dozent"
                        );
                    }
                );
        },

        // enable buttons after data protection has been accepted
        enableButtons() {
            this.gdprAccepted = true;
        },

        /* function validates log in and registration input
    returns true, when the associated input field (dependent_field) is not empty or all fields are empty
    e.g. if passwort is not empty, zugansKennung is also required*/
        validate_login() {
            let ausgabe = false;
            if (this.tabIndex == 0) {
                if (this.passwort == "" || this.zugangsKennung == "") {
                    ausgabe = true;
                }
            } else {
                if (
                    this.registrierungsKennung == "" ||
                    this.registrierungsPasswort == ""
                ) {
                    ausgabe = true;
                }
            }
            return ausgabe;
        },
        /* registers a user first at sparky backend and then uses the data from sparky backend to register/create a new user at clr drupal backend
         * students have to put in their matrikelnummer, lecturers don't
         * functions called in sequence: sparky_api/registrate -> sparky_api/getWhoamI -> drupal_api/getSessionToken -> drupal_api/createUser
         */
        registrieren() {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                if (this.getIsLecturer) {
                    this.matrikelnummer = "";
                }
                const username = this.registrierungsKennung;
                this.$store
                    .dispatch("sparky_api/registrate", {
                        username: username,
                        password: this.registrierungsPasswort,
                        matrikelnummer: this.matrikelnummer,
                    })
                    .then(() => {
                        //remove so username and password arent saved after login

                        this.registrierungsKennung = "";
                        this.registrierungsPasswort = "";
                        this.matrikelnummer = "";
                    })
                    .catch((error) => {});
            } else {
                alert("Bitte Registrierungsdaten eingeben");
            }
        },

        /* logs a user in at drupal backend
         * then saves the basic Authentication token in the state
         * login only works if validation is true
         * a log in message is displayed when user is logged in
         */
        login() {
            // When we login, it breaks the z-circle at the main page.
            // Zircle is hidden when we double click outside of the zcircle
            this.$v.$touch();
            //checks if the given user data is valid i.e. username is string only(rechenzentrumskennung only uses letters) and password are filled out , both have min length requirement
            if (!this.$v.$invalid) {
                let username = this.zugangsKennung;
                let password = this.passwort;
                let authorization_token = this.encodeBasicAuth(
                    username,
                    password
                );
                //first calls authenticate from sparky api, then logs user in backend
                this.$store
                    //TODO: uncomment next line and comment out the line after, when project goes in production -> authenticate with sparkyservice
                    // .dispatch("sparky_api/authenticate", {
                    .dispatch("drupal_api/loginToDrupal", {
                        username,
                        password,
                    })
                    .then(() => {
                        //also appears when the user is logged in, but the sessionStorage is empty -> error 403
                        //TODO: check if error 403?
                        if (this.$store.state.drupal_api.validCredential) {
                            this.makeToast();
                            this.zugangsKennung = "";
                            this.passwort = "";
                        }
                    });
                this.$store.dispatch(
                    "drupal_api/saveBasicAuth",
                    authorization_token
                );

                //remove so username and password arent saved after login

                //this.testButClicked(true);
            } else {
                alert(
                    "Bitte gib deine Rechenzentrumskennung und dein Passwort ein."
                );
            }
        },
        /* creates the basic authentication token */
        encodeBasicAuth(user, password) {
            var creds = user + ":" + password;
            var base64 = btoa(creds);
            return "Basic " + base64;
        },
        // welcome message with toast
        makeToast() {
            this.$root.$bvToast.toast(
                // removed because of new routing this is not available at login at this point of time `Willkommen zu dem kollaborativen Literaturreview Tool ${this.$store.state.drupal_api.user.name}`,
                `Willkommen zu deinem kollaborativen Literaturreview Tool`,
                // `Willkommen zu dem kollaborativen Literaturreview Tool ${this.$store.state.drupal_api.user.fullname}`,
                {
                    title: "Willkommen",
                    autoHideDelay: 4000,
                    variant: "info",
                }
            );
        },
    },
    // mounted() {
    //     this.$store.dispatch("drupal_api/loadTokensfromSessionStorage");
    // },
};
</script>
<style scoped>
.w-background {
    background-image: url("../assets/background2.jpg");
    background-size: cover;
    margin: 0;
    padding: 0;
    height: 100vh;
}
footer {
    position: absolute;
}
.container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.v-card__title,
.v-card__subtitle,
.v-card__text {
    color: white;
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