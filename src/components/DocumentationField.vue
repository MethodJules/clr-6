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
    <div class="card-body border border-dark" ><pre class="mt-2 mb-0">{{inDoku.documentationText}}</pre></div>
    <br>
    <TemplateButtons :inDoku= inDoku></TemplateButtons>
    
    </b-row>
    </b-container>
  </div>
</template>
<script>
  import TemplateButtons from '@/components/TemplateButtons'
  export default {
    data() {
      return {
        inDoku:{
          documentationText: " "
        }
       
      }
    },
    components:{
      TemplateButtons
    },
    methods:{
      onPaste(evt){
        
        console.log('on paste', evt)
        return true
      }
    }
  }
</script>