<template>
    <div>
    <b-container>
    <b-row>
    </b-row>
    <b-row class="#f8f9fa">
        <h2><b-badge >Dokumentation</b-badge></h2>
    </b-row>
    <b-row>
    <div class="card-body border border-dark">{{this.documentationList[5].documentation[0]}}</div> <!--TODO: Bug hier wird der 6. Eintrag zwar aufgerufen, aber die eckigen Klammern sind da siehe http://localhost:8080/phasetemplate-->
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
        documentationList: null,
      }
    },

    methods:{
      onPaste(evt){

        console.log('on paste', evt)
        return true
      }
    },
    async mounted() {
      await this.$store.dispatch('documentation/loadDocusFromBackend')
      const doc = this.$store.state.documentation.documentations
      console.log(doc)
      console.log(typeof(doc))
      this.documentationList = doc
  },
  }
</script>