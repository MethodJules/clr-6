<template>
  <b-tabs content-class="mt-3">
    <b-tab title="Ich" @click="loadReflexion(ichSicht)">
      <Reflexion :sicht="ichSicht"> </Reflexion>
    </b-tab>

    <b-tab title="Gruppe & Zusammenarbeit" @click="loadReflexion(gruppeSicht)">
      <Reflexion :sicht="gruppeSicht"> </Reflexion>
    </b-tab>

    <b-tab title="Fachlicher Kontext" @click="loadReflexion(kontextSicht)">
      <Reflexion :sicht="kontextSicht"> </Reflexion>
    </b-tab>
  </b-tabs>
</template>

<script>
import Reflexion from "@/components/Reflexion.vue";

export default {
  components: {
    Reflexion,
  },
  data() {
    return {
      ichSicht: "325fd0af-838c-49f5-92d3-2fcc987e6137",
      gruppeSicht: "141a144e-9db2-4257-9fbf-36e77bc63119",
      kontextSicht: "e7b2630b-0f87-44d0-8dfb-f04f6f1c21ee",
    };
  },
  methods: {
    loadReflexion(sicht) {
      this.$store.dispatch("reflexion/loadReflexionFromBackend", sicht);
    },
  },
  computed: {
    getProjectID() {
      return this.$route.params.project_id;
    },
  },

  async mounted() {
    this.$store.dispatch("todo/loadToDoFromBackend", this.getProjectID);
  },
};
</script>