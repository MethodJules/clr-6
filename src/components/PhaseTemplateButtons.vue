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
      v-if="getUserRole != 'lecturer'"
      v-b-modal.documentation_edit_modal
      >Dokumentation bearbeiten</b-button
    >
    <!-- <b-link :to="{name: 'Concept'}" class="btn btn-outline-dark btn-block mb-2">Dokumentation bearbeiten</b-link>   -->
    <!-- <div>{{inDoku.documentationText}}</div> -->
    <!-- v-model="inDoku.documentation" Zeile 15 -->
    <b-button
      v-if="!isPhaseDone && getUserRole != 'lecturer'"
      @click="filterByPhase(phases[phase_number])"
      v-b-modal.modal-phase
      class="mb-phase"
    >
      Phase abschließen
    </b-button>
    <b-button
      v-if="isPhaseDone && getUserRole != 'lecturer'"
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
                  <li v-for="(task, i) in tasks" :key="i">{{ task }}</li>
                </ol>
            </div>
        </div>
      </div>
    </b-modal>
  </b-row>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      lastEntry_id: 2,
      tasks: []
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
    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },
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
    }
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

footer {
  padding: 8px 15px;
  background: #76dbae;
  border-radius: 3px;
}

.todo-list {
  padding: 8px 0;
}

.todo-list .list:hover {
  background: #f7fcfa;
}

.todo-list .list {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.todo-list .list .text {
  padding: 0 8px;
  height: 35px;
  line-height: 35px;
  margin: 6px 0;
  cursor: default;
  flex: 1;
}

.todo-list .list .text.erledigt {
  text-decoration: line-through;
}

.eingabe {
  margin: 6px 0;
  position: relative;
  border: 1px solid #e4f5ef;
  flex: 1;
}

.eingabe:focus-within .inputcontainer {
  background: #fff;
}

.eingabe .inputcontainer {
  background: #f7fcfa;
  padding: 0 15px;
  transition: background 0.3s;
}

.eingabe .inputcontainer input {
  height: 35px;
  background: 0 0;
  border: none;
  color: #2c3e50;
  display: block;
  font-family: inherit;
  font-size: 16px;
  line-height: 16px;
  outline: 0;
  padding: 0;
  position: relative;
  width: 100%;
  z-index: 1;
}

.eingabe .border {
  background: #42b983;
  transition: all 0.18s;
  bottom: -1px;
  height: 2px;
  left: 30%;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 30%;
}

.eingabe:focus-within .border {
  left: 0;
  right: 0;
  opacity: 1;
}

.material-checkbox {
  position: relative;
  display: inline-block;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  font-size: 14px;
  line-height: 18px;
}

.material-checkbox > input {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  position: absolute;
  z-index: -1;
  left: -5px;
  top: -5px;
  display: block;
  margin: 0;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background-color: rgba(0, 0, 0, 0.42);
  outline: none;
  opacity: 0;
  transform: scale(1);
  -ms-transform: scale(0); /* Graceful degradation for IE */
  transition: opacity 0.5s, transform 0.5s;
}

.material-checkbox > input:checked {
  background-color: #2196f3;
}

.material-checkbox > input:disabled {
  opacity: 0;
}

.material-checkbox > input:disabled + span {
  cursor: initial;
}

.material-checkbox > span::before {
  content: "";
  display: inline-block;
  margin-right: 15px;
  border: solid 2px rgba(0, 0, 0, 0.42);
  border-radius: 2px;
  width: 14px;
  height: 14px;
  vertical-align: -4px;
  transition: border-color 0.5s, background-color 0.5s;
}

.material-checkbox > input:checked + span::before {
  border-color: #41b883;
  background-color: #41b883;
}

.material-checkbox > input:active + span::before {
  border-color: #41b883;
}

.material-checkbox > input:checked:active + span::before {
  border-color: transparent;
  background-color: rgba(0, 0, 0, 0.42);
}

.material-checkbox > span::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 10px;
  border: solid 2px transparent;
  border-left: none;
  border-top: none;
  transform: translate(5.5px, 1px) rotate(45deg);
  -ms-transform: translate(5.5px, 2px) rotate(45deg);
}

.material-checkbox > input:checked + span::after {
  border-color: #fff;
}
</style>