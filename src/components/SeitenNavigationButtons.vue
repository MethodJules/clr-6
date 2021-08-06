<template>
    <div>
        <div class="buttons-container">
            <div>
                <b-dropdown text="Phasen" right>
                    <b-dropdown-item
                        v-for="(phase, i) in phasen"
                        :key="i"
                        v-on:click="phaseAbschliessen(phase.id)"
                        ><b-icon :icon="phase.iconType" class="mr-3"></b-icon>
                        "{{ phase.title }}" abschließen
                    </b-dropdown-item>
                </b-dropdown>
            </div>

            <Postfach />
            <ShowChat />
        </div>
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