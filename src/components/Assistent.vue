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
            >
              <!-- Assistent als Fragezeichen Symbol -->
              <b-icon icon="question-circle-fill" aria-label="Help"></b-icon>
            </b-button>
          </b-row>
          <!-- Hilfstext von Assistent wird mit Modal Bootstrap ausgegeben, wenn man auf das Fragezeichen klickt -->
          <b-modal id="modal-1" title="Assistent">
            <b-row>
              <h5>{{ getAssistentText.title }}</h5>

              <!-- Why this hr is not shown in htmldom?? -->
              <hr />

              <p class="my-4">
                How will it see these html tags as html insted of text?
                <br /><br />

                {{ getAssistentText.text }}
              </p>
            </b-row>

            <div class="container">
              <div>
                <div class="eingabe">
                  <div class="inputcontainer">
                    <!-- Input Feld für die Erstellung der Todos. Jede neue Todo wird durch Enter-Taste in die Liste mit der Methode addTodo eingefügt -->
                    <input
                      type="text"
                      placeholder="Aufgaben, die zu erledigen"
                      v-model="newTodo"
                      @keyup.enter="addTodo"
                    />
                  </div>
                  <div class="border"></div>
                </div>

                <div class="todo-list">
                  <!-- for-Schleife: über alle To-dos durchgelaufen -->
                  <div v-for="todo in todos" :key="todo.id" class="list">
                    <!-- Einträge werden sichtbar und in die Auflistung übertragen -->
                    <label class="material-checkbox">
                      <input type="checkbox" v-model="todo.erledigt" />
                      <span></span>
                    </label>
                    <div
                      class="text"
                      :class="{ erledigt: todo.erledigt }"
                      v-if="!todo.zuerledigen"
                      @dblclick="
                        todo.zuerledigen = true;
                        TodoList = todo.text;
                      "
                    >
                      {{ todo.text }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- Gibt die Anzahl der noch zu erledigenden Aufgaben -->
              <footer>
                <span>{{ übrig }} Aufgaben sind zu erledigen.</span>
              </footer>
            </div>

            <hr />
          </b-modal>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      lastEntry_id: 2,
      newTodo: "",
      TodoList: "",
      todos: [
        {
          id: 1,
          text: "Aufgabe 1",
          erledigt: false,
          zuerledigen: false,
        },
        {
          id: 2,
          text: "Aufgabe 2",
          erledigt: false,
          zuerledigen: false,
        },
      ],
    };
  },

  computed: {
    ...mapGetters({ getAssistentText: "assistent/getAssistentText" }),
    übrig() {
      return this.todos.filter((todo) => !todo.erledigt).length;
    },
  },

  methods: {
    /* neue Todo wird eingefügt und als Checkliste ausgegeben bzw in die Liste übertragen. Die bereits vorhandene Liste wird durch die neuen Eingaben ergänzt */
    addTodo() {
      if (this.newTodo.trim() == "") return;
      let todo = {
        id: ++this.lastEntry_id,
        text: this.newTodo,
        zuerledigen: false,
      };
      this.todos.push(todo);
      this.newTodo = "";
    },
  },
  //Die in der Datenbank gespeicherten Hilfstexte werden hiermit angegeben
  /* Anbindung an Backend mit Get Operator, um die Daten (Hilfstexte von Assistent) lesen zu können */
  mounted() {
    this.$store.dispatch("assistent/loadAssistentArrayFromBackend");
    this.$store.dispatch("assistent/loadAssistentFromBackend");
    // this.assistents = this.$store.state.assistents;
    // this.assistentsArray = this.$store.state.assistentsArray;
    console.log("");
    console.log("");
    console.log("");
    // Wenn ich etwas auf der Konsole machen, dann funktioniert diese Linien. Warum?
  },
};
</script>











