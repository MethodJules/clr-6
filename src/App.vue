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
    }
};
</script>

<style>
@import "assets/style.css";
@import "assets/loading.css";
</style>