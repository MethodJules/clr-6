<template>
    <div id="app">
        <v-app>
            <v-main class="light">
                <!-- <v-container>
                    <Navigation> </Navigation>
                </v-container>
                <v-container>
                    <router-view />
                </v-container> -->
                <b-container> 
                <b-row class ="obereLeiste">
                    <b-col>
                        <div>
                            <b-navbar toggleable="sm" type="light" variant="light">
                            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
                           
                            <b-navbar-brand>
                                <router-link tag="div" to="./home" class="element">
                                    <b-icon-house-fill/>
                                </router-link>
                            </b-navbar-brand>
                            
                            <b-collapse id="nav-text-collapse" is-nav>
                            <b-navbar-nav>
                                <b-col>
                                    <router-link tag="div" to="./projektbeschreibung" class="element">
                                        <b-nav-text>Projektbeschreibung</b-nav-text>
                                    </router-link>
                                </b-col>
                                <b-col>
                                    <router-link tag="div" to="./forum" class="element">
                                        <b-nav-text>Forum</b-nav-text>
                                    </router-link>
                                </b-col>
                                <b-col>
                                    <router-link tag="div" to="./groupmanagement" class="element">
                                        <b-nav-text>Gruppenmanagement</b-nav-text>
                                    </router-link>
                                </b-col>
                                <b-col>
                                    <router-link tag="div" to="./settings" class="element">
                                        <b-nav-text>Einstellungen</b-nav-text>
                                    </router-link>
                                </b-col>
                            </b-navbar-nav>
                            </b-collapse>
                            </b-navbar>
                        </div>
                    </b-col>

        
                </b-row>
                <v-container class="light">
                <b-row>
                    <b-col class="linkeSeite">
                        
                        <b-row>
                            <b-col>
                                <b-form-checkbox>Mein To Do 1</b-form-checkbox>
                                <b-form-checkbox>Mein To Do 2</b-form-checkbox>
                                <b-form-checkbox>Mein To Do 3</b-form-checkbox>
                            </b-col>
                            <b-col>
                                <b-row>
                                <b-button size= "sm"><b-icon-trash/></b-button>
                                </b-row>
                                <b-row>
                                <b-button size= "sm"><b-icon-trash/></b-button>
                                </b-row>
                                <b-row>
                                <b-button size= "sm"><b-icon-trash/></b-button>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            </b-col>
                            <b-col>
                                <b-button pill size= "lg"><b-icon-plus/></b-button>
                            </b-col>
                        </b-row>
                        <b-row>
                            
                            <b-col>
                                <b-calendar
                                    size= "sm"
                                    id="ex-disabled-readonly"
                                    :disabled="disabled"
                                    :readonly="readonly"
                                ></b-calendar>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col class="mitte">
                        <br>
                        <br>
                        <b-img class="img" src="https://trello-attachments.s3.amazonaws.com/5b911be0b9386353bc8afef4/5fd341f17b06ee70f853fc5e/c9944c85c96ffc790112e60a72da44b7/Vorgehensmodell_kollab.jpg" fluid alt="Responsive image"></b-img>
                    </b-col>
                    <b-col class="rechteSeite">
                        <br>
                        <b-button-group vertical size="lg">
                            <p><b-button href="#link-2" @click="hide" variant="outline-dark">Gruppe bilden</b-button></p>
                            <p><b-button href="#link-2" @click="hide" variant="outline-dark">Ziel & Umfang</b-button></p>
                            <router-link tag="div" to="./concept" class="element">
                                <p><b-button variant="outline-dark">Konzepte & Definitionen </b-button></p>
                            </router-link>
                            <p><b-button href="#link-2" @click="hide" variant="outline-dark">Literatur suchen</b-button></p>
                            <p><b-button href="#link-2" @click="hide" variant="outline-dark">Daten extrahieren</b-button></p>
                            <p><b-button href="#link-2" @click="hide" variant="outline-dark">Analyse & Synthese</b-button></p>
                            <p><b-button href="#link-2" @click="hide" variant="outline-dark">Ergebnisse kommunizieren</b-button></p>
                            <p><b-button href="#link-2" @click="hide" variant="outline-dark">Gruppe auflösen</b-button></p>
                        </b-button-group>
                        <b-row>
                            <b-col>
                                <b-icon-chat/>
                                
                            </b-col>
                            <b-col>
                                <b-icon-envelope size="lg"/>
                            </b-col>
                           
                        </b-row>
                         <br>
                    </b-col>
                </b-row>
                </v-container>
                <b-row class="untereLeiste">
                </b-row>
                
                </b-container>


            </v-main>
        </v-app>
    </div>
</template>


<script>

    //import Navigation from '@/components/Navigation.vue'

    export default {
        name: 'App',
        components: {
            //Navigation
        }
    }
</script>
<style>
    @import 'assets/style.css';
    .obereLeiste{
        width: auto;
        border: 1px solid black;
    }
    .linkeSeite{
        width: auto;
        border: 1px solid black;
    }
    .rechteSeite{
        width: 60 px;
        border: 1px solid black;
    }
    .untereLeiste{
        width: auto;
        height: 100 px;
        border: 1px solid black;
    }
    .background {
        background-color: red;
        background-image: url('~@/assets/background2.jpg'); 
        width: 100%;
        height: 90%;
        position: absolute;
        background-size: cover;
        
    }
   /**/ 
    .sc-launcher {
        position: unset !important;
        height: 60px !important;
        margin-bottom: 20px !important;
        
    }

    .sc-launcher::before {
        position: unset !important;
        height: 60px !important;
        height:unset !important;
    }

    .sc-open-icon {
        position: unset !important;
       
    }

    .sc-closed-icon {
        position: unset !important;
    }

    .sc-chat-window {
        width: 20% !important;
        height: 50% !important;
    }

    .sc-header {
        height: 15% !important;
        min-height: unset !important;
    }
    .sc-header--title {
        font-size: 10px !important;
        min-height: unset !important;
    }

    .sc-message {
        width: unset !important;
        margin-right: 10px !important;
    }
    .sc-message--text {
        padding-bottom: 5px !important;
        padding-top: 5px !important;
        padding-left: 5px !important;
        padding-right: 5px !important;
        font-size: 12px !important;
        max-width: unset !important;

    }
    .sc-message--content.sent {
        margin-left: 15%;
    }

    .sc-message--text-content {
        margin-bottom: 0px;
    }

    .sc-user-input {
        min-height: unset !important;
        height: 10% !important;
    }
    .sc-user-input--text {
        height: 40px !important;
        min-height: unset !important;
        padding: 5px !important;
        width: 90% !important;
    }
    .sc-user-input--button {
        margin-left: 50px !important;
       
    }


</style>

