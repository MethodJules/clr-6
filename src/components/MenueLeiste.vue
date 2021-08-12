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
      <b-navbar-nav>
        <b-nav-item to="/">
          <b-icon icon="house-fill" to="/">Startseite </b-icon></b-nav-item
        >
      </b-navbar-nav>
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/profil">Profil</b-nav-item>
        </b-navbar-nav>

        <template v-if="!startpage">
          <b-navbar-nav>
            <b-nav-item
              :to="{
                name: 'Projektbeschreibung',
                params: { project_id: this.$route.params.project_id },
              }"
              >Projektbeschreibung</b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item to="/home:project_id">Dashboard</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item to="/forum">Projektforum</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item to="/groupmanagement">Gruppenmanagement</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item to="/concept">Concept</b-nav-item>
          </b-navbar-nav>
        </template>

        <b-navbar-nav>
          <b-nav-item to="/einstellungen">Einstellungen</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="!startpage">
          <b-input-group size="sm" class="mb-2">
            <b-input-group-prepend is-text>
              <b-link
                :to="{ name: 'ProjectSearch', params: { keyword2: keyword2 } }"
              >
                <b-icon icon="search"></b-icon>
              </b-link>
            </b-input-group-prepend>
            <b-form-input
              type="search"
              placeholder="Projekte durchsuchen"
              v-model="keyword2"
            ></b-form-input>
          </b-input-group>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav>
        <b-button @click="logout()">
          <b-icon icon="box-arrow-right"></b-icon
        ></b-button>
      </b-navbar-nav>
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
  data() {
    return {
      schlagwort: "Hallo",
      keyword2: "",
    };
  },
  methods: {
    logout() {
      //wieso ist state.csrf_token bei aufruf von logout in drupal_api undefined
      //in dieser Komponente den csrf_token aus drupal_api state zu holen funktioniert aber wiederum
      this.$store.dispatch("drupal_api/logoutDrupal");
    },
  },
  computed: {
    startpage() {
      return this.$route.name === "ProjectList";
    },
  },
};
</script>
