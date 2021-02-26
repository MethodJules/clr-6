<template>
    <div>
    <b-row class="title">
        
        <h3 >Input</h3> 
    </b-row>
    <b-row>
        
        <div class="card-body text-center "  v-for="inputDocs in listOfInputs" :key="inputDocs.file">
            <div class="text-center">
                {{inputDocs.file}}
            </div>
        
        </div>
    
    </b-row>
    
  </div>
</template>
<script>
  export default {
    data() {
      return {
        listOfInputs: [
            {file: 'Hilfsdokument 1'},
            {file: 'Hilfsdokument 2'},
            {file: 'Hilfsdokument 3'},
            {file: 'Vorlage 1'},
            {file: 'Vorlage 2'}
        ]
      }
    }
  }
</script>
<style>
    
    .title {
        width: auto;
        height: 100 px;
        background-color: rgb(78, 78, 78);
        
    }
    h3{
        color: white;
    }
</style>