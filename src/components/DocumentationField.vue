<template>
    <div>
        <b-container>
            <b-row class="#f8f9fa">
                <!-- <h2><b-badge >Dokumentation</b-badge></h2> -->
            </b-row>
            <b-row>
                <div class="card-body">
                    {{ this.documentationList[0].documentation }}
                    
                </div>
                <!--TODO: Bug hier wird der 6. Eintrag zwar aufgerufen, aber die eckigen Klammern sind da siehe http://localhost:8080/phasetemplate-->
                <!-- <b-form-textarea @paste="onPaste" v-model="documentationText" debounce="500" rows="3" max-rows="5"></b-form-textarea> -->
                <!-- <div class="card-body border border-dark" ><pre class="mt-2 mb-0">{{rowData[5].documentation}}</pre></div> -->
            </b-row>
        </b-container>
    </div>
</template>
<script>
import TemplateButtons from "./TemplateButtons.vue";
export default {
    components: {
        TemplateButtons,
    },
    props: {
        inDoku: Object,
    },
    data() {
        return {
            inDoku: {
                documentationText: " ",
            },
            documentationList: null,
        };
    },

    methods: {
        onPaste(evt) {
            console.log("on paste", evt);
            return true;
        },
    },

    computed: {
        getDocumentation() {
            console.warn(
                this.$store.state.phases.current_phase.documentationText
            );
            return this.$store.state.phases.current_phase.documentationText;
        },
    },

    async mounted() {
        await this.$store.dispatch("documentation/loadDocusFromBackend");
        const doc = this.$store.state.documentation.documentations;
        //console.log(doc)
        //console.log(typeof(doc))
        this.documentationList = doc;
        console.log(this.documentationList[0].idd + "das ist in dokfield");
    },
};
</script>