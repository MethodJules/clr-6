<template>
  <div id="todoList">
    <div v-if="inProjectList || inEinstellungen || inProfil || inProjectSearch">
      <div v-for="(todos, index) in listOfTodos" :key="index">
        To Do {{ todos[0].project_title }}
        <h3 v-if="todos.length > 0"></h3>
        <div class="card p-0 m-1" v-for="(todo, index) in todos" :key="index">
          <div class="card-header text-center">
            <b> Fällig am: {{ todo.date }}</b>
          </div>
          <div class="card-body p-2">
            <b-form-checkbox
              :id="todo.uuid"
              name="checkbox-1"
              @input="checkboxUpdate(index, todo)"
              v-model="todo.erledigt"
            >
              <p>
                {{ todo.title }}
              </p>
            </b-form-checkbox>
          </div>
          <div class="card-buttons">
            <b-button @click="deleteTodo(todo)" size="sm">
              <b-icon icon="trash"></b-icon>
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        v-if="
          !inEinstellungen && !inProjectList && !inProfil && !inProjectSearch
        "
      >
        <h3>To Do</h3>

        <!-- Liste zum Erstellen der Todos  -->
        <div
          class="card p-0 m-1"
          v-for="(todo, index) in todosOfProject"
          :key="index"
        >
          <div class="card-header text-center">
            <b> Fällig am: {{ todo.date }}</b>
          </div>
          <div class="card-body p-2">
            <b-form-checkbox
              :id="todo.uuid"
              name="checkbox-1"
              @input="checkboxUpdate(index, todo)"
              v-model="todo.erledigt"
            >
              <p>
                {{ todo.title }}
              </p>
            </b-form-checkbox>
          </div>
          <div class="card-buttons">
            <b-button @click="deleteTodo(todo)" size="sm">
              <b-icon icon="trash"></b-icon>
            </b-button>
          </div>
        </div>

        <div>
          <!-- Modal zum eingeben der neuen todos, beinhaltet todo und abgabefrist. 
            Es wird nur die zu erledigende Aufgabe angezeigt -->
          <b-modal id="to_do_edit_modal" hide-footer title="To Do">
            <label for="neueTodo">zu erledigende Aufgabe: </label>
            <input
              v-model="todoNeu"
              v-on:input="$v.todoNeu.$touch"
              v-bind:class="{
                error: $v.todoNeu.$error,
                valid: $v.todoNeu.$dirty && !$v.todoNeu.$invalid,
              }"
              type="text"
              placeholder="max. 250 Zeichen"
            />
            <br />
            <label for="example-datepicker">
              <br />
              Frist:
            </label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="appointment"
              :select-attribute="selectAttribute"
              class="mb-2"
            ></b-form-datepicker>
            <b-button @click="ok()"> OK </b-button>
          </b-modal>
          <!-- Zum öffnen des Modals -->
        </div>
      </div>
    </div>

    <b-button v-if="!inProjectList" v-b-modal.to_do_edit_modal>+</b-button>
  </div>
</template>



<script>
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  props: {
    date: String,
  },

  data() {
    return {
      //To DO: new key for todo list
      listOfToDos: [],
      selectAttribute: {
        dot: true,
      },
      todoNeu: "",
      appointment: "",
      status: "",
      //msg: "Datum:" + { date } + { todo }
      todo: "",
    };
  },

  validations: {
    todoNeu: { required, maxLength: maxLength(250) },
  },
  methods: {
    ok() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        var neueEingabe = {
          todo: this.todoNeu,
          date: this.appointment,
          project_id: this.getProjectID,
        };
        this.$store.dispatch("todo/createToDo", neueEingabe);
        this.todoNeu = "";
      }
    },
    deleteTodo(todo) {
      alert("Delete");

      this.$store.dispatch("todo/deleteTodo", todo);
    },
    diffMonth() {
      //Soll die Todos ausgeben deren Frist im aktuellen Monat endet
      if (this.date === new Date().getMonth()) {
        return this.date;
      }
    },
    checkboxUpdate(index, todoErledigt) {
      console.log(todoErledigt);

      this.$store.dispatch("todo/updateTodo", todoErledigt);
    },
  },

  computed: {
    ...mapGetters({
      listOfTodos: "todo/getListOfTodos",
      todosOfProject: "todo/getTodosOfProject",
    }),

    inProjectSearch() {
      // console.log(this.$route.name);
      return this.$route.name === "ProjectSearch";
    },
    inProjectList() {
      console.log(this.$route.name);
      // console.log(this.$route.name);
      let result = false;
      this.$route.name === "ProjectList" ? (result = true) : (result = false);
      console.log(result);
      return result;
    },
    inProfil() {
      console.log(this.$route.name);
      // return this.$route.name === "Profil";
      let result = false;
      this.$route.name === "Profil" ? (result = true) : (result = false);
      console.log(result);
      return result;
    },
    inEinstellungen() {
      // console.log(this.$route.name);
      // return this.$route.name === "Einstellungen";
      let result = false;
      this.$route.name === "Einstellungen" ? (result = true) : (result = false);
      console.log(result);
      return result;
    },

    getMyProjectlist() {
      return this.$store.state.project.myProjects;
    },

    getTodosForAllMyProjects() {
      console.log(this.$store.state.todo.listOfToDos);
      return this.$store.state.todo.listOfToDos;
    },

    todoAusgabe() {
      return this.todo.date + " " + this.todo.todo;
    },
    loadToDo() {
      return this.$store.state.todo.listOfToDos;
    },

    getProjectID() {
      return this.$route.params.project_id;
    },
  },
};
</script>
<style scoped>
#todoList {
  overflow: auto; /*For scrollbar */
  height: 60vh;
  padding: 0;
}
.checkbox p {
  margin-bottom: 0.3rem;
}
.card-buttons {
  display: flex;
  justify-content: flex-end;
  padding: 0.3rem;
}
.card-buttons * {
  margin-left: 0.3rem;
}

.alert {
  background-color: lightgreen;
  padding: 15px;
}

/* input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
} */

.error {
  border-color: red;
  background: #fdd;
}

.error:focus {
  outline-color: #f99;
}

.valid {
  border-color: #5a5;
  background: #efe;
}

.valid:focus {
  outline-color: #8e8;
}
</style>