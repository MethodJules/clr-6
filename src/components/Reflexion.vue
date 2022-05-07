<template>
  <b-col>
    <transition name="fade" mode="out-in">
      <div v-if="testButClicked" class="alert" role="alert">
        Erfolgreich Gespeichert !
      </div>
    </transition>
    <b-container class="reflexion">
      <b-row class="reflexion-item">
        <label for="textfeld-1"><b>Berichten/Reagieren </b></label>
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
        </b-form-textarea>
      </b-row>
      <b-row class="reflexion-item">
        <label for="textfeld-2"><b>In Bezug setzen</b> </label>
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
        </b-form-textarea>
      </b-row>
      <b-row class="reflexion-item">
        <label for="textfeld-3"><b>Schlussfolgern </b></label>

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
        </b-form-textarea>
      </b-row>
      <b-row class="reflexion-item">
        <label for="textfeld-4"><b>Rekonstruieren</b> </label>

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
        </b-form-textarea>
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
        <b-button size="sm" @click="saveReflexion()">Speichern </b-button>
      </b-row>
    </b-container>
  </b-col>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  props: {
    reflexionsPhase: String,
    sicht: String,
  },

  data() {
    return {
      testButClicked: false,
    };
  },

  validations: {
    getReflexionData: {
      berichten_reagieren: { minLength: minLength(5) },
      in_bezug_setzen: { minLength: minLength(5) },
      schlussfolgern: { minLength: minLength(5) },
      rekonstruieren: { minLength: minLength(5) },
    },
  },
  methods: {
    saveReflexion() {
      let uuid = this.getReflexionData.uuid;
      uuid ? this.updateReflexion() : this.addItem();
    },

    /** Reflexion wird in das Backend geladen */
    addItem() {
      if (!this.$v.$invalid) {
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
      if (!this.$v.$invalid) {
        var ausgabe = {
          sichten: this.sicht,
          title: this.getReflexionData.title,
          berichten_reagieren: this.getReflexionData.berichten_reagieren,
          in_bezug_setzen: this.getReflexionData.in_bezug_setzen,
          schlussfolgern: this.getReflexionData.schlussfolgern,
          rekonstruieren: this.getReflexionData.rekonstruieren,
          uuid: this.getReflexionData.uuid,
        };
        this.testButClicked = true;
        this.$store.dispatch("reflexion/updateReflexion", ausgabe);
      } else {
        alert("Bitte alles ausfüllen");
      }
    },
  },

  watch: {
    testButClicked(val) {
      if (val) {
        setTimeout(() => (this.testButClicked = false), 1000);
      }
    },
  },

  async mounted() {
    this.$store.dispatch("reflexion/loadReflexionFromBackend", this.sicht);
  },

  computed: {
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

@media only screen and (max-width: 600px) {
  .reflexion-item {
    flex-wrap: wrap !important;
  }
}

.reflexion {
  padding: 0 1rem 0 0;
}

.reflexion-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.reflexion-item label {
  min-width: 20%;
}
.reflexion-item textarea {
  min-width: 80%;
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

