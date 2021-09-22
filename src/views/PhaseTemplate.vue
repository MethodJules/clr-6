<template>
  <div id="phase">
    <b-container fluid>
      <!-- gibt an in welcher Phase man sich befindet -->

      <b-row class="mb-4">
        <b-col cols="10">
          <!-- <h2>Gruppe Bilden</h2> -->
          <!-- <h2>{{ getPhaseName }}</h2> -->
          <h2>Phase: {{ phaseId }}</h2>
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
      <b-row>
        <b-tabs content-class="mt-3" fill>
          <b-tab title="Documentation" active> <DocumentationField /></b-tab>
          <b-tab title="Input Documents"> <InputDocuments /></b-tab>
          <b-tab title="Output Documents">
            <OutputDocuments />
          </b-tab>
          <b-tab title="Verwendete Tools">
            <UsedTools />
          </b-tab>
        </b-tabs>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import InputDocuments from "@/components/InputDocuments.vue";
import DocumentationField from "@/components/DocumentationField.vue";
import UsedTools from "@/components/UsedTools.vue";
import OutputDocuments from "@/components/OutputDocuments.vue";
import Assistent from "@/components/Assistent.vue";

export default {
  //props: {
  //    phase: String
  //},

  data() {
    return {
      phaseId: this.$route.params.phase_id,
      projectId: this.$route.params.project_id,
    };
  },

  /*     props: {
        inDoku: Object
    }, */
  components: {
    InputDocuments,
    DocumentationField,
    UsedTools,
    OutputDocuments,

    Assistent,
  },

  computed: {
    /* xphase() {
      return this.$store.state.phases.phases.find(
        (phase) => phase.phase_id === this.$route.params.phase_id
      ); */
    //},

    getPhaseName() {
      return this.$store.state.phases.current_phase.phase_name;
    },
  },

  async mounted() {
    //this.$store.dispatch('phases/loadSinglePhaseFromState', {phaseId: this.$route.params.phase_id})
    this.$store.dispatch("phases/loadSinglePhaseFromBackend", {
      phaseId: this.$route.params.phase_id,
      projectId: this.$route.params.project_id,
    });

    //this.$store.dispatch("inputDocuments/loadInputdocumentsFromBackend");

    this.$store.state.phases.current_phase.phase_name;
    console.log(this.$store.state.phases.current_phase.phase_name);
    console.log(this.$store.state.phases.current_phase);
    console.log(this.$route.params.phase_id);
  },
};
</script>
<style scoped>
.tabs {
  width: 100%;
}
</style>