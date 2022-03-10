<template>
  <div class="card">
    <div class="card-header">
      <b-form-datepicker
        id="example-datepicker"
        size="sm"
        right
        v-model="appointment"
        :select-attribute="selectAttribute"
      ></b-form-datepicker>
    </div>
    <div class="card-body p-2">
      <b-form-input
        v-model="todoNeu"
        v-bind:class="{
          error: $v.todoNeu.$error,
          valid: $v.todoNeu.$dirty && !$v.todoNeu.$invalid,
        }"
        @keydown.enter="ok()"
        type="text"
        placeholder="Schreiben Sie ihre Todo hier, max. 250 Zeichen"
      ></b-form-input>
      <p class="card-warning">
        {{ todoNeuError }}
      </p>
      <p class="card-warning">
        {{ appointmentError }}
      </p>
    </div>
    <div class="card-footer">
      <b-button size="sm" @click="ok()">Add</b-button>
      <b-button size="sm" @click="reset()">Reset</b-button>
    </div>

  </div>
</template>
<script>
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      todoNeu: "",
      appointment: "",
      todoNeuError: "",
      appointmentError: "",
      selectAttribute: {
        dot: true,
      },
    };
  },

  validations: {
    todoNeu: { required, maxLength: maxLength(250) },
    appointment: { required },
  },
  computed: {
    getProjectID() {
      return this.$route.params.project_id;
    },
  },

  methods: {
    ok() {
      if (!this.$v.$invalid) {
        var neueEingabe = {
          todo: this.todoNeu,
          date: this.appointment,
          project_id: this.getProjectID,
        };
        this.$store.dispatch("todo/createToDo", neueEingabe);
        this.todoNeu = "";
        this.appointment = "";
        this.appointmentError = "";
        this.todoNeuError = "";
      } else {
        this.$v.todoNeu.$invalid
          ? (this.todoNeuError = "Bitte gib eine Aufgabe ein")
          : (this.todoNeuError = "");
        this.$v.appointment.$invalid
          ? (this.appointmentError = "Bitte wähle eine Frist aus")
          : (this.appointmentError = "");
      }
    },
    reset() {
      this.todoNeu = "";
      this.appointment = "";
      this.todoNeuError="";
      this.appointmentError="";
      this.$v.$reset;
    },
  },
};
</script>
<style scoped>
.card {
  margin: 0 0 1rem 0;
}
.card-header {
  padding: 0 0.2rem;
  font-size: 0.9em;
}

.card-header strong {
  width: 25%;
}
.card-body input {
  border: none;
  padding: 0;
  margin: 0;
}
.card-body input:focus {
  border: none !important;
}
.card-warning {
  font-size: 0.8rem;
  color: red;
  padding: 0;
  margin: 0;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 0.4rem 0.2rem 0;
  background-color: white;
  border: none;
}
.card-footer * {
  margin-left: 0.7rem;
}

#example-datepicker__outer_ {
  border: none;
  background-color: #f7f7f7;
  padding: 0;
  margin: 0;
}
</style>