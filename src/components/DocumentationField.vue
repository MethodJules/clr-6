<template>
    <div>
    <b-container>
    <b-row>
    </b-row>
    <b-row class="#f8f9fa">
        <h2><b-badge >Dokumentation</b-badge></h2>
    </b-row>
    <b-row>
    <div class="card-body border border-dark">{{this.documentationList[5].documentation}}</div>
    <!-- <b-form-textarea @paste="onPaste" v-model="documentationText" debounce="500" rows="3" max-rows="5"></b-form-textarea> -->
     <!-- <div class="card-body border border-dark" ><pre class="mt-2 mb-0">{{rowData[5].documentation}}</pre></div> -->
    <br>
    <TemplateButtons :inDoku=inDoku></TemplateButtons>
    
    </b-row>
    </b-container>
  </div>
</template>
<script>

import TemplateButtons from './TemplateButtons.vue'
  export default {
    
    
    components:{
      TemplateButtons
    },
    data() {
      return {
                inDoku:{
          documentationText: " "
        },
        documentationList:[]
      }
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
    this.documentationList=this.rowData
    console.log(this.documentationList)
    console.log(typeof(this.documentationList))
    
  },
  }
</script>