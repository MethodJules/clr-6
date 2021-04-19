<template>
  <div id="app">
    <b-container fluid>
      <b-row class="obereLeiste">
        <b-col class="border border-dark">
          <MenueLeiste />
        </b-col>
      </b-row>

      <b-row>
        <b-col class="linkeSeite" cols="2">
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
            <b-col class="border border-dark">
              <Kalender />
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="8" class="mitte border border-primary">
          <router-view :key="$route.path"></router-view>
        </b-col>
        <!-- Sobald der Nutzer auf die Projektliste geht, blendet er 
        die Komponente SeitenNavigation aus . Siehe https://stackoverflow.com/questions/56681106/vue-hide-view-components-conditionally-based-on-url-->
        <b-col v-if="!isChanged" cols="2" class="rechteSeite">
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
        <b-col v-else>
        </b-col>
      </b-row>

      <b-row class="untereLeiste">
        
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
  props:{
    showRightMenu: Boolean
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
     closeMenu(){
      this.showMenu = false;
    } 
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
  computed:{
    isChanged(){
      return this.$route.name === 'ProjectList'
    }
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
.obereLeiste {
  /*         width: auto;
        border: 1px solid black; */
}
.linkeSeite {
  /* width: auto;
        border: 1px solid black; */
}
.rechteSeite {
  /*  width: 60 px;
        border: 1px solid black; */
}
.untereLeiste {
  width: auto;
  height: 100 px;
  border: 1px solid black;
}

/* .background {
        background-color: red;
        background-image: url('~@/assets/background2.jpg');
        width: 100%;
        height: 90%;
        position: absolute;
        background-size: cover;

    } */
/*
    .sc-launcher {
        position: unset !important;
        height: 60px !important;
        margin-bottom: 20px !important;

    }

    .sc-launcher::before {
        position: unset !important;
        height: 60px !important;
        height:unset !important;
    }

    .sc-open-icon {
        position: unset !important;

    }

    .sc-closed-icon {
        position: unset !important;
    }

    .sc-chat-window {
        width: 20% !important;
        height: 50% !important;
    }

    .sc-header {
        height: 15% !important;
        min-height: unset !important;
    }
    .sc-header--title {
        font-size: 10px !important;
        min-height: unset !important;
    }

    .sc-message {
        width: unset !important;
        margin-right: 10px !important;
    }
    .sc-message--text {
        padding-bottom: 5px !important;
        padding-top: 5px !important;
        padding-left: 5px !important;
        padding-right: 5px !important;
        font-size: 12px !important;
        max-width: unset !important;

    }
    .sc-message--content.sent {
        margin-left: 15%;
    }

    .sc-message--text-content {
        margin-bottom: 0px;
    }

    .sc-user-input {
        min-height: unset !important;
        height: 10% !important;
    }
    .sc-user-input--text {
        height: 40px !important;
        min-height: unset !important;
        padding: 5px !important;
        width: 90% !important;
    }
    .sc-user-input--button {
        margin-left: 50px !important;

    }

    */
</style>

