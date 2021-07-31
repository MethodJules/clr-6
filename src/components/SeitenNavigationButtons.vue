<template>
    <div>
        <div class="buttons-container">
            <div>
                <b-dropdown text="Phasen" right>
                    <b-dropdown-item
                        v-for="(phase, i) in phasen"
                        :key="i"
                        v-on:click="phaseAbschliessen(phase.id)"
                        >"{{ phase.title }}" abschließen
                    </b-dropdown-item>
                </b-dropdown>
            </div>
            <div>
                <b-button v-b-modal.modal-seitennavi> ?</b-button>
            </div>
            <Postfach />
            <ShowChat />
        </div>

        <b-modal id="modal-seitennavi" title="Phase abschließen">
            <p>
                Der Beendigung von Phase: "Gruppe bilden" haben {{ voted }}, von
                n Gruppenmitgliedern zugestimmt
            </p>
            <b-form-checkbox
                :id="gruppe"
                v-model="status"
                name="checkbox-1"
                value="1"
                unchecked-value="0"
                >Gib deeine Stimme ab: Soll diese Phase abgeschlossen
                werden?</b-form-checkbox
            >
            {{ status }}
            <p></p>
        </b-modal>
    </div>
</template>
<script>
import ShowChat from "@/views/ShowChat.vue";
import Postfach from "@/views/Postfach.vue";
export default {
    data() {
        return {
            phasen: [
                {
                    id: "0",
                    title: "Gruppe Bilden",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "",
                },
                {
                    id: "1",
                    title: "Ziel & Umfang definieren",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "",
                },
                {
                    id: "2",
                    title: "Konzepte & Definitionen identifizieren",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "",
                },
                {
                    id: "3",
                    title: "Literatur Suchen",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "",
                },
                {
                    id: "4",
                    title: "Daten Extrahieren",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "",
                },
                {
                    id: "5",
                    title: "Literatur Analysieren & Syntheisieren",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "",
                },
                {
                    id: "6",
                    title: "Ergebnisse Kommunizieren",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "",
                },
                {
                    id: "7",
                    title: "Gruppe Auflösen",
                    status: true,
                    to: "PhaseTemplate",
                    iconType: "",
                },
            ],
        };
    },
    components: {
        ShowChat,
        Postfach,
    },
    methods: {
        phaseAbschliessen(id) {
            this.phasen[id].status = false;
            this.$emit("statusChange", this.phasen[id]);
            console.log(this.phasen);
        },
    },
};
</script>
<style scoped>
.buttons-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
</style>