<template>
  <b-overlay :show="getLoadingStatus" opacity="1" rounded="sm">
    <b-container fluid class="p-0 m-0 appContainer">
      <MenueLeiste />
      <b-row class="page-container">
        <b-col
          v-if="getUserRole != 'lecturer'"
          class="linkeSeite m-0 p-0"
          md="2"
        >
          <b-row class="m-0 p-0">
            <b-col class="m-0">
              <TodoList v-if="inMainPage" />
              <TodoListForProjekt v-if="!inMainPage" />
            </b-col>
          </b-row>

          <b-row class="calendar-box">
            <b-col class="d-flex m-0">
              <Kalender />
            </b-col>
          </b-row>
        </b-col>

        <b-col class="mainContent m-0 p-0">
          <router-view :key="$route.path"></router-view>
        </b-col>
        <!-- Sobald der Nutzer auf die Projektliste geht, blendet er 
        die Komponente SeitenNavigation aus . Siehe https://stackoverflow.com/questions/56681106/vue-hide-view-components-conditionally-based-on-url-->
        <b-col
          v-if="!inMainPage"
          class="d-flex flex-column justify-content-between p-0 m-0 rechtseite"
          md="1"
        >
          <b-row>
            <b-col class="m-0">
              <SeitenNavigation />
            </b-col>
          </b-row>
        </b-col>
        <b-col v-if="inProjectList" class="mainpageRechtseite" md="3">
          <ProjectForm />
        </b-col>
      </b-row>
      <Footer />
    </b-container>
  </b-overlay>
</template>
<script>
import SeitenNavigation from "@/components/sidebarRight/SeitenNavigation.vue";
import ProjectForm from "@/components/ProjectForm";

import TodoList from "@/components/sidebarLeft/TodoList.vue";
import TodoListForProjekt from "@/components/sidebarLeft/TodoListForProjekt.vue";
import MenueLeiste from "@/components/shared/MenueLeiste.vue";
import Kalender from "@/components/sidebarLeft/Kalender.vue";
import Footer from "@/components/shared/Footer.vue";

export default {
  props: {
    showRightMenu: Boolean,
  },
  components: {
    SeitenNavigation,
    ProjectForm,
    Footer,
    TodoList,
    MenueLeiste,
    Kalender,
    TodoListForProjekt,
  },
  data() {
    return {};
  },
  methods: {
    closeMenu() {
      this.showMenu = false;
    },
  },
  computed: {
    account() {
      return this.$store.state.sparky_api.account;
    },
    getLoadingStatus() {
      return this.$store.state.loadingStatus;
    },

    /**
     * returns True if we are on these pages: projektList.vue, einstellungen.vue, profil.vue
     */
    inMainPage() {
      let result = false;
      if (
        (this.$route.name === "ProjectList") |
        (this.$route.name === "Profil") |
        (this.$route.name === "Einstellungen")
      ) {
        result = true;
      }
      return result;
    },

    inProjectList() {
      let result = false;
      this.$route.name === "ProjectList" ? (result = true) : (result = false);
      return result;
    },
    inProfil() {
      let result = false;
      this.$route.name === "Profil" ? (result = true) : (result = false);
      return result;
    },
    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },
  },
  beforeMount() {
    this.$store.dispatch("drupal_api/loadTokensfromSessionStorage");
  },
};
</script>
<style>
.appContainer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.v-card__title,
.v-card__subtitle,
.v-card__text {
  color: white;
}

.row {
  width: 100% !important;
  margin: 0 !important;
}
.page-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem !important;
  flex: 1;
}
@media (max-width: 765px) {
  .page-container {
    flex-wrap: wrap-reverse !important;
  }
}
.linkeSeite {
  min-width: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.rechtseite {
  min-width: 25rem;
}
.mainpageRechtseite {
  min-width: 25rem;
}
.mainContent {
  padding: 0 !important;
  min-width: 25rem;
  flex: 1;
  width: 100%;
}
.postfach {
  text-align: center;
  display: flex;
  justify-content: space-evenly;
}
.chat {
  text-align: center;
}
.login {
  margin-top: 25rem;
}
.untereLeiste {
  height: 100%;
  border: 1px solid black;
  margin: 0;
}
</style>