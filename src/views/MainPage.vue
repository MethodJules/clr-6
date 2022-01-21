<template>
  <!-- TODO: main page burada olacak -->
  <b-overlay :show="getLoadingStatus" rounded="sm">
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
              <TodoList />
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
          v-if="!inProjectList & !inProfil"
          class="d-flex flex-column justify-content-between p-0 m-0 rechtseite"
          md="1"
        >
          <b-row>
            <b-col class="m-0">
              <SeitenNavigation />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <Footer />
    </b-container>
  </b-overlay>
</template>
<script>
import SeitenNavigation from "@/components/SeitenNavigation.vue";
import TodoList from "@/components/TodoList.vue";
import MenueLeiste from "@/components/MenueLeiste.vue";
import Kalender from "@/components/Kalender.vue";
import Footer from "@/components/Footer.vue";

export default {
  props: {
    showRightMenu: Boolean,
  },
  components: {
    SeitenNavigation,
    Footer,
    TodoList,
    MenueLeiste,
    Kalender,
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
  margin-top: 1rem !important;
  flex: 1;
}
@media (max-width: 765px) {
  .page-container {
    flex-wrap: wrap-reverse !important;
  }
}
.linkeSeite {
  min-width: 25rem;
}

.rechtseite {
  min-width: 25rem;
}
.mainContent {
  padding: 0 !important;
  min-width: 25rem;
  /* min-height: 80vh; */
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