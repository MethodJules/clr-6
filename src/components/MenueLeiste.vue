<template>
  <div>
    <b-navbar
      toggleable="lg"
      variant="secondary"
      type="dark"
      class="py-4"
      sticky
    >
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
      <b-navbar-brand>CLR Tool</b-navbar-brand>
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/profil">Profil</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/settings">Einstellungen</b-nav-item>
        </b-navbar-nav>
        <div v-if="!startpage">
          <b-row>
            <!-- <b-navbar-nav>
                                <b-nav-item to="/">Startseite</b-nav-item>
                            </b-navbar-nav> -->
            <b-navbar-nav>
              <b-nav-item to="/project">Projektbeschreibung</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item to="/forum">Projektforum</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item to="/groupmanagement">Gruppenmanagement</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item to="/home">Dashboard</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item to="/projectlist">Startseite</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item to="/projectsearch">Projektsuche</b-nav-item>
            </b-navbar-nav>
          </b-row>
        </div>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style scoped>
.navbar-dark .navbar-nav .nav-link {
  font-size: 1.2em;
}
.navbar-dark .navbar-nav .nav-link:active {
  color: white !important;
}

.navbar-dark .navbar-brand {
  font-size: 1.6em !important;
}
</style>
<script>
export default {
  computed: {
    startpage() {
      return this.$route.name === "ProjectList";
    },
  },
};
</script>
