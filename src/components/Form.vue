<template>
  <div class="form-group">
    <!-- We need to define each property of bootstrap vue again in order to use them. 
    Thats why using another component just makes things harder. 
    There are already bootstrap vue buttons, which work like a component. 
    Thats why I am deleting this button component here. 
    I think we can delete the whole component too.  -->

    <!-- Why do we have a button for concept here???? -->
    <b-button block variant="outline-primary" href="./concept" class="mb-2"
      >Concept</b-button
    >

    <form target="1">
      <!-- hier werden die des übergebenen Objekts aus TabelleDaily in den Felder gespeichert -->
      <b-form-datepicker
        id="datepicker-placeholder"
        v-model="formdata.date"
        class="mb-2"
        placeholder="Wahlen Sie ein Datum aus."
        today-button
        label-today-button="Heute"
        calendar-width="100%"
        menu-class="w-100"
        start-weekday="1"
        locale="de"
        labelHelp="Mit den Pfeiltasten durch den Kalender navigieren"
        labelNoDateSelected="Kein Datum gewählt"
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

      <div>
        <div v-if="formdata.updateOrAdd === 'add'" class="mt-2">
          <b-button block variant="primary" @click="addItem()">
            Hinzufügen
          </b-button>
        </div>
        <div v-else-if="formdata.updateOrAdd === 'update'">
          <b-button block variant="primary" @click="updateRow(formdata)">
            Ändern
          </b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    formdata: Object,
  },

  methods: {
    updateRow(formdata) {
      this.$store.dispatch("daily_scrum/updateDaily", formdata);
      // we cannot update state here. look at updateDaily methode..
    },

    addItem() {
      this.$store.dispatch("daily_scrum/createDaily", this.formdata);
      // QUESTION??????
      // This line below does not work because our modal is in another component.
      // Why do we have another component for this form. They can be together and our modal would work better.
      this.$refs["bv-modal-example"].hide();

      // We do not need all of them.
      // We just need to take the values with getters and computed.
      // After that we need to update state with commit.
      // computed will triggered and take the values from state again.
      // our component is renewed without renewing the page.

      // var ausgabe = {
      //   date: this.formdata.date,
      //   doings: this.formdata.doings,
      //   todaydoings: this.formdata.todaydoings,
      //   problems: this.formdata.problems,
      //   title: this.formdata.title,
      // };

      // overrites the rowData here in component.
      // this.rowData.push(ausgabe);

      // this.date = "";
      // this.doings = "";
      // this.todaydoings = "";
      // this.problems = "";
      // this.title = "";
    },

    deleteRow(row) {
      alert("Delete");
      this.$store.dispatch("daily_scrum/deleteDaily", row);
    },
    hideModal() {
      this.$refs["bv-modal-example"].hide();
    },
  },
};
</script>



<style scoped>
input {
  width: 100%;
}
.form-group {
  padding: 0.5rem 0;
}
</style>