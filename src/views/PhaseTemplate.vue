<template>
    <div id="phase">
        <b-container fluid>
            <b-row>

            </b-row>
            <b-row>
                <br>
                <b-col cols="2">
                    <br>
                    <b-row>
                        
                        <b-col class="border border-dark">
                            <InputDocuments/>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="border border-white">
                            <br>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="border border-dark">
                        <UsedTools/>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="7">
                    <br>
                        <DocumentationField/>
                    
                </b-col>
                <b-col cols="2">
                    <br>
                    <b-col class="border border-dark">
                            <OutputDocuments/>
                    </b-col>
                </b-col>
            </b-row>
            <br>
             
            <b-row>
                <b-col class="border border-dark">
                        <TemplateButtons/>
                </b-col>
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
export default {
    components:{
        InputDocuments,
        DocumentationField,
        UsedTools,
        OutputDocuments,
        TemplateButtons
    }
}
</script>