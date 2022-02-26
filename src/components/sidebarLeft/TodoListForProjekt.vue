<template>
  <div id="todoList">
    <div class="todoList-header"></div>
    <AddTodoButton />
    <div class="card" v-for="(todo, index) in todosOfProject" :key="index">
      <div class="card-header">
        <strong>
          {{ getCurrentProject.title }}
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
          @input="checkboxUpdate(todo)"
          v-model="todo.erledigt"
        >
          <p>
            {{ todo.title }}
          </p>
        </b-form-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import AddTodoButton from "@/components/buttons/AddTodoButton.vue";
export default {
  props: {
    date: String,
  },

  components: {
    AddTodoButton,
  },

  validations: {
    todoNeu: { required, maxLength: maxLength(250) },
  },

  methods: {
    deleteTodo(todo) {
      this.$store.dispatch("todo/deleteTodo", todo);
    },
    checkboxUpdate(todoErledigt) {
      this.$store.dispatch("todo/updateTodo", todoErledigt);
    },

    diffMonth() {
      if (this.date === new Date().getMonth()) {
        return this.date;
      }
    },
  },

  computed: {
    ...mapGetters({
      todosOfProject: "todo/getTodosOfProject",
      getCurrentProject: "project/getCurrentProject",
    }),

    getProjectID() {
      return sessionStorage.getItem("projectId");
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
.todoList-header {
  display: flex;
  justify-content: space-between;
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
