<template>
  <div>
    <b-navbar
      toggleable="lg"
      variant="secondary"
      type="dark"
      class="navbar-top"
      sticky
    >
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand
        v-if="inProjectList || inEinstellungen || inProfil || inProjectSearch"
        >eCLR Tool</b-navbar-brand
      >

      <b-navbar-brand v-else>{{
        getProjectName | truncate(19)
      }}</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/">
          <b-icon icon="house-fill" to="/">Startseite </b-icon></b-nav-item
        >
      </b-navbar-nav>

      <b-collapse id="nav-text-collapse" variant="secondary" is-nav>
        <b-navbar-nav>
          <!-- Es gibt kein Profil in router.. -->
          <b-nav-item
            v-if="
              inProjectList || inEinstellungen || inProfil || inProjectSearch
            "
            :to="{
              name: 'Profil',
              params: {
                user_internal_uid: this.getCurrentUserInternalUID,
              },
            }"
            >Profil</b-nav-item
          >
        </b-navbar-nav>

        <template
          v-if="!startpage & !(this.$route.params.project_id == undefined)"
        >
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
            <b-nav-item
              :to="{
                name: 'Home',
                params: {
                  project_id: this.$route.params.project_id,
                },
              }"
              >Dashboard</b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item
              :to="{
                name: 'Forum',
                params: {
                  project_id: this.$route.params.project_id,
                },
              }"
              >Projektforum</b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav v-if="getUserRole != 'lecturer'">
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
        </template>

        <b-navbar-nav
          v-if="inProjectList || inEinstellungen || inProfil || inProjectSearch"
        >
          <b-nav-item
            :to="{
              name: 'Einstellungen',
            }"
            >Einstellungen</b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav v-if="inProjectList || inEinstellungen || inProfil">
          <b-input-group size="sm" class="mb-2">
            <b-input-group-prepend is-text>
              <b-link
                :to="{
                  name: 'ProjectSearch',
                  params: { keyword: keyword },
                }"
              >
                <b-icon icon="search"></b-icon>
              </b-link>
            </b-input-group-prepend>
            <b-form-input
              type="search"
              placeholder="Projekte durchsuchen"
              v-model="keyword"
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
.navbar-top {
  padding: 1rem;
}
</style>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      keyword: " ",
      projectId: this.$route.params.project_id,
    };
  },
  methods: {
    logout() {
      //wieso ist state.csrf_token bei aufruf von logout in drupal_api undefined
      //in dieser Komponente den csrf_token aus drupal_api state zu holen funktioniert aber wiederum
      this.$store.dispatch("drupal_api/logoutDrupal").then(() => {
        this.makeToast();
      });
    },
    makeToast() {
      this.$root.$bvToast.toast(
        `Auf Wiedersehen ${this.$store.state.drupal_api.user.fullname}`,
        {
          title: "Bis zum nächsten Mal",
          variant: "info",
        }
      );
    },
  },

  computed: {
    ...mapGetters({ getUserRole: "drupal_api/getUserRole" }),

    showProfileSettingsLinks() {
      return (
        this.$route.name === "ProjectList" ||
        this.$route.name === "Profil" ||
        this.$route.name === "Einstellungen"
      );
    },
    getCurrentUserUUID() {
      return this.$store.state.profile.userData.uuid;
    },
    //pprovided user uid is taken from the state, where the currentuuser uid is saved, because this navigation should only lead to the own profile
    getCurrentUserInternalUID() {
      return this.$store.state.drupal_api.user.uid;
    },
    startpage() {
      return this.$route.name === "ProjectList";
    },
    inProjectList() {
      // console.log(this.$route.name);
      return this.$route.name === "ProjectList";
    },
    inProfil() {
      // console.log(this.$route.name);
      return this.$route.name === "Profil";
    },
    inProjectSearch() {
      // console.log(this.$route.name);
      return this.$route.name === "ProjectSearch";
    },
    inEinstellungen() {
      // console.log(this.$route.name);
      return this.$route.name === "Einstellungen";
    },

    getProjectName() {
      let projektname = this.$store.state.project.currentProject.title;

      // return this.$store.state.project.currentProject.title.slice(0, 15);
      return projektname;
    },
  },
  filters: {
    //truncates when the length of given value (project title) is longer than the given cutoff threshold
    truncate: function (value, cutoff) {
      if (value.length > cutoff) {
        return value.slice(0, cutoff) + "...";
      }
      return value;
    },
  },
};
</script>
