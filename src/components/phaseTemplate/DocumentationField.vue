<template>
  <div>
    <div id="docTextArea">
      <b-form-textarea
        @blur="handleBlur"
        @focus="handleFocus"
        v-model="getDocumentation"
        @click="updatingDocumentation = true"
        ref="textArea"
      >
      </b-form-textarea>
    </div>
    <div class="buttons" v-if="updatingDocumentation">
      <b-button @click="updateDocu(getDocumentation)" size="sm"
        >Speichern</b-button
      >
      <b-button @click="cancel()" size="sm">Abbrechen</b-button>
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
      this.updatingDocumentation = false;
    },
    handleBlur(val) {
      if (!val.relatedTarget) {
        val ? (this.updatingDocumentation = false) : "";
      }
    },
    handleFocus(val) {
      val ? (this.updatingDocumentation = true) : "";
    },
    cancel() {
      this.updatingDocumentation = false;
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