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
              @click="filterByPhase(phases[phase_id])"
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
              <div >
                <ol>
                  <li v-for="(task, i) in tasks" :key="i">{{ task }} </li>
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
      phases: [
        // TODO: This needs to be dynamic in future there should be an API Call to fetch the
        // data from Drupal and sort the array by the weight property of the term
        // then the array can be used to get the right phase_uuid         
        'c4a2e091-e5f3-4c0f-8a3a-10fadfec6c73',
        'd3d94eb4-9a18-4930-97ad-743f73de0a18',
        '5d052e85-c705-4a1b-96c9-1e29cfebe592',
        '4db8d418-79c4-496f-98c6-a7ad8e5c89a7',
        '8bc46442-221a-49a4-853c-63352a4e78bd',
        '88bfdd85-d6c7-4833-af9d-a02cd7f3c0f0',
        'd710639b-6999-446c-9670-a74894f800db',
        '3ba306d7-bbd2-46f7-9cad-091a63f174cd'
      ],
      body: '',
      tasks: [],
    };
  },
  methods: {
    filterByPhase(id) {
      const data = this.assistentData.filter((item) => item.relationships.field_phase.data.id == id);
      if(data[0] == undefined) {
        this.body = '<p>Der Dozent hat hier noch keinen Hinweis eingegeben.</p>'
      } else {
        this.body = data[0].attributes.body.value;
        this.tasks = data[0].attributes.field_aufgaben
      }
    },
  },
  computed: {
    assistentData() {
      return this.$store.state.assistent.assistentData;
    },
    phase_id() {
      return this.$route.params.phase_id;
    }
  },
};
</script>











