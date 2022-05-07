<template>
  <b-row class="buttons-container">
    <b-link :to="{ name: 'Home' }" class="btn btn-secondary"
      >Zum Dashboard</b-link
    >
    <b-modal
      id="documentation_edit_modal"
      title="Bearbeiten"
      cancel-title="Abbrechen"
    >
      <b-form-textarea
        id="documentation_edit_form_textarea"
        rows="6"
        v-model="getDocumentation"
        placeholder="Dokumentieren Sie ihre Arbeit hier"
      ></b-form-textarea>
      <b-button @click="updateDocu(getDocumentation)">Speichern</b-button>
    </b-modal>
    <b-button
      v-if="!isPhaseDone && user.role != 'lecturer'"
      @click="filterByPhase(phases[phase_number])"
      v-b-modal.modal-phase
      class="mb-phase"
    >
      Phase abschließen
    </b-button>
    <b-button
      v-if="isPhaseDone && user.role != 'lecturer'"
      v-b-modal.modal-phase
      class="mb-phase"
    >
      Phase wieder öffnen
    </b-button>
    <b-modal
      @ok="ok"
      id="modal-phase"
      title="Bist du dir sicher?"
      cancel-title="Abbrechen"
    >
      <div class="container" v-if="!isPhaseDone">
        <div>
          <strong>Hast du die folgenen Schritte abgeschlossen?</strong>
          <div>
            <ol>
              <li v-for="(task, i) in tasks" :key="i">
                {{ task }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </b-modal>
  </b-row>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      lastEntry_id: 2,
      tasks: [],
    };
  },
  methods: {
    ok() {
      this.$store.dispatch("project_phases/closePhase", {
        phase: this.$store.state.project_phases.current_phase,
        open_close_phase: !this.isPhaseDone,
      });
    },
    updateDocu(inDoku) {
      this.$store.dispatch("project_phases/updateDocumentation", inDoku);
    },

    filterByPhase(id) {
      const data = this.assistentData.filter(
        (item) => item.relationships.field_phase.data.id == id
      );
      if (data[0] == undefined) {
        this.body =
          "<p>Der Dozent hat hier noch keinen Hinweis eingegeben.</p>";
      } else {
        this.tasks = data[0].attributes.field_aufgaben;
      }
    },
  },
  async mounted() {},

  computed: {
    ...mapState("drupal_api", ["user"]),

    isPhaseDone() {
      return this.$store.state.project_phases.current_phase.abschluss;
    },
    getDocumentation: {
      get() {
        return this.$store.state.project_phases.current_phase.documentationText;
      },
      set(value) {
        this.$store.commit("project_phases/UPDATE_DOCUMENTATION", value);
      },
    },
    assistentData() {
      return this.$store.state.assistent.assistentData;
    },
    phase_number() {
      return this.$route.params.phase_number;
    },
    phases() {
      return this.$store.getters["phases/getPhasesIds"];
    },
  },
};
</script>
<style scoped>
.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem !important;
}
.buttons-container * {
  margin-right: 1rem;
  margin-bottom: 1rem;
  max-width: 15rem;
}
</style>