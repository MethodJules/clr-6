<template>
  <b-container fluid id="phase">
    <b-row class="phase-header">
      <h2>Phase: {{ current_phase.title }}</h2>
      <AssistentButton />
    </b-row>
    <b-overlay :show="tabElementsLoading" rounded="sm" opacity="0.8">
      <b-card>
        <b-card-text>
          <b-row>
            <!-- lazy loading allows dispatch methods in mounted hook of components to be synchronous -->
            <b-tabs content-class="mt-3" fill lazy>
              <b-tab title="Dokumentation" active>
                <DocumentationField />
              </b-tab>
              <b-tab title="Input"> <InputDocuments /></b-tab>
              <b-tab title="Output">
                <OutputDocuments />
              </b-tab>
              <b-tab title="Verwendete Tools">
                <UsedTools />
              </b-tab>
            </b-tabs>
          </b-row>
          <PhaseTemplateButtons></PhaseTemplateButtons>
        </b-card-text>
      </b-card>
      <template #overlay>
        <div class="text-center">
          <!-- <b-icon icon="stopwatch" font-scale="2" animation="cylon"></b-icon> -->
          <b-icon icon="globe" font-scale="3" animation="cylon"></b-icon>
        </div>
      </template>
    </b-overlay>
  </b-container>
</template>
<script>
import InputDocuments from "@/components/phaseTemplate/InputDocuments.vue";
import DocumentationField from "@/components/phaseTemplate/DocumentationField.vue";
import UsedTools from "@/components/phaseTemplate/UsedTools.vue";
import OutputDocuments from "@/components/phaseTemplate/OutputDocuments.vue";
import AssistentButton from "@/components/buttons/AssistentButton.vue";
import PhaseTemplateButtons from "@/components/phaseTemplate/PhaseTemplateButtons.vue";
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {};
  },

  components: {
    InputDocuments,
    UsedTools,
    OutputDocuments,
    AssistentButton,
    PhaseTemplateButtons,
    DocumentationField,
  },

  computed: {
    ...mapGetters({
      tabElementsLoading: "getTabElementsLoading",
    }),
    ...mapState("project_phases", ["current_phase"]),

    getDocumentation: {
      get() {
        return this.$store.state.project_phases.current_phase.documentationText;
      },
      set(value) {
        this.$store.commit("project_phases/UPDATE_DOCUMENTATION", value);
      },
    },
  },
  mounted() {
    // We dont need it. But I am keeping it for a while to be sure that it is not needed  06.02.2022
    // this.$store.dispatch("project_phases/loadSinglePhaseFromBackend", {
    //   phase_number: this.$route.params.phase_number,
    //   projectId: this.$route.params.project_id,
    // });
  },
};
</script>
<style scoped>
.phase-header {
  display: flex;
  justify-content: space-between;
}
.tabs {
  width: 100%;
}
</style>