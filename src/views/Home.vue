<template>
  <div class="home-container">
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
    sessionStorage.setItem("projectId", this.getProjectID);

    this.$store.dispatch("todo/loadToDoFromBackend");
    this.$zircle.setView("ReviewCircle");
    this.$store.dispatch("project/loadCurrentProject");
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