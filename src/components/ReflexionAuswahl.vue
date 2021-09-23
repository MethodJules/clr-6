<template>
    <div>
        <b-dropdown text="Zur Reflexion" class="">
            <b-dropdown-item
                @click="test()"
                link
                :to="{
                    name: 'ReflexionView',
                    params: { reflexionsPhase: 0, project_id: getProjectID },
                }"
                >Gruppe bilden</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{
                    name: 'ReflexionView',
                    params: { reflexionsPhase: 1, project_id: getProjectID },
                }"
                >Ziel & Umfang definieren</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{
                    name: 'ReflexionView',
                    params: { reflexionsPhase: 2, project_id: getProjectID },
                }"
                >Konzepte & Definitionen</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{
                    name: 'ReflexionView',
                    params: { reflexionsPhase: 3, project_id: getProjectID },
                }"
                >Literatur suchen</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{
                    name: 'ReflexionView',
                    params: { reflexionsPhase: 4, project_id: getProjectID },
                }"
                >Daten extrahieren</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{
                    name: 'ReflexionView',
                    params: { reflexionsPhase: 5, project_id: getProjectID },
                }"
                >Analyse & Synthese</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{
                    name: 'ReflexionView',
                    params: { reflexionsPhase: 6, project_id: getProjectID },
                }"
                >Ergebnisse kommunizieren</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{
                    name: 'ReflexionView',
                    params: { reflexionsPhase: 7, project_id: getProjectID },
                }"
                >Gruppe auflösen</b-dropdown-item
            >
        </b-dropdown>
    </div>
</template>
<script>
export default {
    computed: {
        getProjectID() {
            console.log("Bu ne yav:");
            console.log(this.$route);
            return this.$route.params.project_id;
        },
        methodes: {
            test() {
                alert();
            },
        },
    },
};
</script>

