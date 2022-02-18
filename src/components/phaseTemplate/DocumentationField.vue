<template>
  <div>
    <div @click="updatingDocumentation = true">
      <b-form-textarea
        :disabled="!updatingDocumentation"
        v-model="getDocumentation"
      >
      </b-form-textarea>
    </div>
    <div class="buttons">
      <b-button
        v-if="updatingDocumentation"
        @click="updateDocu(getDocumentation)"
        size="sm"
        >Speichern</b-button
      >
      <b-button
        v-if="updatingDocumentation"
        @click="updatingDocumentation = false"
        size="sm"
        >Abbrechen</b-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      updatingDocumentation: false,
    };
  },
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
  methods: {
    updateDocu(inDoku) {
      this.$store.dispatch("project_phases/updateDocumentation", inDoku);
    },
    update() {
      console.log("update docu");
      this.updatingDocumentation = true;
    },
  },
  async mounted() {
    this.$store.dispatch("project_phases/loadSinglePhaseFromBackend", {
      phase_number: this.$route.params.phase_number,
      projectId: this.$route.params.project_id,
    });
  },
};
</script>
<style scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>