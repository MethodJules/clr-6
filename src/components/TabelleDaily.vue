<template>
  <div class="hello">
    <div id="add-table"> </div>

     <div>

ab hier modal
  <b-button id="show-btn" @click="showAddRow ">Open Modal</b-button>
    <b-button id="show-btn" @click="showUpdateRow">Open Modal</b-button>

  <b-modal ref="bv-modal-example" size="xl" title="Daily Tabelle" hide-footer>
    <template #modal-title>
      Daily Tabelle
    </template>
    <div class="d-block text-center">
           <Formular v-bind:update_add='this.weitergabe'></Formular>
      <h3>Hello From This Modal!</h3>
    </div>
    <b-button class="mt-3" block @click="hideModal">Close Me</b-button>
  </b-modal>
</div>
hier ende modal
    <div id="button">
    <div id="button_container_1">
        
        <button type="button" class="btn btn-primary" @click="addItem()">Hinzufügen</button>
        <button type="button" class="btn btn-primary" @click="loadDaily()">Laden</button>
    </div>
<br>
</div>
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
                <td><button @click="updateRow(row)">Ändern</button></td> 
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
    update_add: {
        required: true,
        type: String
      }

  },

  components: {
            Formular
        },

  data() {
  
    return {
      weitergabe: "",
      date: "",
      doings: "",
      todaydoings: "",
      problems: "",

      rowData: [
        
        { date: "JJGJ", doings: "fhshdf ", todaydoings: "hfdshf", problems: "hjsdhfj"  },
        
      ]

    };  
  },
  
  methods: {

      showAddRow() {
        //$bvModal.show('bv-modal-example')
        this.$refs['bv-modal-example'].show()
        //propvalue="add"
        this.weitergabe="add"
      },
      showUpdateRow(row) {
        this.$refs['bv-modal-example'].show()
        this.weitergabe="update"
        // das hier alles als onbjekt prop mit weitergabe an formular geben, wo das dann in das formular eingesetzt wird? die add funktion gibt für die felder nur leere "" ein
        //oder in komponente formular eine funktion aufrufen, die alle felderr ausfüllt oder alles neulädt?
        //oder zwei formluare die mit v-if oder else-if geladen werden
        row.date
        row.doings
        row.todaydoings
        row.problems
        row.idd
        

      },
            hideModal() {
        this.$refs['bv-modal-example'].hide()
      },

    loadDaily() {
    },

        NewInputFormular() {

    },

        UpdateFormular() {

    },

    updateRow(row) {

      this.$store.dispatch('daily_scrum/updateDaily', row)

    },
/* 
hier mit button drücken methode aus formular aufrufen?
    addItem() {
           this.$store.dispatch('Formular/addItem')

        }, */


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
    
  }
    
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