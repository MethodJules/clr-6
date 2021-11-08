<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "App",
    created() {
      this.$store.dispatch("assistent/getData");
      this.$store.dispatch("phases/load_phases");
    }
};
</script>

<style>
@import "assets/style.css";
@import "assets/loading.css";
</style>