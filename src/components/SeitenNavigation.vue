<template>

    <div class="seitennavigation">


                           <!--  <p><b-button href="Gruppe bilden" @click="hide" variant="outline-dark" >Gruppe bilden</b-button></p>
                            <p><b-button href="Ziel" @click="hide" variant="outline-dark">Ziel & Umfang</b-button></p>  -->
                            <!-- <router-link tag="div" to="./concept">
                                <p><b-button variant="outline-dark" >Konzepte & Definitionen </b-button></p>
                            </router-link> <br>
                            -->
                          <br>

                                <!-- <b-link :to="{name: 'NAME DER ROUTE AUS router/index.js'}" class="btn btn-outline-dark btn-block mb-2">MENU LINK</b-link> -->
                                <b-link :disabled=isDisabled[0] :to="{name: 'PhaseTemplate', params: { phase: 'Gruppe bilden'}}" class="btn btn-outline-dark btn-block mb-2">Gruppe bilden</b-link>
                                <b-link :disabled=isDisabled[1]  :to="{name: 'PhaseTemplate', params: { phase: 'Ziel'}}" class="btn btn-outline-dark btn-block mb-2">Ziel &amp; Umfang definieren</b-link>
                                <b-link :disabled=isDisabled[2]  :to="{name: 'PhaseTemplate', params: { phase: 'Konzepte'}}" class="btn btn-outline-dark btn-block mb-2">Konzepte &amp; Definitionen identifizieren</b-link>
                                <b-link :disabled=isDisabled[3]  :to="{name: 'PhaseTemplate', params: { phase: 'Literatur'}}" class="btn btn-outline-dark btn-block mb-2">Literatur suchen</b-link>
                                <b-link :disabled=isDisabled[4]  :to="{name: 'PhaseTemplate', params: { phase: 'Daten'}}" class="btn btn-outline-dark btn-block mb-2">Daten extrahieren</b-link>                         
                                <b-link :disabled=isDisabled[5]  :to="{name: 'PhaseTemplate', params: { phase: 'Analyse'}}" class="btn btn-outline-dark btn-block mb-2">Literatur analysieren &amp; synthetisieren</b-link>
                                <b-link :disabled=isDisabled[6]  :to="{name: 'PhaseTemplate', params: { phase: 'Ergebnisse'}}" class="btn btn-outline-dark btn-block mb-2">Ergebnisse kommunizieren</b-link>
                                <b-link :disabled=isDisabled[7]  :to="{name: 'PhaseTemplate', params: { phase: 'Gruppe auflösen'}}" class="btn btn-outline-dark btn-block mb-2">Gruppe auflösen</b-link>
                                <!-- wenn man sich bereits in einer phase befindet ist es bisher nciht möglich in eine andere phase zu wechseln -->

   
  
        <b-dropdown text="Phasen abschließen" class="m-2">
                <b-dropdown-item v-on:click="phaseAbschließen(0)">"Gruppe bilden" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen(1)">"Ziel" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen(2)">"Konzepte" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen(3)">"Literatur" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen(4)">"Daten" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen(5)">"Analyse" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen(6)">"Ergebnisse" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen(7)">"Gruppe auflösen" abschließen</b-dropdown-item>
        </b-dropdown>

                <b-button v-b-modal.modal-seitennavi size="lg"  class="mb-2"> 
                </b-button>
                <b-modal id="modal-seitennavi" title="Phase abschließen">
                <p>Der Beendigung von Phase: "Gruppe bilden" haben {{voted}}, von n Gruppenmitgliedern zugestimmt</p>
                <b-form-checkbox :id="Gruppe" v-model="status" name="checkbox-1" value=1 unchecked-value=0>Gib deeine Stimme ab: Soll diese Phase abgeschlossen werden?</b-form-checkbox>
                {{status}}
                <p></p>


                
                
                

                </b-modal>

    </div>
</template>
<script>

    export default {
        name: 'App',
        data: function () {
            return {
                isDisabled: [false, false, false, false, false, false, false],
                votes: 2,
                status: 0
               // isDisabled: false
            }
        },
        components: {

        },

        methods: {
        /**Abstimmung über die Beendigung einer Phase wird gestartet */
        abstimmungPhaseAbschließen(phase) {
            //to do: Nachricht an alle Gruppenmitglieder (in Postfach) dort Feld zur Abstimmung von abschluss oder eine checkbox für jedes mitglied
            // checkbox oder mail zählt votes hoch und speichert in backend - weitere funktion gibt boolean aus ob abgeschlossen ist und speichert in backend
            // in welchem content type speichern? phasetemplate oder Gruppenbereich?
            // hier checken ob phase abgeschlossen werden kann ->  eine phase kann nur abgeschlossen werden wenn die vorherige abgeschlossen wurde
            console.log(phase)
           
          
            
        },
        /**Phase wird hier wieder geöffnet, wenn erfolgreich über die Reaktivierung abgestimmt wurde */
        phaseWiederOeffnen(phase) {
            /*TODO: 
            */
            console.log(phase)
           if(/*phase==aktuellephase-1*/phase==1){
             this.isDisabled[phase]=false
           }
           else{
               var ausgabe = "Bitte erst die letzte abgeschlossene Phase wieder öffnen"
               console.log(ausgabe)
           }
           
            
        },
        /**parameter: Int
         * Ein Button der eine Phase verlinkt wird hier deaktiviert. Ist der Button bereits aktiviert, wird die Phase reaktiviert.
         */
        phaseAbschließen(phase) {
            /*TODO: phase wird abgeschlossen wenn mehr als n/2 Gruppenmitglieder abgestimmt haben 
            -> diese methode hier wird dann bei jeder änderung aufrufen (welche änderungen?) -> jedes mal wenn ein mitglied abstimmt
            wo wird die Anzahl der Gruppenmitglieder gespeichert? -> immer updaten und hier abrufen für berechnung
            */
            console.log(phase)
           if(this.isDisabled[phase]==false){
               this.isDisabled.splice(phase, 1, true)
           }
           else if(this.isDisabled[phase]==true){
               this.isDisabled.splice(phase, 1, false)
           }
            
            
        }

        },
                computed:{
            /** Gibt einen Int zurück, der aussagt wieviele Gruppenmitglieder schon abgestimmt haben ob eine Phase beendet werden soll */ 
            voted(){
                return this.votes + +this.status
            },
            
        },
        /* watch:{
            $route(to="/projectlist"){
                this.showRightMenu = false;
            }
        } */
    }
    
</script>
<style scoped>
   /*  .seitennavigation {
        background-color: #362c2b;
        width: 20%;
        right: 10px;
        position: absolute;
        height: 99%;
        margin-top: 5px;

    }
    b-button-group {
        background-color: white;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        height: 12%;
        display: table;
        margin-top: 25px;
        cursor: pointer;

    }
    */
    .router-link-active {
        background: #c93e37 !important;
        color: white;

    }

    p {
        display: table-cell;
        vertical-align: middle;
    }
    .search {
        width: 30%;
        margin-left: 30%;
        position: absolute;
        bottom: 0;
        text-align: center;
        height: 8%;
        display: table;
        margin-top: 20px;
        color: white
    }
    .viewSearch {
        background-color: #c93e37;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0;
        height: 20%;
        display: table;
        margin-top: 20px;
    }

    .closeButton {
        background-color: #c93e37;
        position: absolute;
        right: 5px;
    }
    .forum {
        position: absolute;
        bottom: 0;
        margin-left: 65%;
        width: 30%;
        height: 60px;
        background-color: #c93e37;
        text-align: center;
        margin-bottom: 20px;
        display: table;
        cursor: pointer;
        color: white;
        border-radius: 50%;
    }

        .buttons {
        background-color: white;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        height: 12%;
        display: table;
        margin-top: 25px;
        cursor: pointer;
    }


</style>








