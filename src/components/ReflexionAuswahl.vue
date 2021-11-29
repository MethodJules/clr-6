<template>
    <div v-if="getUserRole != 'lecturer'">
        <b-dropdown text="Zur Reflexion" class="">
            <b-dropdown-item @click="loadCurrentPhase(0)"
                >Gruppe bilden</b-dropdown-item
            >
            <b-dropdown-item @click="loadCurrentPhase(1)"
                >Ziel & Umfang definieren</b-dropdown-item
            >
            <b-dropdown-item @click="loadCurrentPhase(2)"
                >Konzepte & Definitionen</b-dropdown-item
            >
            <b-dropdown-item @click="loadCurrentPhase(3)"
                >Literatur suchen</b-dropdown-item
            >
            <b-dropdown-item @click="loadCurrentPhase(4)"
                >Daten extrahieren</b-dropdown-item
            >
            <b-dropdown-item @click="loadCurrentPhase(5)"
                >Analyse & Synthese</b-dropdown-item
            >
            <b-dropdown-item @click="loadCurrentPhase(6)"
                >Ergebnisse kommunizieren</b-dropdown-item
            >
            <b-dropdown-item @click="loadCurrentPhase(7)"
                >Gruppe auflösen</b-dropdown-item
            >
        </b-dropdown>
    </div>
</template>
<script>
export default {
    props: {
        projectId: String,
    },

    computed: {
        getUserRole() {
            return this.$store.state.drupal_api.user.role;
        },
    },

    methods: {
        loadCurrentPhase(phase_number) {
            this.$store.dispatch("project/loadCurrentProject", this.projectId);
            this.$store.dispatch("project_phases/loadSinglePhaseFromBackend", {
                phase_number: phase_number,
                projectId: this.projectId,
            });
            this.$router.push({
                name: "ReflexionView",
                params: {
                    reflexionsPhase: phase_number,
                    project_id: this.projectId,
                },
            });
        },
    },
};
</script>