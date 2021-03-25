<template>
    <b-row>
                <b-col cols="2">
                    
                    <b-link :to="{name: 'Home'}" class="btn btn-outline-dark btn-block mb-2">Zum Dashboard</b-link>
                    
                </b-col>

                <b-col cols="7">
                    <b-modal id="documentation_edit_modal" title="Bearbeiten">
                            <b-form-textarea id= "documentation_edit_form_textarea" rows="6" v-model="inDoku.documentationText"></b-form-textarea>
                            <b-button @click="addTheDocu()">Hinzufügen</b-button>
                    </b-modal>
                    <b-button v-b-modal.documentation_edit_modal>Dokumentation bearbeiten</b-button>
                    <!-- <b-link :to="{name: 'Concept'}" class="btn btn-outline-dark btn-block mb-2">Dokumentation bearbeiten</b-link>   -->
                   <!-- <div>{{inDoku.documentationText}}</div> -->
                </b-col>

                <b-col cols="2">
                    

                    <b-button v-b-modal.modal-phase class="mb-phase"> Phase abschließen
                    
                    </b-button>
                   
                    <b-modal id="modal-phase" title="Bist du dir Sicher?">
                    <p class="my-phase">Hast du Checkliste gemacht? </p>
                    </b-modal>
                
               
                </b-col>
    </b-row>
</template>
<script>


export default {
    components: {
        

    },
    data() {
        return {
            
        }
    },
    props: {
        inDoku: Object
    },
    methods:{
        addTheDocu() {
            var ausgabe={
                //documentationText: this.documentation,
                documentationText: this.inDoku.documentationText
               // title: this.inDoku.title
            }
            
            this.$store.dispatch('documentation/createDocumentation', ausgabe)
            //this.documentationText.push(ausgabe)
            
            //this.docus.push(ausgabe)
            this.documentationText= ' '
      },
      
    },
    mounted() {
    console.log(this.inDoku)
    
  }
}
</script>