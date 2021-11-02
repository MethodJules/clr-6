<template>
    <b-container>
        <b-col>
            <h2>Reflexion zu Phase: {{ phaseId }}</h2>
        </b-col>

        <b-card border-variant="primary">
            <b-tabs content-class="mt-3">
                <b-tab title="Ich" @click="loadReflexion(ichSicht)">
                    <Reflexion :sicht="ichSicht"> </Reflexion>
                </b-tab>

                <b-tab
                    title="Gruppe & Zusammenarbeit"
                    @click="loadReflexion(gruppeSicht)"
                >
                    <Reflexion :sicht="gruppeSicht"> </Reflexion>
                </b-tab>

                <b-tab
                    title="Fachlicher Kontext"
                    @click="loadReflexion(kontextSicht)"
                >
                    <Reflexion :sicht="kontextSicht"> </Reflexion>
                </b-tab>
            </b-tabs>
        </b-card>
    </b-container>
</template>

<script>
import Reflexion from "@/components/Reflexion.vue";

export default {
    components: {
        Reflexion,
    },
    data() {
        return {
            ichSicht: "325fd0af-838c-49f5-92d3-2fcc987e6137",
            gruppeSicht: "141a144e-9db2-4257-9fbf-36e77bc63119",
            kontextSicht: "e7b2630b-0f87-44d0-8dfb-f04f6f1c21ee",
            phaseId: this.$route.params.phase_number,
            phaseId: this.$route.params.reflexionsPhase,
        };
    },
    methods: {
        loadReflexion(sicht) {
            this.$store.dispatch("reflexion/loadReflexionFromBackend", sicht);
        },
    },
    computed: {},
};
</script>

<style scoped>
.card-body {
    padding: 1rem 0.5rem;
}

.card-body .col {
    padding: 0 !important;
}
</style>