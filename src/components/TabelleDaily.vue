<template>
  <div class="hello">
    <div>
      <!-- Hier ist der Button, der Modal zum Eintragen eines neuen Daily öffnet. In dem Modal wird die Komponente Formular geöffnet.
      Dabei wird das/der prop formdata, ein Objekt übergeben, was attribute beinhaltet, die von formdata genutzt werden können -->
      <b-button id="show-btn" @click="showAddRow ">Neuer Eintrag</b-button>
      <b-modal ref="bv-modal-example" size="xl" title="Daily Tabelle" hide-footer>
        <template #modal-title>
          <h3>Daily Tabelle</h3>
        </template>
        <div class="d-block text-center">
              <Formular :formdata=formdata></Formular>
        </div>
        <b-button class="mt-3" block @click="hideModal">Close Me</b-button>
      </b-modal>
    </div>
      <br>
        <div id="Einsicht">
            <h3> Einsicht </h3>
            <table>
                <tr>
                    <th> Datum: </th>
                    <th> Was habe ich gestern gemacht? </th>
                    <th>Was habe ich heute vor?</th>
                    <th> Welche Probleme hatte ich? </th>
                </tr>
                <!-- row beinhaltet auch ID von Objekt/Content Type Instanz Ding - wird in loaddaily auch runtergeladen -->
                <tr v-for="row in rowData" :key="row.id">
                    <td> {{ row.date}} </td>
                    <td> {{row.doings}} </td>
                    <td>{{row.todaydoings}}</td>
                    <td> {{row.problems}} </td>
                    <td><button @click="deleteRow(row)">Löschen</button></td> 
                    <!-- <td><button @click="updateRow(row)">Ändern</button></td>  -->
                    <td><button @click="showUpdateRow(row)">Ändern</button></td> 

                </tr>

            </table>

    </div>
    </div>
</template>

<script>
import Formular from '@/components/Formular'
export default {
  
  
  name: 'TabelleDaily',
  props: {
    msg: String,
  },

  components: {
            Formular
        },

  data() {
  
    return {
      //das objekt formdata wird mit leeren Strings initialisiert, weil das definieren der variablem alleine nicht möglich war
    formdata: {
      updateOrAdd:"",
      date:"",
      doings:"",
      todaydoings:"",
      problems:"",
      idd:"",
      title: ""
  },
      rowData: [
        
        { date: "JJGJ", doings: "fhshdf ", todaydoings: "hfdshf", problems: "hjsdhfj"  },
        
      ]

    };  
  },
  
  methods: {

      showAddRow() {
        /*diese Methode wird aufgerufen, wenn mit dem Formular ein neuer Eintrag gemacht werden soll. this.$refs ist nur dazu da das modal anzuzeigen.
        danach werden den formdata attributen leere Strings zugewiesen. Das Attribut updateorAdd wird in Formular genutzt um nur den Add Button anzuzeigen */
       //$bvModal.show('bv-modal-example')
        this.$refs['bv-modal-example'].show()
        this.formdata.date=""
        this.formdata.doings=""
        this.formdata.todaydoings=""
        this.formdata.problems=""
        this.formdata.title=""
        this.formdata.updateOrAdd="add"
      },
      showUpdateRow(row) {
        //hier wird die row aus rowdata als parameter übergeben. aus der row werden die daten an das objekt übergeben
        this.$refs['bv-modal-example'].show()
        this.formdata.date=row.date
        this.formdata.doings=row.doings
        this.formdata.todaydoings=row.todaydoings
        this.formdata.problems=row.problems
        this.formdata.idd=row.idd
        this.formdata.title=row.title
        this.formdata.updateOrAdd="update"
      },

      hideModal() {
        this.$refs['bv-modal-example'].hide()
      },

/*     updateRow(row) {

      this.$store.dispatch('daily_scrum/updateDaily', row)

    }, */

/* 
        deleteRow(row) {
            alert("Delete");
              //console.log(row);
            this.$store.dispatch('daily_scrum/deleteDaily', row)
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
    this.$store.dispatch('daily_scrum/loadDailysFromBackend')
    this.rowData = this.$store.state.daily_scrum.rowData
    
  },
    
}

</script>



<style scoped>


table, td, th {
  height: 30px;
  border: 1px solid black;
  text-align: left;
}

table {
  width: 100%;
  border-collapse: collapse;
}
input {
  width: 60%;
}
b-form-datepicker{
  width: 60%;
}
.eingabe{
  border-style: none;
}
</style>