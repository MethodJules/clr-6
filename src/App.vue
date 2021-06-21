<template>
  <div id="app">
    <div v-if="validCredential != true">
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
      <b-container fluid class="p-0 m-0">
        <MenueLeiste />

        <b-row class="d-flex flex-wrap pageContainer">
          <b-col class="linkeSeite" md="2">
            <b-row>
              <b-col class="border border-dark">
                <TodoList />
              </b-col>
            </b-row>

            <b-row>
              <b-col class="border border-dark d-flex">
                <Kalender />
              </b-col>
            </b-row>
          </b-col>

          <b-col class="border border-primary flex-grow-1 mainContent">
            <router-view :key="$route.path"></router-view>
          </b-col>
          <!-- Sobald der Nutzer auf die Projektliste geht, blendet er 
        die Komponente SeitenNavigation aus . Siehe https://stackoverflow.com/questions/56681106/vue-hide-view-components-conditionally-based-on-url-->
          <b-col
            v-if="!isChanged"
            class="d-flex flex-column justify-content-between p-2 rechtseite"
            md="2"
          >
            <b-row>
              <b-col class="border border-dark">
                <SeitenNavigation />
              </b-col>
            </b-row>

            <b-row class="chat mb-2">
              <br />
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

        <b-row class="untereLeiste p-4 d-flex align-center">
          <h3>Footer oder Impressium vielleicht</h3>
        </b-row>
      </b-container>
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

/*
var SparkyserviceApi = require('sparkyservice_api');

var api = new SparkyserviceApi.AuthControllerApi()
var body = new SparkyserviceApi.CredentialsDto(); // {CredentialsDto} 
var apiResponse = ""
var apiData = ""

var callback = function(error, data, response) {
  console.log("test" + response)
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
    apiResponse=response
    apiData=data
    console.log(apiResponse.status)
    console.log(apiData)
  }
};
*/

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
      //validCredential: false,
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
    /*
    login() {
         //body.username = this.zugangsKennung;
         //body.password = this.passwort;
         body.username = "";
         body.password = "";
         
         
        api.authenticate(body, callback);



      let antwort; 
      if (apiResponse.status==200) {
        antwort = true;
      }

      //wenn rückgabe true, dann wird freigeschaltet, sonst wird fehlermeldung ausgegeben
      if (antwort) {
        this.validCredential = false;
        //modal/popup mit message
      } else {
        //modal popup, fehlermeldung
      }
      console.log(this.validCredential);
    },
    */
    login() {
      //this is the real login
/*      let username=this.zugangsKennung
      let password=this.passwort
       this.$store.dispatch('sparky_api/login', {
        username,
        password
      }) 
      this.$store.dispatch('sparky_api/login')
      */
     //this is the fake login without sparky backend 
      this.$store.dispatch('sparky_api/fakeLogin')
      //console.log(this.$store.state.sparky_api.account)
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

    account() {
      return this.$store.state.sparky_api.account
    },

    validCredential() {
     // return true
      return this.$store.state.sparky_api.validCredential
    }
  }  ,

  mounted() {
    this.$store.dispatch("todo/loadToDoFromBackend");
    this.listOfToDos = this.$store.state.todo.listOfToDos;
    this.$store.dispatch("daily_scrum/loadDailysFromBackend");
  },
};
</script>
<style>
@import "assets/style.css";
@import "assets/loading.css";
.row {
  width: 100% !important;
  margin: 0 !important;
}

.pageContainer {
  padding: 1rem 1rem 1rem 0;
}

.linkeSeite {
  min-width: 20rem;
}

.rechtseite {
  min-width: 20rem;
  border: 1px solid red;
}
.mainContent {
  min-width: 20rem;
  padding: 0 !important;
}
.postfach {
  text-align: center;
}

.chat {
  text-align: center;
  /* position: absolute;
  bottom: 0;
  height: 10%;
  display: table;
  margin-top: 20px; */
}

.login {
  margin-top: 30rem;
}

.untereLeiste {
  height: 100%;
  border: 1px solid black;
  margin: 0;
}
</style>

