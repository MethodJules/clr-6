<template>
  <div>
    <b-dropdown text="Zur Reflexion" class="">
      <b-dropdown-item @click="loadCurrentPhase(0)"
        >Gruppe bilden</b-dropdown-item
      >
      <b-dropdown-item @click="loadCurrentPhase(1)"
        >Ziel & Umfang definieren</b-dropdown-item
      >
      <b-dropdown-item @click="loadCurrentPhase(2)"
        >Konzepte & Definitionen</b-dropdown-item
      >
      <b-dropdown-item @click="loadCurrentPhase(3)"
        >Literatur suchen</b-dropdown-item
      >
      <b-dropdown-item @click="loadCurrentPhase(4)"
        >Daten extrahieren</b-dropdown-item
      >
      <b-dropdown-item @click="loadCurrentPhase(5)"
        >Analyse & Synthese</b-dropdown-item
      >
      <b-dropdown-item @click="loadCurrentPhase(6)"
        >Ergebnisse kommunizieren</b-dropdown-item
      >
      <b-dropdown-item @click="loadCurrentPhase(7)"
        >Gruppe auflösen</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    projectId: String,
  },
  computed: {
    getProjectID() {
      console.log("Bu ne yav:");
      console.log(this.$route);
      console.log(this.projectId);
      //return this.$route.params.project_id;
      return this.projectId;
    },
  },
  methods: {
    loadCurrentPhase(phaseid) {
      this.$store.dispatch("project/loadCurrentProject", this.projectId);
      console.log(this.projectId);
      this.$store.dispatch("project_phases/loadSinglePhaseFromBackend", {
        phaseId: phaseid,
        projectId: this.projectId,
      });
      this.$router.push({
        name: "ReflexionView",
        params: { reflexionsPhase: phaseid, project_id: this.getProjectID },
      });
    },
  },
};
</script>