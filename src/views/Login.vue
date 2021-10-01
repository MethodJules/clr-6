<template>
    <div class="w-background">
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
                                    Wenn du dich noch nicht registriert hast, bitte
                                    registriere dich mit deinem Uni-Account
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
                                        <input
                                            v-model="zugangsKennung"
                                            id="zugangskennung"
                                            type="text"
                                            placeholder=""
                                            class="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="password">Passwort</label>
                                    </td>
                                    <td>
                                        <input
                                            v-model="passwort"
                                            id="password"
                                            type="password"
                                            placeholder=""
                                            class="form-control"
                                        />
                                    </td>
                                </tr>
                            </table>

                            <b-button @click="login()">Login</b-button>
                        </b-tab>
                        <b-tab title="Registrierung">
                            <div class="registrierung-header">
                                <h5>
                                    Registriere dich hier mit deinem Uni-Account
                                </h5>
                                <p>
                                    Falls du Hilfe benötigst, wende dich an
                                    mail@uni-hildesheim.de
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
                                        <input
                                            v-model="zugangsKennung"
                                            id="zugangskennung2"
                                            type="text"
                                            placeholder=""
                                            class="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="password">Passwort</label>
                                    </td>
                                    <td>
                                        <input
                                            v-model="passwort"
                                            id="password2"
                                            type="password"
                                            placeholder=""
                                            class="form-control"
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
        </div>
        <div>
            <v-footer padless>
                <v-card class="flat tile text-center" color="#6c757d">
                    <v-card-title>
                        eCLR Tool - Das Tool für kollaborative Literaturreviews in der Lehre
                    </v-card-title>
                    <v-card-subtitle>
                        Dieses OpenSource-Projekt wurde im Rahmen der Ausschreibung "Qualität Plus" des MWK Niedersachsen erstellt.
                        Näheres dazu finden Sie <a href="https://www.uni-hildesheim.de/fb4/institute/bwl/informationssysteme-und-unternehmensmodellierung/projekte/qualitaet-plus/">hier</a>
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text class="pb-3">
                        <img src="../assets/logo.svg" width="24px" height="24px"> Universität Hildesheim - {{ new Date().getFullYear() }}
                    </v-card-text>
                </v-card>
            </v-footer>
        </div>
    </div>
</template>
<script>
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
            this.$store
                .dispatch("drupal_api/loginToDrupal", {
                    username,
                    password,
                })
                .then(() => {
                    this.$router.push("/");
                });
            this.$store.dispatch(
                "drupal_api/saveBasicAuth",
                authorization_token
            );
            this.$store.dispatch(
                "drupal_api/getSessionToken",
                username,
                password,
                123
            );

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
    // mounted() {
    //     this.$store.dispatch("drupal_api/loadTokensfromSessionStorage");
    // },
};
</script>
<style scoped>
.w-background {
    background-image: url('../assets/background2.jpg');
    background-size: cover;
}

.v-card__title,
.v-card__subtitle,
.v-card__text {
    color: white;
}

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
</style>
