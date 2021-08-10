<template>
  <div>
    <!-- Bildet den Review Zirkel ab und hat ein Dropdown menü der 
    den Nutzer zu den Reflexionen weiterleitet -->
    <z-canvas :views="$options.components">
      <ReviewCircle> </ReviewCircle>
    </z-canvas>
    <ReflexionAuswahl />
    {{getProjectID}}
  </div>
</template>

<script>
import ReviewCircle from "@/components/ReviewCircle.vue";
import ReflexionAuswahl from "@/components/ReflexionAuswahl.vue";
export default {
  name: "Home",
  data(){
    return{
          projectId: this.$route.params.project_id,

    }
  },
  components: {
    ReviewCircle,
    ReflexionAuswahl,
  },
  computed: {
    getUserID(){
      return this.$route.params.user_id
    },
    getProjectID(){
      return this.$route.params.project_id
    }

    
    

  },
  mounted() {
    this.$zircle.config({
      mode: "mixed",
      style: {
        theme: "white",
      },
    });

    this.$zircle.setView("ReviewCircle");

        this.$store.dispatch('phases/loadPhasesFromBackend', {
        projectId: this.$route.params.project_id
      })

          this.$store.dispatch('project/loadCurrentProject', this.projectId)
  //To DO: Load all phases for this project with projectid and put it in state. click on specific phase loads the respective phase from the state

  },
};
</script>
