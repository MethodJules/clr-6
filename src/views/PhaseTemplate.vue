<template>
    <div id="phase">
        <b-container fluid>
            <h2>Phase: {{this.phase}}</h2>
            <b-row>
                <b-col cols="10">
                </b-col>
                <b-col cols="2">
                    <Assistent/>
                </b-col>
            </b-row>
            <b-row>
                
                <b-col cols="2" class="border border-dark">  <InputDocuments/> </b-col>
                <b-col cols="6" class="border border-dark"> <DocumentationField/> </b-col>
                <b-col cols="2" class="border border-dark"> <OutputDocuments/> </b-col>
                
                
            </b-row>

            <br>
            <br>
            
            <b-row>
                
               
                
                <b-col cols="2" class="border border-dark">
                <UsedTools/>
                </b-col>
                
            </b-row>

            <br>
                
            <b-row>
                <TemplateButtons/>
                   

                    
                
            </b-row>
        </b-container>
    </div>
</template>
<script>
import InputDocuments from '@/components/InputDocuments.vue'
import DocumentationField from '@/components/DocumentationField.vue'
import UsedTools from '@/components/UsedTools.vue'
import OutputDocuments from '@/components/OutputDocuments.vue'
import TemplateButtons from '@/components/TemplateButtons.vue' 
import Assistent from '@/components/Assistent.vue'


export default {

    props: {
        phase: String
    },


    data() {
        return {
            
        }
    },

/*     props: {
        inDoku: Object
    }, */
    components:{
        InputDocuments,
        DocumentationField,
        UsedTools,
        OutputDocuments,
        TemplateButtons, 
        Assistent
        
    },

   
}
</script>