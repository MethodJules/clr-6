<template>
    <div>
    <b-container>
    <b-row>
    </b-row>
    <b-row class="#f8f9fa">
        <h2><b-badge >Dokumentation</b-badge></h2>
    </b-row>
    <b-row>
    
    <!-- <b-form-textarea @paste="onPaste" v-model="documentationText" debounce="500" rows="3" max-rows="5"></b-form-textarea> -->
     <div class="card-body border border-dark" ><pre class="mt-2 mb-0">{{rowData[5].documentation}}</pre></div>
    <br>

    
    </b-row>
    </b-container>
  </div>
</template>
<script>
  export default {

    props: {
     indoku: Object
    },
    data() {
      return {
       
      }
    },
    components:{

    },
    methods:{
      onPaste(evt){
        
        console.log('on paste', evt)
        return true
      }
    },
    mounted() {
    this.$store.dispatch('documentation/loadDocusFromBackend')
    this.rowData = this.$store.state.documentation.rowData
    
  },
  }
</script>