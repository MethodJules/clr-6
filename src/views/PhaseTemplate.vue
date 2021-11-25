<template>
  <div id="phase">
    <b-container fluid>
      <!-- gibt an in welcher Phase man sich befindet -->

      <b-row class="mb-4">
        <b-col cols="10">
          <!-- <h2>Gruppe Bilden</h2> -->
          <!-- <h2>{{ getPhaseName }}</h2> -->
          <h2>Phase: {{ getPhaseName }}</h2>
          <!--  <h2>{{ projectId }}</h2>
                    <h2>Phase: {{ xphase.phase_name }}</h2>  -->
        </b-col>
        <b-col cols="2" class="d-flex align-center">
          <!-- Greift auf die Assistent Komponente -->
          <Assistent />
        </b-col>
      </b-row>

      <!-- It is hard to make it responsive when all of these on the page
            They take too much place and we need to make a detailed page for mobile. 
            Thats why I have changed it to tabs and hide them when they are not needed.
            Is it Okay????  -->
      <b-card border-variant="primary">
        <b-card-text>
          <b-row>
            <!--               lazy loading allows dispatch methods in mounted hook of components to be synchronous -->
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
    </b-container>
  </div>
</template>
<script>
import InputDocuments from "@/components/InputDocuments.vue";
import DocumentationField from "@/components/DocumentationField.vue";
import UsedTools from "@/components/UsedTools.vue";
import OutputDocuments from "@/components/OutputDocuments.vue";
import Assistent from "@/components/Assistent.vue";
import PhaseTemplateButtons from "@/components/PhaseTemplateButtons.vue";

export default {
  data() {
    return {
      phaseId: this.$route.params.phase_number,
      projectId: this.$route.params.project_id,
    };
  },

  components: {
    InputDocuments,
    UsedTools,
    OutputDocuments,
    Assistent,
    PhaseTemplateButtons,
    DocumentationField,
  },

  computed: {
    getPhaseName() {
      return this.$store.state.project_phases.current_phase.title;
    },

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
      phase_number: this.$route.params.phase_number,
      projectId: this.$route.params.project_id,
    });
  },
};
</script>
<style scoped>
.tabs {
  width: 100%;
}
</style>