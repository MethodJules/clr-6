<template>
    <div class="home-container">
        <!-- Bildet den Review Zirkel ab und hat ein Dropdown menü der 
    den Nutzer zu den Reflexionen weiterleitet -->
        <div class="canvas-container">
            <z-canvas :views="$options.components">
                <ReviewCircle> </ReviewCircle>
            </z-canvas>
        </div>
        <div class="reflexionsButton">
            <ReflexionAuswahl :projectId="getProjectID" />
        </div>
    </div>
</template>

<script>
import ReviewCircle from "@/components/ReviewCircle.vue";
import ReflexionAuswahl from "@/components/ReflexionAuswahl.vue";

export default {
    name: "Home",
    components: {
        ReviewCircle,
        ReflexionAuswahl,
    },
    computed: {
        getUserID() {
            return this.$route.params.user_id;
        },
        getProjectID() {
            return this.$route.params.project_id;
        },
    },

    mounted() {
        this.$zircle.config({
            mode: "mixed",
            style: {
                theme: "white",
            },
        });

        this.$store.dispatch("todo/loadToDoFromBackend", this.getProjectID);
        this.$zircle.setView("ReviewCircle");
        this.$store.dispatch("project/loadCurrentProject", this.getProjectID);
        this.$store.dispatch(
            "project_phases/loadPhasesFromBackend",
            this.$route.params.project_id
        );
    },
};
</script>

<style scoped>
.reflexionsButton {
    position: absolute;
    top: 90%;
}
.home-container {
    min-height: 75vh;
}
</style>