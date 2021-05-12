<template>
  <div id="app">
    <div v-if="validCredential != false">
      <div class="mx-auto" style="width: 50rem;">
      <b-container >
        <b-row align-v="center">
          <b-col>
            <b-card  class="login">
              <b-form-group>
              <b-tabs content-class="mt-3">
                <!-- Tab 1 -->
                <b-tab title="Login">
                  <table>
                    <tr>
                      <td>
                        <label for="zugangsKennung" class="mr-1">Zugangskennung</label>
                      </td>
                      <td>
                        <input
                          v-model="zugangsKennung"
                          id="zugangskennung"
                          type="text"
                          placeholder=""
                          class="form-control"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label for="password" class="mr-1 mt-1">Passwort</label>
                      </td>
                      <td>
                        <input
                          v-model="passwort"
                          id="password"
                          type="password"
                          placeholder=""
                          class="form-control mt-1"
                        />
                      </td>
                    </tr>
                  </table>

                  <b-button @click="login()">Login</b-button>
                </b-tab>

                <b-tab title="Registrierung">
                  <h5>Registriere dich hier mit deinem Uni-Account</h5>
                  <p>
                    Falls du Hilfe benötigst, wende dich an
                    mail@uni-hildesheim.de
                  </p>
                  <b-button @click="registrieren()">Registrieren</b-button>
                </b-tab>
              </b-tabs>
              </b-form-group>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      </div>
    </div>
    <div v-else>
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
              <br>
              <b-col class="border border-dark">
                <Postfach />
                
              </b-col>
            </b-row>
            <b-row class="postfach">
              <b-col class="border border-dark">
                <Chat />
              </b-col>
            </b-row>
          </b-col>
          <b-col v-else> </b-col>
        </b-row>

        <b-row class="untereLeiste"> </b-row> </b-container
      >.
    </div>
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
      zugangsKennung: "",
      passwort: "",
      validCredential: false,
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

    login() {
      /*     
      
      anmeldedaten werden an anmeldeserver gesendet und antwort ist??
      -> bei fehler kommt fehler message und dann eigene fehlermeldung ausgeben lassen
      -> wenn korrekt, dann kommt bestimmte antwort -> dann valid=true
      */
      //hier abgleich mit daten durch api call an authentifizierungs server - login.js gleicht passwörter ab und gibt nur boolean zurück,
      // keine pw werden zurückgegeben
      let antwort; // = this.$store.dispatch('login/validateLoginData', zugangsKennung, passwort)

      //der teil ist nur temporär
      if (this.zugangsKennung == "Max" && this.passwort == "Musterpasswort") {
        antwort = true;
      }

      //wenn rückgabe true, dann wird freigeschaltet, sonst wird fehlermeldung ausgegeben
      if (antwort) {
        this.validCredential = true;
        //modal/popup mit message
      } else {
        //modal popup, fehlermeldung
      }

      console.log(this.validCredential);
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

.login {
  margin-top: 30rem;
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

