<template>
  <div>
    <!-- Bildet den Review Zirkel ab und hat ein Dropdown menü der 
    den Nutzer zu den Reflexionen weiterleitet -->
    <z-canvas :views="$options.components">
      <ReviewCircle> </ReviewCircle>
    </z-canvas>
    <ReflexionAuswahl />
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
  mounted() {
    this.$zircle.config({
      mode: "mixed",
      style: {
        theme: "white",
      },
    });

    this.$zircle.setView("ReviewCircle");
  },
};
</script>
