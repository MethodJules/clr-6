<template>
  <div id="app">
    <b-container fluid class="p-0 m-0">
      <MenueLeiste />

      <b-row class="p-4 d-flex flex-wrap">
        <b-col class="linkeSeite" md="2" style="min-width: 20rem">
          <b-row>
            <b-col class="border border-dark">
              <TodoList />
            </b-col>
          </b-row>
          <b-row>
            <b-col> </b-col>
            <b-col>
              <br />
            </b-col>
          </b-row>
          <b-row>
            <b-col class="border border-dark d-flex p-3">
              <Kalender />
            </b-col>
          </b-row>
        </b-col>

        <b-col
          class="border border-primary p-0 flex-grow-1"
          style="min-width: 20rem"
        >
          <router-view></router-view>
        </b-col>
        <!-- Sobald der Nutzer auf die Projektliste geht, blendet er 
        die Komponente SeitenNavigation aus . Siehe https://stackoverflow.com/questions/56681106/vue-hide-view-components-conditionally-based-on-url-->
        <b-col
          v-if="!isChanged"
          class="rechteSeite"
          md="2"
          style="min-width: 20rem"
        >
          <b-row>
            <b-col class="border border-dark">
              <SeitenNavigation />
            </b-col>
          </b-row>

          <b-row class="chat">
            <b-col class="border border-dark">
              <Chat />
            </b-col>
          </b-row>
          <b-row class="postfach">
            <b-col class="border border-dark">
              <Postfach />
            </b-col>
          </b-row>
        </b-col>
        <b-col v-else> </b-col>
      </b-row>

      <b-row class="untereLeiste m-0 p-4 d-flex align-center">
        <h3>What are gonna put here?</h3>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import SeitenNavigation from "@/components/SeitenNavigation.vue";
import TodoList from "@/components/TodoList.vue";
import MenueLeiste from "@/components/MenueLeiste.vue";
import Kalender from "@/components/Kalender.vue";
import Chat from "@/components/Chat.vue";
import Postfach from "@/components/Postfach.vue";
//import ProjectList from "@/views/ProjectList.vue"

export default {
  props: {
    showRightMenu: Boolean,
  },
  name: "App",
  components: {
    SeitenNavigation,
    //ProjectList,
    TodoList,
    MenueLeiste,
    Kalender,
    Chat,
    Postfach,
  },
  data() {
    return {
      nameState: null,
      showMenu: true,
      eintragTodo: {
        todo: "",
      },

      /* listOfToDos [
                    {todo:"Mein1", date:"20.02.2021"},
                ], */

      /* selected: null,
                options: [
                    { value: null, text: 'Zur Reflexion' },
                    { value: 'a', text: 'Gruppe bilden' },
                    { value: 'b', text: 'Ziel & Umfang definieren' },
                    { value: 'c', text: 'Konzepte & Definitionen' },
                    { value: 'd', text: 'Literatur suchen' },
                    { value: 'e', text: 'Daten extrahieren' },
                    { value: 'f', text: 'Analyse & Synthese' },
                    { value: 'g', text: 'Ergebnisse kommunizieren' },
                    { value: 'h', text: 'Gruppe auflösen' },
                    
                ], */
    };
  },
  methods: {
    closeMenu() {
      this.showMenu = false;
    },
    /* formularTodo(){
                this.$refs['my-todo-modal'].show()
                this.eintragTodo.date=""
                this.eintragTodo.todo= ""
                this.eintragTodo.buttonAdd= "add"

            },
            neueToDo(){
                this.$refs['my-todo-modal'].show() */
    /* this.eintragTodo.todo= listOfToDos.todo
                this.eintragTodo.date= listOfToDos.date
                this.eintragTodo.buttonAdd= "add" */
    /* var ausgabeToDo ={
                    date: this.eintragTodo.date,
                    todo: this.eintragTodo.todo
                }
                this.listOfToDos.push(ausgabeToDo)
                this.date = ''
                this.todo = '' */
    // },
    /* hideModal() {
                this.$refs['my-todo-modal'].hide()
            } */
  },
  computed: {
    isChanged() {
      return this.$route.name === "ProjectList";
    },
  } /* ,
        mounted() {
            this.$store.dispatch('todo/loadToDoFromBackend')
            this.listOfToDos = this.$store.state.todo.listOfToDos

        }, */,
};
</script>
<style>
@import "assets/style.css";

.postfach {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  height: 15%;
  display: table;
  margin: auto;
}

.chat {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  height: 10%;
  display: table;
  margin-top: 20px;
}

.untereLeiste {
  height: 100%;
  border: 1px solid black;
}

.row {
  width: 100% !important;
}
</style>

