<template>
  <div class="hello">
    <div>
      <!-- Hier ist der Button, der Modal zum Eintragen eines neuen Daily öffnet. In dem Modal wird die Komponente Formular geöffnet.
      Dabei wird das/der prop formdata, ein Objekt übergeben, was attribute beinhaltet, die von formdata genutzt werden können -->
      <b-button id="show-btn" @click="showAddRow">Neuer Eintrag</b-button>
      <b-modal
        ref="bv-modal-example"
        size="xl"
        title="Daily Tabelle"
        hide-footer
      >
        <template #modal-title>
          <h3>Daily Tabelle</h3>
        </template>
        <div class="d-block text-center">
          <Form :formdata="formdata"></Form>
        </div>
        <b-button class="mt-3" block @click="hideModal">Close Me</b-button>
      </b-modal>
    </div>
    <br />
    <div id="Einsicht">
      <h3>Einsicht</h3>

      <table
        class="table table-striped table-hover table-bordered table-sm table-responsive"
      >
        <thead>
          <tr class="bg-danger text-light">
            <th class="text-center" scope="col">Datum</th>
            <th class="text-center" scope="col">Titel</th>
            <th class="text-center" scope="col">
              Was habe ich gestern gemacht?
            </th>
            <th class="text-center" scope="col">Was habe ich heute vor?</th>
            <th class="text-center" scope="col">Welche Probleme hatte ich?</th>
            <th class="text-center" scope="col">Button</th>
            <th class="text-center" scope="col">Button</th>
          </tr>
        </thead>
        <!-- row beinhaltet auch ID von Objekt/Content Type Instanz Ding - wird in loaddaily auch runtergeladen -->
        <tbody>
          <tr v-for="row in rowData" :key="row.id">
            <td class="text-center p-1">{{ row.date }}</td>
            <td class="text-center p-1">{{ row.title }}</td>
            <td class="text-center p-1">{{ row.doings }}</td>
            <td class="text-center p-1">{{ row.todaydoings }}</td>
            <td class="text-center p-1">{{ row.problems }}</td>
            <td class="text-center p-1">
              <button
                class="btn btn-outline-danger btn-sm"
                @click="deleteRow(row)"
              >
                Löschen
              </button>
            </td>
            <!-- <td><button @click="updateRow(row)">Ändern</button></td>  -->
            <td class="text-center p-1">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="showUpdateRow(row)"
              >
                Ändern
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Form from "@/components/Form";
import { mapGetters } from "vuex";

export default {
  name: "TabelleDaily",
  props: {
    msg: String,
  },

  components: {
    Form,
  },

  data() {
    return {
      //das objekt formdata wird mit leeren Strings initialisiert, weil das definieren der variablem alleine nicht möglich war
      formdata: {
        updateOrAdd: "",
        date: "",
        doings: "",
        todaydoings: "",
        problems: "",
        idd: "",
        title: "",
      },
      // rowData: [
      //   {
      //     date: "JJGJ",
      //     doings: "fhshdf ",
      //     todaydoings: "hfdshf",
      //     problems: "hjsdhfj",
      //   },
      // ],
    };
  },
  computed: {
    ...mapGetters({ rowData: "daily_scrum/getRowData" }),
  },
  methods: {
    showAddRow() {
      /*diese Methode wird aufgerufen, wenn mit dem Formular ein neuer Eintrag gemacht werden soll. this.$refs ist nur dazu da das modal anzuzeigen.
        danach werden den formdata attributen leere Strings zugewiesen. Das Attribut updateorAdd wird in Formular genutzt um nur den Add Button anzuzeigen */
      //$bvModal.show('bv-modal-example')
      this.$refs["bv-modal-example"].show();
      this.formdata.date = "";
      this.formdata.doings = "";
      this.formdata.todaydoings = "";
      this.formdata.problems = "";
      this.formdata.title = "";
      this.formdata.updateOrAdd = "add";
    },
    showUpdateRow(row) {
      //hier wird die row aus rowdata als parameter übergeben. aus der row werden die daten an das objekt übergeben
      this.$refs["bv-modal-example"].show();
      this.formdata.date = row.date;
      this.formdata.doings = row.doings;
      this.formdata.todaydoings = row.todaydoings;
      this.formdata.problems = row.problems;
      this.formdata.idd = row.idd;
      this.formdata.title = row.title;
      this.formdata.updateOrAdd = "update";
    },

    hideModal() {
      this.$refs["bv-modal-example"].hide();
    },

    /*     updateRow(row) {

      this.$store.dispatch('daily_scrum/updateDaily', row)

    }, */

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
};
</script>


<style scoped>
tbody tr:hover {
  background-color: #e7e4e4;
}
input {
  width: 60%;
}
b-form-datepicker {
  width: 60%;
}
.eingabe {
  border-style: none;
}
</style>