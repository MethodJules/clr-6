<template>
    <div id="phase">
        <b-container fluid>
            <!-- gibt an in welcher Phase man sich befindet -->
            <h2>{{phaseId}}</h2>
            <h2>{{projectId}}</h2>  
            <h2>Phase: {{xphase.phase_name}}</h2>
            <b-row>
                <b-col cols="10">
                </b-col>
                <b-col cols="2">
                    <!-- Greift auf die Assistent Komponente -->
                    <Assistent/>
                </b-col>
            </b-row>
            <b-row>
                <!-- Greift auf die Input felder, die Dokumentation und die Outputfelder -->
                <b-col cols="2" class="border border-dark">  <InputDocuments/> </b-col>
                <b-col cols="8"> <DocumentationField/> </b-col>
                <b-col cols="2" class="border border-dark"> <OutputDocuments/> </b-col>


            </b-row>

            <br>
            <br>

            <b-row>



                <b-col cols="2" class="border border-dark">
                    <!-- Geht auf die Komponente Verwendete Tools -->
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

    //props: {
    //    phase: String
    //},


    data() {
        return {
            phaseId: this.$route.params.phase_id,
            projectId: this.$route.params.project_id
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

    computed: { 
        xphase() {
            return this.$store.state.phases.phases.find(
                phase => phase.phase_id === this.$route.params.phase_id
            );
        }
    },

    async mounted() {
        this.$store.dispatch('phases/loadSinglePhaseFromState', {phaseId: this.$route.params.phase_id})

              console.log(this.$store.state.phases)
  },

   


}
</script>