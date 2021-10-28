<template>
  <div>
    <div v-if="!startpage">
      <div v-if="!profil">
        <div v-if="!einstellungen">
          <div v-if="!projektsuche">
            <b-link
              v-for="(phase, i) in phasen"
              :key="i"
              :disabled="!phase.status"
              :to="{
                name: 'PhaseTemplate',
                params: { phase_id: i, project_id: getProjectID },
              }"
              class="btn btn-danger mb-2 btn-block text-left"
            >
              <b-icon :icon="phase.iconType" class="mr-3"></b-icon>
              {{ phase.title }}
            </b-link>

            <!-- wenn man sich bereits in einer phase befindet ist es bisher nciht möglich in eine andere phase zu wechseln -->

            <SeitenNavigationButtons @statusChange="changeStatus($event)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SeitenNavigationButtons from "@/components/SeitenNavigationButtons.vue";
export default {
  name: "App",
  data: function () {
    return {
      isDisabled: [false, false, false, false, false, false, false], // it was hard to control from another component.
      votes: 2,
      status: 0,
      gruppe: 1,
      phasen: [
        {
          id: "0",
          title: "Gruppe Bilden",
          status: true,
          to: "PhaseTemplate",
          iconType: "people",
        },
        {
          id: "1",
          title: "Ziel & Umfang definieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "signpost-split",
        },
        {
          id: "2",
          title: "Konzepte & Definitionen identifizieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "diagram3",
        },
        {
          id: "3",
          title: "Literatur Suchen",
          status: true,
          to: "PhaseTemplate",
          iconType: "book",
        },
        {
          id: "4",
          title: "Daten Extrahieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "arrow-left-right",
        },
        {
          id: "5",
          title: "Literatur Analysieren & Syntheisieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "vector-pen",
        },
        {
          id: "6",
          title: "Ergebnisse Kommunizieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "card-checklist",
        },
        {
          id: "7",
          title: "Gruppe Auflösen",
          status: true,
          to: "PhaseTemplate",
          iconType: "columns-gap",
        },
      ],
    };
  },
  components: {
    SeitenNavigationButtons,
  },

  methods: {
    changeStatus(phase) {
      this.phasen[phase.id].status = false;
    },
  },
  computed: {
    getProjectID() {
      return this.$route.params.project_id;
    },
    startpage() {
      return this.$route.name === "ProjectList";
    },
    profil() {
      return this.$route.name === "Profil";
    },

    einstellungen() {
      return this.$route.name === "Einstellungen";
    },
    projektsuche() {
      return this.$route.name === "ProjectSearch";
    },
  },
  /* watch:{
            $route(to="/projectlist"){
                this.showRightMenu = false;
            }
        } */
};
</script>
<style scoped>
.router-link-active {
  background: #c93e37 !important;
  color: white;
}

p {
  display: table-cell;
  vertical-align: middle;
}
.search {
  width: 30%;
  margin-left: 30%;
  position: absolute;
  bottom: 0;
  text-align: center;
  height: 8%;
  display: table;
  margin-top: 20px;
  color: white;
}
.viewSearch {
  background-color: #c93e37;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  height: 20%;
  display: table;
  margin-top: 20px;
}

.closeButton {
  background-color: #c93e37;
  position: absolute;
  right: 5px;
}
.forum {
  position: absolute;
  bottom: 0;
  margin-left: 65%;
  width: 30%;
  height: 60px;
  background-color: #c93e37;
  text-align: center;
  margin-bottom: 20px;
  display: table;
  cursor: pointer;
  color: white;
  border-radius: 50%;
}

.buttons {
  background-color: white;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  height: 12%;
  display: table;
  margin-top: 25px;
  cursor: pointer;
}
</style>








