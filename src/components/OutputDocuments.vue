<template>
    <div>
    <b-row class="title">
        
        <h3 >Output</h3> 
    </b-row>
    <b-row>
        
        <div class="card-body text-center "  v-for="outputDocs in listOfOutputs" :key="outputDocs.file">
            <div class="text-center">
                {{outputDocs.file}}
            </div>
        
        </div>
    
    </b-row>
    
  </div>
</template>
<script>
  export default {
    data() {
      return {
        listOfOutputs: [
            {file: 'Outputdatei 1'},
            {file: 'Outputdatei 2'},
            {file: 'Outputdatei 3'}
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