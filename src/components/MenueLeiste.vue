<template>
  <div>
    <b-navbar
      toggleable="lg"
      variant="secondary"
      type="dark"
      class="navbar-top"
      sticky
    >

      <!-- Always show branding and Home button. -->
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
      <b-navbar-brand>eCLR Tool</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item to="/">
          <b-icon icon="house-fill" to="/">Startseite</b-icon></b-nav-item
        >
      </b-navbar-nav>

      <!-- If on startpage/profile page/settings: Show links to profile and settings and project search -->
      <b-collapse id="nav-text-collapse" variant="secondary" is-nav>
        <b-navbar-nav>
          <!-- Es gibt kein Profil in router.. -->
          <b-nav-item
            v-if="inProjectList || inEinstellungen || inProfil"
            :to="{
              name: 'Profil',
              params: {
                user_internal_uid: this.getCurrentUserInternalUID,
              },
            }"
            >Profil</b-nav-item
          >
        </b-navbar-nav>

        <div
          v-if="!startpage & !(this.$route.params.project_id == undefined)"
        >

          <b-navbar-nav>
            <b-nav-item
              :to="{
                name: 'Home',
                params: {
                  project_id: this.$route.params.project_id,
                },
              }"
              >Dashboard</b-nav-item
            >

            <b-nav-item
              :to="{
                name: 'Forum',
                params: {
                  project_id: this.$route.params.project_id,
                },
              }"
              >Projektforum</b-nav-item
            >

            <b-nav-item
              :to="{
                name: 'Groupmanagement',
                params: {
                  project_id: this.$route.params.project_id,
                },
              }"
              >Gruppenmanagement</b-nav-item
            >
          </b-navbar-nav>
        </div>

        <b-navbar-nav v-if="inProjectList || inEinstellungen || inProfil">
          <b-nav-item
            :to="{
              name: 'Einstellungen',
            }"
            >Einstellungen</b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav v-if="!startpage">
          <b-input-group size="sm" class="mb-2">
            <b-input-group-prepend is-text>
              <b-link
                :to="{
                  name: 'ProjectSearch',
                  params: { keyword2: keyword2 },
                }"
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
        
        <!-- If in a project: Show links to project-related pages, but not to profile and settings and project search (workaround for Bug 8). -->
        <div v-if="(showProjectLinks)">
          <b-navbar-nav>
            <b-nav-item to="/home">Dashboard</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item
              :to="{
                name: 'Projektbeschreibung',
                params: {
                  project_id: this.$route.params.project_id,
                },
              }"
              >Projektbeschreibung</b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item to="/forum">Projektforum</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item to="/groupmanagement">Gruppenmanagement</b-nav-item>
          </b-navbar-nav>
        </div>

      </b-collapse>
        <!-- Always show logout. -->


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
.navbar-top {
  padding: 1rem;
}
</style>
<script>
export default {
  data() {
    return {
      schlagwort: "Hallo",
      keyword2: "",
      projectId: this.$route.params.project_id,
    };
  },
  methods: {
    logout() {
      //wieso ist state.csrf_token bei aufruf von logout in drupal_api undefined
      //in dieser Komponente den csrf_token aus drupal_api state zu holen funktioniert aber wiederum
      this.$store.dispatch("drupal_api/logoutDrupal");
      this.makeToast();
    },
    makeToast() {
      this.$root.$bvToast.toast(
        `Auf Wiedersehen ${this.$store.state.drupal_api.user.name}`,
        {
          title: "Bis zum nächsten Mal",
          autoHideDelay: 4000,
          variant: "info",
        }
      );
    },
  },

  computed: {
    showProfileSettingsLinks() {
      return (this.$route.name === "ProjectList" || this.$route.name === "Profil" || this.$route.name === "Einstellungen");
    },
    getCurrentUserUUID() {
      return this.$store.state.profile.userData.uuid;
    },
    //pprovided user uid is taken from the state, where the currentuuser uid is saved, because this navigation should only lead to the own profile
    getCurrentUserInternalUID() {
      return this.$store.state.drupal_api.user.uid;
    },
    inProjectList() {
      // console.log(this.$route.name);
      return this.$route.name === "ProjectList";
    },
    inProfil() {
      // console.log(this.$route.name);
      return this.$route.name === "Profil";
    },
    inEinstellungen() {
      // console.log(this.$route.name);
      return this.$route.name === "Einstellungen";
    },
  },
};
</script>
