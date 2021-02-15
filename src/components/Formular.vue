<template>
  <div class="hello">
      <form target="1">

      <table class="eingabe" >
      <tr>
        <!-- hier werden die des übergebenen Objekts aus TabelleDaily in den Felder gespeichert -->
        <b-form-datepicker id="example-datepicker" v-model="formdata.date" class="mb-2"></b-form-datepicker>
        </tr>
      <tr>
      <td><label for = "titel">Titel</label></td>
      <td> <input v-model="formdata.title" type ="text" placeholder="Geben Sie einen Titel ein!"></td>
        <br>
      </tr>
      <tr>
      <td><label for = "gestern">Was habe ich gestern gemacht?</label></td>
      <td> <input v-model="formdata.doings" type ="text" placeholder="Geben Sie ein, was sie gemacht haben!"></td>
        <br>
      </tr>
      <tr> 
      <td><label for = "heute">Was habe ich heute vor?</label></td>
        <td><input v-model="formdata.todaydoings" type ="text" placeholder="Geben Sie ein was Sie heute vor haben!">
        <br></td></tr>

      <tr>  <td><label for = "probleme">Welche Probleme hatte ich? </label></td>
        <td><input v-model="formdata.problems" type ="text" placeholder="Geben Sie ein, welche Probleme es gab!"></td>
      </tr>
      </table>
      <div style ="margin:10px">
        <div v-if="formdata.updateOrAdd==='add'">
            <button type="button" class="btn btn-primary" @click="addItem()">Hinzufügen</button>
        </div>
        <div v-else-if="formdata.updateOrAdd==='update'">
            <button type="button" class="btn btn-primary" @click="updateRow(formdata)">Ändern</button>
        </div>
      </div>
      </form>
      <br>
    </div>
</template>

<script>

  export default {
        props: {
    formdata: Object

    },
 data() {
  
    return {

    }
  },
  
  methods: {
        test() {
          console.log("hallo");
    },


    updateRow(formdata) {
      this.$store.dispatch('daily_scrum/updateDaily', formdata)
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
    console.log(this.formdata)
    
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