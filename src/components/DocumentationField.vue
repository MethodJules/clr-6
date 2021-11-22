<template>
  <b-form-textarea disabled v-model="getDocumentation"></b-form-textarea>
</template>
<script>
//import TemplateButtons from "./TemplateButtons.vue";
export default {
  components: {
    //TemplateButtons,
  },

  data() {
    return {
      //inDoku: {
      //documentationText: " ",
      //},
      //documentationList: null,
    };
  },

  methods: {},

  computed: {
    getDocumentation: {
      get() {
        return this.$store.state.project_phases.current_phase.documentationText;
      },
      set(value) {
        this.$store.commit("project_phases/UPDATE_DOCUMENTATION", value);
      },
    },
  },

  async mounted() {
    this.$store.dispatch("project_phases/loadSinglePhaseFromBackend", {
      phaseId: this.$route.params.phase_number,
      projectId: this.$route.params.project_id,
    });
  },
};
</script>