<template>
  <div id="todoList">
    <div v-for="(todos, index) in listOfToDos" :key="index">
      <h3 v-if="todos.length > 0"></h3>
      <div class="card" v-for="(todo, index2) in todos" :key="index2">
        <div class="card-header" :class="getHeaderClass(index)">
          <strong>
            {{ todos[0].project_title }}
          </strong>
          <b> {{ todo.date }}</b>
          <b-button @click="deleteTodo(todo)" size="sm">
            <b-icon icon="trash"></b-icon>
          </b-button>
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
      </div>
    </div>
  </div>
</template>
<script>
import { required, maxLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  props: {
    date: String,
  },
  data() {
    return {
      status: "",
    };
  },
  validations: {
    todoNeu: { required, maxLength: maxLength(250) },
  },
  computed: {
    ...mapState("todo", ["listOfToDos"]),
  },
  methods: {
    deleteTodo(todo) {
      alert("ToDo " + todo.title + " wurde gelöscht");
      this.$store.dispatch("todo/deleteTodo", todo);
    },
    checkboxUpdate(index, todoErledigt) {
      this.$store.dispatch("todo/updateTodo", todoErledigt);
    },

    diffMonth() {
      if (this.date === new Date().getMonth()) {
        return this.date;
      }
    },
    getHeaderClass(index) {
      if (index % 2 == 0) {
        return "backgroundHeader";
      }
    },
  },
};
</script>
<style scoped>
#todoList {
  overflow: auto; /*For scrollbar */
  height: 46vh;
  padding: 0;
}
.backgroundHeader {
  background-color: #6c757d;
  color: #f7f7f7;
}

.checkbox p {
  margin-bottom: 0.3rem;
}
.card {
  margin: 0 0 1rem 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  font-size: 0.9em;
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
