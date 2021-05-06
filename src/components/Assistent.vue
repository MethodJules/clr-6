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
            <h5>{{ assistent.title }}</h5>
            <hr />

            <p class="my-4">
              {{ assistent.text }}
            </p>

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

            <!-- Datensätze aus dem Backend für die Hilfstexte werden als Array ausgegeben -->
            <!-- <div
              class="card"
              v-for="assistent in assistents"
              :key="assistent.date"
            >
              {{ assistent }}

              
            </div> -->
            <hr />
            <ul>
              <li v-for="assistent in assistentsArray" :key="assistent.id">
                {{ assistent.title }}
              </li>
            </ul>
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
      assistent: this.$store.state.assistent.assistents,
      assistentsArray: this.$store.state.assistent.assistentsArray,

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
    // Anzahl der nicht erledigten Todos werden ausgegeben
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
    // Wenn ich etwas auf der Konsole machen, dann funktioniert diese Linien. Warum?
  },
};
</script>

<style scoped>
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









