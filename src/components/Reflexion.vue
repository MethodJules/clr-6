<template>
    <b-col class="border border-dark">  
        <!-- 3 Tabs werden erstellt --> 
        <b-tabs content-class="mt-3">
            <!-- Tab 1 -->
            <b-tab title="Ich">
                <h2>Reflexion zu Phase: {{reflexionsPhase}}</h2>
                <b-container fluid>
                    <b-row class="ich-tab">
                        <b-col sm="2">
                            <!-- Textfeld 1 -->
                            <label for="textfeld-1">Berichten / Reagieren </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="berichten_reagieren"
                            id="textfeld-1"
                            placeholder="Wählen Sie aus, worüber Sie reflektieren wollen: Gab es einen Vorfall, der Ihnen besonders positiv im Gedächtnis geblieben ist? Ist ein Problem oder eine Herausforderung aufgetreten? Fassen Sie zusammen, was vorgefallen ist. Warum ist dieser Vorfall für Sie relevant?"                           
                        ></b-form-textarea>            
                        <br>
                        </b-col>
                        <b-col sm="2">
                            <!-- Textfeld 2 -->
                            <label for="textfeld-2">In Bezug setzen </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="in_bezug_setzen"
                            id="textfeld-2"
                            placeholder="Setzen Sie den Vorfall bzw. das Problem mit Ihren eigenen Kenntnissen, Fertigkeiten, Erfahrung oder fachlichem Wissen in Verbindung. Ist Ihnen ein ähnlicher Vorfall schon einmal begegnet? Waren die Umstände gleich oder unterschiedlich? Haben Sie die Fähigkeiten und das Wissen, um damit umzugehen? Erläutern Sie."
                            
                        ></b-form-textarea>
                        <br>
                        </b-col>
                

                        <b-col sm="2">
                            <!-- Textfeld 3 -->
                            <label for="textfeld-3">Schlussfolgern </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="schlussfolgern"
                            id="textfeld-3"
                            placeholder="Rekonstruieren Sie zukünftiges Handeln in Bezug auf den Vorfall bzw. das Problem. Wie würden Sie beim nächsten Mal vorgehen? Welche Ansätze könnten funktionieren und wieso? Gibt es verschiedene Optionen, aus denen Sie wählen können? Welches Ergebnis erwarten Sie?"
                            
                        ></b-form-textarea>

                        <br>

                        </b-col>


                        <b-col sm="2">
                            <!-- Textfeld 4 -->
                            <label for="textfeld-4">Rekonstruieren </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="rekonstruieren"
                            id="textfeld-4"
                            placeholder="Rekonstruieren Sie zukünftiges Handeln in Bezug auf den Vorfall bzw. das Problem. Wie würden Sie beim nächsten Mal vorgehen? Welche Ansätze könnten funktionieren und wieso? Gibt es verschiedene Optionen, aus denen Sie wählen können? Welches Ergebnis erwarten Sie?"
                            
                        ></b-form-textarea>

                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <b-col>
                            <!-- Ausgabe der Textfelder -->
                            <div id="reflexion">
                            <h3>Reflexion</h3>
                            <p> Berichten / Reagieren: {{this.berichten_reagieren}}</p>
                            <p> In Bezug setzen: {{this.in_bezug_setzen}}</p>
                            <p> Schlussfolgern: {{this.schlussfolgern}}</p>
                            <p> Rekonstruieren: {{this.rekonstruieren}}</p>
                             

                            </div>
                        <!-- <b-modal id="reflexion_speichern_modal" title="Speichern">
                        <b-form-textarea id="reflexion_speichern_form_textarea" rows="6" v-model="reflexionsText"></b-form-textarea> -->
                        <!-- </b-modal> -->
                        </b-col>

                        </b-col>

                        <b-col>
                        <b-button>Zum Dashboard</b-button>
                        </b-col>
                   

                        <b-col>
                        </b-col>
                        <b-col>
                        <!-- <b-button v-b-modal.reflexion_speichern_modal>Speichern</b-button> -->
                        <b-button  @click="addItem">Speichern</b-button>
                        <b-button  @click="loadReflexion">Reflexion laden</b-button>
                        

                        </b-col>



                    </b-row>

                    

                </b-container>

                
            </b-tab>
            <b-tab title="Gruppe & Zusammenarbeit">
                <h2>Reflexion zu Phase: {{reflexionsPhase}}</h2>
                <b-container fluid>
                    <b-row class="gruppe-tab">
                        <b-col sm="2">
                            <!-- Textfeld 1 -->
                            <label for="text-1">Berichten / Reagieren </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="berichten_reagieren"
                            id="text-1"
                            placeholder="Wählen Sie aus, worüber Sie reflektieren wollen: Gab es einen Vorfall, der Ihnen besonders positiv im Gedächtnis geblieben ist? Ist ein Problem oder eine Herausforderung aufgetreten? Fassen Sie zusammen, was vorgefallen ist. Warum ist dieser Vorfall für Sie relevant?"                           
                        ></b-form-textarea>            
                        <br>
                        </b-col>
                        <b-col sm="2">
                            <!-- Textfeld 2 -->
                            <label for="text-2">In Bezug setzen </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="in_bezug_setzen"
                            id="text-2"
                            placeholder="Setzen Sie den Vorfall bzw. das Problem mit Ihren eigenen Kenntnissen, Fertigkeiten, Erfahrung oder fachlichem Wissen in Verbindung. Ist Ihnen ein ähnlicher Vorfall schon einmal begegnet? Waren die Umstände gleich oder unterschiedlich? Haben Sie die Fähigkeiten und das Wissen, um damit umzugehen? Erläutern Sie."
                            
                        ></b-form-textarea>
                        <br>
                        </b-col>
                

                        <b-col sm="2">
                            <!-- Textfeld 3 -->
                            <label for="text-3">Schlussfolgern </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="schlussfolgern"
                            id="text-3"
                            placeholder="Rekonstruieren Sie zukünftiges Handeln in Bezug auf den Vorfall bzw. das Problem. Wie würden Sie beim nächsten Mal vorgehen? Welche Ansätze könnten funktionieren und wieso? Gibt es verschiedene Optionen, aus denen Sie wählen können? Welches Ergebnis erwarten Sie?"
                            
                        ></b-form-textarea>

                        <br>

                        </b-col>


                        <b-col sm="2">
                            <!-- Textfeld 4 -->
                            <label for="text-4">Rekonstruieren </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="rekonstruieren"
                            id="text-4"
                            placeholder="Rekonstruieren Sie zukünftiges Handeln in Bezug auf den Vorfall bzw. das Problem. Wie würden Sie beim nächsten Mal vorgehen? Welche Ansätze könnten funktionieren und wieso? Gibt es verschiedene Optionen, aus denen Sie wählen können? Welches Ergebnis erwarten Sie?"
                            
                        ></b-form-textarea>

                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <b-col>
                            <!-- Ausgabe der Textfelder -->
                            <div id="reflexion">
                            <h3>Reflexion</h3>
                            <p> Berichten / Reagieren: {{this.berichten_reagieren}}</p>
                            <p> In Bezug setzen: {{this.in_bezug_setzen}}</p>
                            <p> Schlussfolgern: {{this.schlussfolgern}}</p>
                            <p> Rekonstruieren: {{this.rekonstruieren}}</p>
                             

                            </div>
                        <!-- <b-modal id="reflexion_speichern_modal" title="Speichern">
                        <b-form-textarea id="reflexion_speichern_form_textarea" rows="6" v-model="reflexionsText"></b-form-textarea> -->
                        <!-- </b-modal> -->
                        </b-col>

                        </b-col>

                        <b-col>
                        <b-button>Zum Dashboard</b-button>
                        </b-col>
                   

                        <b-col>
                        </b-col>
                        <b-col>
                        <!-- <b-button v-b-modal.reflexion_speichern_modal>Speichern</b-button> -->
                        <b-button  @click="addItem">Speichern</b-button>
                        <b-button  @click="loadReflexion">Reflexion laden</b-button>
                        

                        </b-col>



                    </b-row>

                    

                </b-container>

                
            </b-tab>
                
            


            <b-tab title="Fachlicher Kontext (Literaturreview)"> 
                <h2>Reflexion zu Phase: {{reflexionsPhase}}</h2>
                <b-container fluid>
                    <b-row class="kontext-tab">
                        <b-col sm="2">
                            <!-- Textfeld 1 -->
                            <label for="txt-1">Berichten / Reagieren </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="berichten_reagieren"
                            id="txt-1"
                            placeholder="Wählen Sie aus, worüber Sie reflektieren wollen: Gab es einen Vorfall, der Ihnen besonders positiv im Gedächtnis geblieben ist? Ist ein Problem oder eine Herausforderung aufgetreten? Fassen Sie zusammen, was vorgefallen ist. Warum ist dieser Vorfall für Sie relevant?"                           
                        ></b-form-textarea>            
                        <br>
                        </b-col>
                        <b-col sm="2">
                            <!-- Textfeld 2 -->
                            <label for="txt-2">In Bezug setzen </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="in_bezug_setzen"
                            id="txt-2"
                            placeholder="Setzen Sie den Vorfall bzw. das Problem mit Ihren eigenen Kenntnissen, Fertigkeiten, Erfahrung oder fachlichem Wissen in Verbindung. Ist Ihnen ein ähnlicher Vorfall schon einmal begegnet? Waren die Umstände gleich oder unterschiedlich? Haben Sie die Fähigkeiten und das Wissen, um damit umzugehen? Erläutern Sie."
                            
                        ></b-form-textarea>
                        <br>
                        </b-col>
                

                        <b-col sm="2">
                            <!-- Textfeld 3 -->
                            <label for="txt-3">Schlussfolgern </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="schlussfolgern"
                            id="txt-3"
                            placeholder="Rekonstruieren Sie zukünftiges Handeln in Bezug auf den Vorfall bzw. das Problem. Wie würden Sie beim nächsten Mal vorgehen? Welche Ansätze könnten funktionieren und wieso? Gibt es verschiedene Optionen, aus denen Sie wählen können? Welches Ergebnis erwarten Sie?"
                            
                        ></b-form-textarea>

                        <br>

                        </b-col>


                        <b-col sm="2">
                            <!-- Textfeld 4 -->
                            <label for="txt-4">Rekonstruieren </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            v-model="rekonstruieren"
                            id="txt-4"
                            placeholder="Rekonstruieren Sie zukünftiges Handeln in Bezug auf den Vorfall bzw. das Problem. Wie würden Sie beim nächsten Mal vorgehen? Welche Ansätze könnten funktionieren und wieso? Gibt es verschiedene Optionen, aus denen Sie wählen können? Welches Ergebnis erwarten Sie?"
                            
                        ></b-form-textarea>

                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <b-col>
                            <!-- Ausgabe der Textfelder -->
                            <div id="reflexion">
                            <h3>Reflexion</h3>
                            <p> Berichten / Reagieren: {{this.berichten_reagieren}}</p>
                            <p> In Bezug setzen: {{this.in_bezug_setzen}}</p>
                            <p> Schlussfolgern: {{this.schlussfolgern}}</p>
                            <p> Rekonstruieren: {{this.rekonstruieren}}</p>
                             

                            </div>
                        <!-- <b-modal id="reflexion_speichern_modal" title="Speichern">
                        <b-form-textarea id="reflexion_speichern_form_textarea" rows="6" v-model="reflexionsText"></b-form-textarea> -->
                        <!-- </b-modal> -->
                        </b-col>

                        </b-col>

                        <b-col>
                        <b-button>Zum Dashboard</b-button>
                        </b-col>
                   

                        <b-col>
                        </b-col>
                        <b-col>
                        <!-- <b-button v-b-modal.reflexion_speichern_modal>Speichern</b-button> -->
                        <b-button  @click="addItem">Speichern</b-button>
                        <b-button  @click="loadReflexion">Reflexion laden</b-button>
                        

                        </b-col>



                    </b-row>

                    

                </b-container>

                
                
            </b-tab>
        </b-tabs>





    </b-col>
</template>

<script>
//TO DO: mehr felder hinzufügen für die anderen tabs gruppe & zusammenarbeit und fachlicher kontext
export default {
            props: {
    reflexionsPhase: String
    },
    data() {
        return {
            reflexionList:[],
            berichten_reagieren: '',
            in_bezug_setzen: '',
            schlussfolgern: '',
            rekonstruieren: ''
        }
    },
    methods: {

        /** Reflexion wird in das Backend geladen */
        addItem() {
            /* To Do: überprüfen ob schon eine reflexion zu dieser phase von dieser person angefertigt wurde 
            -> kein neuer Eintrag, alte Reflexion kann überschrieben oder aktualisiert werden
            */
            var ausgabe = {

            berichten_reagieren: this.berichten_reagieren,
            in_bezug_setzen:  this.in_bezug_setzen,
            schlussfolgern: this.schlussfolgern,
            rekonstruieren: this.rekonstruieren

            };

            this.$store.dispatch('reflexion/createReflexion', ausgabe)
            console.log(ausgabe.berichten_reagieren)

            this.berichten_reagieren=""
            this.in_bezug_setzen=""
            this.schlussfolgern=""
            this.rekonstruieren=""
            
        },
        /**Reflexion wird manuell aus dem Backend geladen */
        loadReflexion(){
            //To Do: dynamisch machen - oder wie bei tabelledaily etc unten während der mount phase in die felder laden
            this.berichten_reagieren=this.reflexionList[1].berichten_reagieren
            this.in_bezug_setzen=this.reflexionList[1].in_bezug_setzen
            this.schlussfolgern=this.reflexionList[1].schlussfolgern
            this.rekonstruieren=this.reflexionList[1].rekonstruieren
            console.log(this.test)        
        },
        updateReflexion(){
            //to do
        },
    },
    /** lädt alle Reflexionen aus dem Backend */
    mounted() {
    this.$store.dispatch('reflexion/loadReflexionFromBackend')
    this.rowData = this.$store.state.reflexion.rowData
    this.reflexionList=this.rowData
    // TO DO: nur die Daten laden die der Phase und der Nutzer ID entsprechen
    //console.log(this.reflexionList)
    //console.log(typeof(this.reflexionList))
    
  },
       

    
}
</script>

