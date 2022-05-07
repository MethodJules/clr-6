<template>
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
      currentProject.title | truncate(19)
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
            (inProjectList || inEinstellungen || inProfil || inProjectSearch) &&
            isUserStudent
          "
          :to="{
            name: 'StudentProfile',
            params: {
              user_internal_uid: user.uid,
            },
          }"
          >Profil</b-nav-item
        >

        <b-nav-item
          v-if="
            (inProjectList || inEinstellungen || inProfil || inProjectSearch) &&
            !isUserStudent
          "
          :to="{
            name: 'LecturerProfile',
            params: {
              user_internal_uid: user.uid,
            },
          }"
          >Profil</b-nav-item
        >
      </b-navbar-nav>

      <template
        v-if="!inProjectList & !(this.$route.params.project_id == undefined)"
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
        <b-navbar-nav v-if="user.role != 'lecturer'">
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
        <b-input-group size="sm">
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
            placeholder="Alle Projekte durchsuchen"
            v-model="keyword"
          ></b-form-input>
        </b-input-group>
      </b-navbar-nav>
    </b-collapse>
    <b-navbar-nav>
      <Postfach />
    </b-navbar-nav>

    <b-navbar-nav>
      <b-button @click="logout()">
        <b-icon icon="box-arrow-right"></b-icon
      ></b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";
import Postfach from "@/components/buttons/PostfachButton.vue";

export default {
  data() {
    return {
      keyword: "",
    };
  },

  components: {
    Postfach,
  },
  computed: {
    ...mapState("drupal_api", ["user"]),
    ...mapState("project", ["currentProject"]),

    showProfileSettingsLinks() {
      return (
        this.$route.name === "ProjectList" ||
        this.$route.name === "Profil" ||
        this.$route.name === "Einstellungen"
      );
    },

    inProjectSearch() {
      return this.$route.name === "ProjectSearch";
    },

    inProjectList() {
      return this.$route.name === "ProjectList";
    },
    inProfil() {
      return (
        this.$route.name === "StudentProfile" ||
        this.$route.name === "LecturerProfile"
      );
    },

    inEinstellungen() {
      return this.$route.name === "Einstellungen";
    },
    isUserStudent() {
      const user = JSON.parse(sessionStorage.getItem("current_user"));
      const userRole = user.role;
      return userRole == "student";
    },
  },
  methods: {
    logout() {
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
};
</script>
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
  padding: 0 1rem;
}
</style>