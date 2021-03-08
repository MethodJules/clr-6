<template>
    <b-row>
                <b-col cols="2">
                    
                    <b-link :to="{name: 'Concept'}" class="btn btn-outline-dark btn-block mb-2">Zum Dashboard</b-link>
                    
                </b-col>

                <b-col cols="7">
                    <b-modal id="documentation_edit_modal" title="Bearbeiten">
                            <b-form-textarea id="documentation_edit_form_textarea" rows="6" v-model="inDoku.documentationText"></b-form-textarea>
                            <b-button @click="addTheDocu(inDoku.documentationText)">Hinzufügen</b-button>
                    </b-modal>
                    <b-button v-b-modal.documentation_edit_modal>Dokumentation bearbeiten</b-button>
                    <!-- <b-link :to="{name: 'Concept'}" class="btn btn-outline-dark btn-block mb-2">Dokumentation bearbeiten</b-link>   -->
                   <!-- <div>{{inDoku.documentationText}}</div> -->
                </b-col>

                <b-col cols="2">
                    <b-link :to="{name: 'Concept'}" class="btn btn-outline-dark btn-block mb-2">Phase abschließen</b-link>
                </b-col>
    </b-row>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        inDoku: String
    },
    methods:{
        /* addTheDocu(documentationText) {
            
            documentationText=this.documentationText
            documentationText= " "
      }, */
      
    }
}
</script>