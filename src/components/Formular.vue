<template>
  <div class="hello">
    <div v-if="update_add==='add'">add

      <form target="1">

      <table class="eingabe" >
      <tr>
        <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2"></b-form-datepicker> </tr>
      <tr>
      <td><label for = "gestern">Was habe ich gestern gemacht?</label></td>
      <td> <input v-model="doings" type ="text" placeholder="Geben Sie ein, was sie gemacht haben!"></td>
        <br>
      </tr>
      <tr> 
      <td><label for = "heute">Was habe ich heute vor?</label></td>
        <td><input v-model="todaydoings" type ="text" placeholder="Geben Sie ein was Sie heute vor haben!">
        <br></td></tr>

      <tr>  <td><label for = "probleme">Welche Probleme hatte ich? </label></td>
        <td><input v-model="problems" type ="text" placeholder="Geben Sie ein, welche Probleme es gab!"></td>
      </tr>
      </table>
            <button type="button" class="btn btn-primary" @click="addItem()">Hinzufügen</button>
      </form>
      <br>
    </div>
    <h3 v-else-if="update_add==='update'">update</h3>
   </div>
</template>

<script>

  export default {
    props: {
      update_add: {
        required: true,
        type: String
      }
    },
  
  methods: {
        test() {
          console.log("hallo");
    },

    loadDaily() {
    },

    updateRow(row) {

      this.$store.dispatch('daily_scrum/updateDaily', row)

    },


    addItem() {
            var ausgabe = {
                date: this.date,
                doings: this.doings,
                todaydoings: this.todaydoings,
                problems: this.problems
            };

            this.$store.dispatch('daily_scrum/createDaily', ausgabe)
            this.rowData.push(ausgabe)

            this.date = ''
            this.doings = ''
            this.todaydoings= ''
            this.problems = ''
        },


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