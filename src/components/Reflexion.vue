<template>
  <b-col>
    <transition name="fade" mode="out-in">
      <div v-if="testButClicked" class="alert" role="alert">
        Erfolgreich Gespeichert !
      </div>
    </transition>

    <h2>Reflexion zu Phase: {{ phaseId }}</h2>
    <b-container fluid>
      <b-row>
        <b-col sm="2">
          <!-- Textfeld 1 -->
          <!-- v-model="getReflexionData.berichten_reagieren" -->
          <!-- v-model="getReflexionData.in_bezug_setzen" -->
          <label for="textfeld-1">Berichten / Reagieren </label>
        </b-col>

        <b-col sm="10">
          <b-form-textarea
            v-model="getReflexionData.berichten_reagieren"
            v-on:input="$v.getReflexionData.berichten_reagieren.$touch"
            v-bind:class="{
              error: $v.getReflexionData.berichten_reagieren.$error,
              valid:
                $v.getReflexionData.berichten_reagieren.$dirty &&
                !$v.getReflexionData.berichten_reagieren.$invalid,
            }"
            id="textfeld-1"
            placeholder="Wählen Sie aus, worüber Sie reflektieren wollen: Gab es einen Vorfall, der Ihnen besonders positiv im Gedächtnis geblieben ist? Ist ein Problem oder eine Herausforderung aufgetreten? Fassen Sie zusammen, was vorgefallen ist. Warum ist dieser Vorfall für Sie relevant?"
          >
            <!-- <span v-if="!$v.berichten_reagieren.required && $v.project.berichten_reagieren.$dirty" class="text-danger">Bitte ausfülen!</span> -->
          </b-form-textarea>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="2">
          <!-- Textfeld 2 -->
          <label for="textfeld-2">In Bezug setzen </label>
        </b-col>

        <b-col sm="10">
          <b-form-textarea
            v-model="getReflexionData.in_bezug_setzen"
            v-on:input="$v.getReflexionData.in_bezug_setzen.$touch"
            v-bind:class="{
              error: $v.getReflexionData.in_bezug_setzen.$error,
              valid:
                $v.getReflexionData.in_bezug_setzen.$dirty &&
                !$v.getReflexionData.in_bezug_setzen.$invalid,
            }"
            id="textfeld-2"
            placeholder="Setzen Sie den Vorfall bzw. das Problem mit Ihren eigenen Kenntnissen, Fertigkeiten, Erfahrung oder fachlichem Wissen in Verbindung. Ist Ihnen ein ähnlicher Vorfall schon einmal begegnet? Waren die Umstände gleich oder unterschiedlich? Haben Sie die Fähigkeiten und das Wissen, um damit umzugehen? Erläutern Sie."
          >
            <!--  <span v-if="!$v.in_bezug_setzen.required && $v.project.in_bezug_setzen.$dirty" class="text-danger">Bitte ausfülen!</span> -->
          </b-form-textarea>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="2">
          <!-- Textfeld 3 -->
          <label for="textfeld-3">Schlussfolgern </label>
        </b-col>

        <b-col sm="10">
          <b-form-textarea
            v-model="getReflexionData.schlussfolgern"
            v-on:input="$v.getReflexionData.schlussfolgern.$touch"
            v-bind:class="{
              error: $v.getReflexionData.schlussfolgern.$error,
              valid:
                $v.getReflexionData.schlussfolgern.$dirty &&
                !$v.getReflexionData.schlussfolgern.$invalid,
            }"
            id="textfeld-3"
            placeholder="Beleuchten Sie mögliche Ursachen oder Erklärungen für den Vorfall bzw. das Problem. Welche Faktoren waren ausschlaggebend? Setzen Sie Ihre Überlegungen ggf. mit relevanten Theorien oder Wissen in Verbindung und berücksichtigen Sie verschiedene Perspektiven."
          >
            <!--   <span v-if="!$v.schlussfolgern.required && $v.schlussfolgern.$dirty" class="text-danger">Bitte ausfülen!</span> -->
          </b-form-textarea>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="2">
          <!-- Textfeld 4 -->
          <label for="textfeld-4">Rekonstruieren </label>
        </b-col>

        <b-col sm="10">
          <b-form-textarea
            v-model="getReflexionData.rekonstruieren"
            v-on:input="$v.getReflexionData.rekonstruieren.$touch"
            v-bind:class="{
              error: $v.getReflexionData.rekonstruieren.$error,
              valid:
                $v.getReflexionData.rekonstruieren.$dirty &&
                !$v.getReflexionData.rekonstruieren.$invalid,
            }"
            id="textfeld-4"
            placeholder="Rekonstruieren Sie zukünftiges Handeln in Bezug auf den Vorfall bzw. das Problem. Wie würden Sie beim nächsten Mal vorgehen? Welche Ansätze könnten funktionieren und wieso? Gibt es verschiedene Optionen, aus denen Sie wählen können? Welches Ergebnis erwarten Sie?"
          >
            <!--  <span v-if="!$v.rekonstruieren.required && $v.rekonstruieren.$dirty" class="text-danger">Bitte ausfülen!</span> -->
          </b-form-textarea>
        </b-col>
      </b-row>

      <b-row class="buttonGroup">
        <b-button
          size="sm"
          :to="{
            name: 'Home',
            params: {
              project_id: this.$route.params.project_id,
            },
          }"
          >Dashboard</b-button
        >
        <!-- <b-button size="sm" to="/home">Zum Dashboard</b-button> -->

        <b-button size="sm" @click="saveReflexion()">Speichern </b-button>
      </b-row>

      <!--  <b-button  @click="addItem()">Speichern</b-button> -->
    </b-container>
  </b-col>
</template>

<script>
//TO DO: mehr felder hinzufügen für die anderen tabs gruppe & zusammenarbeit und fachlicher kontext
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  props: {
    reflexionsPhase: String,
    sicht: String,
  },

  data() {
    return {
      phaseId: this.$route.params.phase_id,
      projectId: this.$route.params.project_id,
      testButClicked: false,
      reflexionList: [],

      /*  berichten_reagieren: "",
      in_bezug_setzen: "",
      schlussfolgern: "",
      rekonstruieren: "", */
      phaseId: this.$route.params.reflexionsPhase,
    };
  },

  validations: {
    getReflexionData: {
      berichten_reagieren: { required, minLength: minLength(5) },
      in_bezug_setzen: { required, minLength: minLength(5) },
      schlussfolgern: { required, minLength: minLength(5) },
      rekonstruieren: { required, minLength: minLength(5) },
    },
  },
  methods: {
    /**
     * if there is an idd, execute the update method, otherwise execute the add method because there is no reflexion or no idd.
     * Long Form:
     * if(idd) {
     *  this.updateReflexion();
     * }else{
     *  this.addItem();
     * }
     */
    saveReflexion() {
      let idd = this.getReflexionData.idd;
      //short form of if-condition
      idd ? this.updateReflexion() : this.addItem();
    },

    /** Reflexion wird in das Backend geladen */
    addItem() {
      console.log("add item");
      if (!this.$v.$invalid) {
        console.log("title: ${this.titela}");

        var ausgabe = {
          sichten: this.sicht,
          berichten_reagieren: this.getReflexionData.berichten_reagieren,
          in_bezug_setzen: this.getReflexionData.in_bezug_setzen,
          schlussfolgern: this.getReflexionData.schlussfolgern,
          rekonstruieren: this.getReflexionData.rekonstruieren,
        };

        this.testButClicked = true;

        this.$store.dispatch("reflexion/createReflexion", ausgabe);
      } else {
        alert("Bitte alles ausfüllen");
      }
    },

    updateReflexion() {
      console.log("update");
      if (!this.$v.$invalid) {
        console.log("title: ${this.titela}");

        var ausgabe = {
          sichten: this.sicht,
          title: this.getReflexionData.title,
          berichten_reagieren: this.getReflexionData.berichten_reagieren,
          in_bezug_setzen: this.getReflexionData.in_bezug_setzen,
          schlussfolgern: this.getReflexionData.schlussfolgern,
          rekonstruieren: this.getReflexionData.rekonstruieren,
          idd: this.getReflexionData.idd,
        };

        this.testButClicked = true;

        this.$store.dispatch("reflexion/updateReflexion", ausgabe);
      } else {
        alert("Bitte alles ausfüllen");
      }
    },

    /* To Do: überprüfen ob schon eine reflexion zu dieser phase von dieser person angefertigt wurde 
            -> kein neuer Eintrag, alte Reflexion kann überschrieben oder aktualisiert werden
            */
  },

  watch: {
    testButClicked(val) {
      if (val) {
        setTimeout(() => (this.testButClicked = false), 1000);
      }
    },
  },

  /** lädt alle Reflexionen aus dem Backend */
  async mounted() {
    // var IchSicht = "325fd0af-838c-49f5-92d3-2fcc987e6137";
    // this.$store.dispatch(
    //     "reflexion/loadReflexionFromBackend",
    //     "325fd0af-838c-49f5-92d3-2fcc987e6137"
    // );

    this.reflexionData = this.$store.state.reflexion.reflexionData;
    /*  this.reflexionList=this.rowData */
    // TO DO: nur die Daten laden die der Phase und der Nutzer ID entsprechen
    //console.log(this.reflexionList)
    //console.log(typeof(this.reflexionList))
  },

  computed: {
    // ...mapGetters({ getReflexionData: "reflexion/getReflexionData" }),
    getReflexionData() {
      return this.$store.state.reflexion.reflexionData;
    },
  },
};
</script>
<style scoped>
.container-fluid .row {
  margin-bottom: 1rem !important;
}

.buttonGroup {
  display: flex;
  justify-content: space-between;
}

.alert {
  background-color: lightgreen;
  padding: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
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

