<template>
  <div class="form-group">
    <Button
      :button="{
        name: 'Concept',
        link: './concept',
      }"
    ></Button>
    <form target="1">
      <!-- hier werden die des übergebenen Objekts aus TabelleDaily in den Felder gespeichert -->
      <b-form-datepicker
        id="example-datepicker"
        v-model="formdata.date"
        class="mb-2"
      ></b-form-datepicker>

      <div class="form-group row">
        <label class="col-sm-3 text-left text-dark" for="titel">Titel</label>
        <div class="col-sm-9">
          <input
            v-model="formdata.title"
            type="text"
            placeholder="Geben Sie einen Titel ein!"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 text-left text-dark" for="gestern"
          >Was habe ich gestern gemacht?</label
        >
        <div class="col-sm-9">
          <input
            v-model="formdata.doings"
            type="text"
            placeholder="Geben Sie ein, was sie gemacht haben!"
          />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-3 text-left text-dark" for="heute"
          >Was habe ich heute vor?</label
        >
        <div class="col-sm-9">
          <input
            v-model="formdata.todaydoings"
            type="text"
            placeholder="Geben Sie ein was Sie heute vor haben!"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 text-left text-dark" for="probleme"
          >Welche Probleme hatte ich?
        </label>
        <div class="col-sm-9">
          <input
            v-model="formdata.problems"
            type="text"
            placeholder="Geben Sie ein, welche Probleme es gab!"
          />
        </div>
      </div>

      <div style="margin: 10px">
        <div v-if="formdata.updateOrAdd === 'add'">
          <button type="button" class="btn btn-primary" @click="addItem()">
            Hinzufügen
          </button>
        </div>
        <div v-else-if="formdata.updateOrAdd === 'update'">
          <button
            type="button"
            class="btn btn-primary"
            @click="updateRow(formdata)"
          >
            Ändern
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Button from "@/components/Button";
//import Button from './Button.vue';
export default {
  props: {
    formdata: Object,
  },

  components: {
    Button,
  },

  data() {
    return {
      /*     button: {
      buttonlink:"./concept",
      buttonname:"Concept",
  }, */
    };
  },

  methods: {
    test() {
      console.log("hallo");
    },

    updateRow(formdata) {
      this.$store.dispatch("daily_scrum/updateDaily", formdata);
    },

    addItem() {
      var ausgabe = {
        date: this.formdata.date,
        doings: this.formdata.doings,
        todaydoings: this.formdata.todaydoings,
        problems: this.formdata.problems,
        title: this.formdata.title,
      };

      this.$store.dispatch("daily_scrum/createDaily", this.formdata);
      this.rowData.push(ausgabe);

      this.date = "";
      this.doings = "";
      this.todaydoings = "";
      this.problems = "";
      this.title = "";
    },

    deleteRow(row) {
      alert("Delete");
      //console.log(row);
      this.$store.dispatch("daily_scrum/deleteDaily", row);
    },

    /*     deleteRow(id, row){
      var indx = this.rowData.indexOf(row);
      console.log(indx, row.id) ;
      if(indx > -1){
        this.rowData.splice(indx, 1);
      }
      this.$store.dispatch('daily_scrum/deleteDaily', indx)

    } */
  },

  mounted() {
    console.log(this.formdata);
  },
};
</script>



<style scoped>
input {
  width: 100%;
}
.form-group {
  padding: 0.5rem;
}
</style>