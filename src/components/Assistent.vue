<template>
  <b-container>
    <b-row>
      <b-col>
        <div>
          <!-- modal des Assistenten mit Angabe von Text und der Angabe der gespeicherten 
                 Informationen in der Datenbank -->
          <b-row class="d-flex justify-content-center">
            <b-button
              v-b-modal.modal-1
              size="lg"
              variant="primary"
              class="mb-2"
              @click="filterByPhase(phases[phase_number])"
            >
              <!-- Assistent als Fragezeichen Symbol -->
              <b-icon icon="question-circle-fill" aria-label="Help"></b-icon>
            </b-button>
          </b-row>
          <!-- Hilfstext von Assistent wird mit Modal Bootstrap ausgegeben, wenn man auf das Fragezeichen klickt -->
          <b-modal
            id="modal-1"
            title="Assistent"
            cancel-title="Abbrechen"
            button-size="sm"
          >
            <b-row>
              <div>
                <span v-html="body"></span>
              </div>
              <div>
                <ol>
                  <li v-for="(task, i) in tasks" :key="i">{{ task }}</li>
                </ol>
              </div>
            </b-row>
          </b-modal>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      body: "",
      tasks: [],
    };
  },
  methods: {
    filterByPhase(id) {
      const data = this.assistentData.filter(
        (item) => item.relationships.field_phase.data.id == id
      );
      if (data[0] == undefined) {
        this.body =
          "<p>Der Dozent hat hier noch keinen Hinweis eingegeben.</p>";
      } else {
        this.body = data[0].attributes.body.value;
        this.tasks = data[0].attributes.field_aufgaben;
      }
    },
  },
  computed: {
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











