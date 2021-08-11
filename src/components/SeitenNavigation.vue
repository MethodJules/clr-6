<template>

    <div>
        <b-link
            v-for="(phase, i) in phasen"
            :key="i"
            :disabled="!phase.status"
            :to="{
                name: 'PhaseTemplate',
            }"
            class="btn btn-danger mb-2 btn-block text-left"
        >
            <b-icon :icon="phase.iconType" class="mr-3"></b-icon>
            {{ phase.title }}
        </b-link>

        <!-- wenn man sich bereits in einer phase befindet ist es bisher nciht möglich in eine andere phase zu wechseln -->

        <SeitenNavigationButtons @statusChange="changeStatus($event)" />
    </div>

</template>
<script>
import SeitenNavigationButtons from "@/components/SeitenNavigationButtons.vue";
export default {
    name: "App",
    data: function () {
        return {
            isDisabled: [false, false, false, false, false, false, false], // it was hard to control from another component.
            votes: 2,
            status: 0,
            gruppe: 1,
            phasen: [
                {
                    id: "0",
                    title: "Gruppe Bilden",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "people",
                },
                {
                    id: "1",
                    title: "Ziel & Umfang definieren",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "signpost-split",
                },
                {
                    id: "2",
                    title: "Konzepte & Definitionen identifizieren",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "diagram3",
                },
                {
                    id: "3",
                    title: "Literatur Suchen",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "book",
                },
                {
                    id: "4",
                    title: "Daten Extrahieren",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "arrow-left-right",
                },
                {
                    id: "5",
                    title: "Literatur Analysieren & Syntheisieren",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "vector-pen",
                },
                {
                    id: "6",
                    title: "Ergebnisse Kommunizieren",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "card-checklist",
                },
                {
                    id: "7",
                    title: "Gruppe Auflösen",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "columns-gap",
                },
            ],
        };
    },
    components: {
        SeitenNavigationButtons,
    },

    methods: {
        changeStatus(phase) {
            this.phasen[phase.id].status = false;
        },

        /**Abstimmung über die Beendigung einer Phase wird gestartet */
        abstimmungPhaseAbschließen(phase) {
            //to do: Nachricht an alle Gruppenmitglieder (in Postfach) dort Feld zur Abstimmung von abschluss oder eine checkbox für jedes mitglied
            // checkbox oder mail zählt votes hoch und speichert in backend - weitere funktion gibt boolean aus ob abgeschlossen ist und speichert in backend
            // in welchem content type speichern? phasetemplate oder Gruppenbereich?
            // hier checken ob phase abgeschlossen werden kann ->  eine phase kann nur abgeschlossen werden wenn die vorherige abgeschlossen wurde
            console.log(phase);
        },
        /**Phase wird hier wieder geöffnet, wenn erfolgreich über die Reaktivierung abgestimmt wurde */
        phaseWiederOeffnen(phase) {
            /*TODO:
             */
            console.log(phase);
            if (/*phase==aktuellephase-1*/ phase == 1) {
                this.isDisabled[phase] = false;
            } else {
                var ausgabe =
                    "Bitte erst die letzte abgeschlossene Phase wieder öffnen";
                console.log(ausgabe);
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
            console.log(phase);
            if (this.isDisabled[phase] == false) {
                this.isDisabled.splice(phase, 1, true);
            } else if (this.isDisabled[phase] == true) {
                this.isDisabled.splice(phase, 1, false);
            }
        },
    },
    computed: {
        /** Gibt einen Int zurück, der aussagt wieviele Gruppenmitglieder schon abgestimmt haben ob eine Phase beendet werden soll */
        voted() {
            return this.votes + +this.status;
        },

        getProjectID() {
            console.log("Bu ne yav:");
            console.log(this.$route);
            return this.$route.params.project_id;
        },
    },
    /* watch:{
            $route(to="/projectlist"){
                this.showRightMenu = false;
            }
        } */
};
</script>
<style scoped>
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
    color: white;
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








