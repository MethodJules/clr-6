<template>
  <div>
    <!-- Bildet den Review Zirkel ab und hat ein Dropdown menü der 
    den Nutzer zu den Reflexionen weiterleitet -->
    <z-canvas :views="$options.components">
      <!-- <z-canvas :views="myViews"> -->
      <ReviewCircle> </ReviewCircle>
    </z-canvas>
    <ReflexionAuswahl :projectId="getProjectID" />
    {{ getProjectID }}
  </div>
</template>

<script>
import ReviewCircle from "@/components/ReviewCircle.vue";
import ReflexionAuswahl from "@/components/ReflexionAuswahl.vue";

export default {
  data() {
    return {
      myViews: {
        ReviewCircle,
      },
    };
  },
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
