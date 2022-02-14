<template>
  <div class="home">
    <b-alert show
      >Die Forums-Funktionalität wird zur Zeit noch erstellt!</b-alert
    >
  </div>
</template>

<script>
import CategoryList from "@/components/forum/CategoryList";

export default {
  name: "Home",
  components: {
    CategoryList,
  },
  computed: {
    categories() {
      return Object.values(this.$store.state.categories);
    },
  },
};
</script>
<style>
h1 {
  color: #c93e37;
}
</style>