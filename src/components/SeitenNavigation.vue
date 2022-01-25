<template>
  <div>
    <b-link
      v-for="(phase, i) in phasen"
      :key="i"
      :disabled="!phase.status"
      :to="{
        name: 'PhaseTemplate',
        params: { phase_number: i, project_id: getProjectID },
      }"
      class="btn btn-danger mb-2 btn-block text-left"
    >
      <b-icon :icon="phase.iconType" class="mr-3"></b-icon>
      {{ phase.title }}
    </b-link>

    <ChatAdvanced />
    <!-- <SeitenNavigationButtons /> -->
  </div>
</template>
<script>
import SeitenNavigationButtons from "@/components/SeitenNavigationButtons.vue";
import ChatAdvanced from "@/components/ChatAdvanced.vue";
export default {
  name: "App",
  data: function () {
    return {
      status: 0,
      phasen: [
        {
          id: "0",
          title: "Gruppe bilden",
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
          title: "Literatur suchen",
          status: true,
          to: "PhaseTemplate",
          iconType: "book",
        },
        {
          id: "4",
          title: "Daten extrahieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "arrow-left-right",
        },
        {
          id: "5",
          title: "Literatur analysieren & synthetisieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "vector-pen",
        },
        {
          id: "6",
          title: "Ergebnisse kommunizieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "card-checklist",
        },
        {
          id: "7",
          title: "Gruppe auflösen",
          status: true,
          to: "PhaseTemplate",
          iconType: "columns-gap",
        },
      ],
    };
  },
  components: {
    SeitenNavigationButtons,
    ChatAdvanced,
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
  },
};
</script>
<style scoped>
</style>








