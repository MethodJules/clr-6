<!-- App-Component -->
<template>
    <div id="app">
        <v-app>
            <v-main class="background">
                <!-- Suggestionsearch-->
                <v-container>
                    <div class="suggestionContainer">
                        <div class="labelSearch">
                            Suche:
                        </div>
                        <Suggestions :items="items" class="suggestionWidth">  </Suggestions>
                    </div>
                </v-container>
                <!-- Login-->
                <v-container>
                    <Login>  </Login>
                </v-container>
                <!-- Navigation-->
                <v-container>
                    <Navigation> </Navigation>
                </v-container>
                <!-- Content of Routernavigation-->
                <v-container>
                    <div class="home">
                        <router-view/>
                    </div>
                </v-container>

                <v-container>
                    <!-- PDF Preview, Download PDF -->
                    <vue-html2pdf :show-layout="controlValue.controlValue.showLayout"
                                  :preview-modal="true"
                                  filename="Test"
                                  @progress="onProgress($event)"
                                  :paginate-elements-by-height="1100"
                                  :pdf-quality="2"
                                  :html-to-pdf-options="htmlToPdfOptions"
                                  pdf-format="a4"
                                  pdf-orientation="portrait"
                                  pdf-content-width="800px"
                                  ref="html2Pdf">
                        <!-- generate router-view to content, only if ShowLayout is true -->
                        <div v-if="controlValue.controlValue.showLayout" slot="pdf-content"
                             :class="{'formatPDF': controlValue.controlValue.needHigh == 'standard', 'formatPDFReview': controlValue.controlValue.needHigh == 'review'}">
                            <router-view />
                        </div>
                    </vue-html2pdf>
                    <!-- Controlscontainer, change Attributes (currently only showLayout)-->
                    <PDFControl :progress="progress" @generateReport="downloadPdf()" />
                </v-container>

            </v-main>
        </v-app>
    </div>
</template>


<script>
    
    import Login from '@/components/Login'
    import Navigation from '@/components/Navigation.vue'
    import Suggestions from '@/components/Suggestions.vue'
    import PDFControl from '@/components/PDFControl.vue'
   
    import VueHtml2pdf from 'vue-html2pdf'
    import { mapState } from 'vuex'

    export default {
        name: 'App',
        components: {
            
            Navigation,
            Login, 
            Suggestions,
            
            VueHtml2pdf,
            PDFControl, 
        }, 

        watch: {
            // check route changes, if Review add a high to CSS 
            $route(to) {
                if (to.name == "Review") {
                    this.controlValue.controlValue.needHigh = "review";
                } else {
                    this.controlValue.controlValue.needHigh = "standard";
                }
                

            }
            
        },

        computed: {
            ...mapState({ controlValue: state => state.controlValue }),

            // HTML-PDF Options, informations to generate 
            htmlToPdfOptions() {               
                return {
                    margin: 0,
                    // documentname
                    filename: "name.pdf",
                    image: {
                        type: "jpeg",
                        quality: 0.98,
                    },
                    enableLinks: true,
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                    },
                    jsPDF: {
                        unit: "in",
                        format: 'a4',
                        orientation: 'portrait',
                    },
                };
            },
        },
        data() {
            return {
                // possible Suggestions
                items: [
                    'Literaturrecherche',
                    'Umweltprojekt',
                    'Elektrotechnik',
                    'Forschungsprojekt',
                    'Erneuerbare Energie', 
                    'Wasserstofffahrzeuge', 
                    'Business Model Canvas',
                    'Dienstleistungsengineering',
                    'neue Forschungsmethoden',
                    'Prokektmanagement',
                    'Prozessmanagement',
                ],
                contentRendered: false,
                progress: 0,
                generatingPdf: false,
                pdfDownloaded: false,
            }

        }, 
        methods: {
            // generatePDF and make download possible
            async downloadPdf() {
                if (!(await this.validateControlValue())) return;

                console.log(this.$refs);

                this.$refs.html2Pdf.generatePdf();
            },

            // check if valid PDF (check if controlValues are valid (currently no controlValues))
            validateControlValue() {
               return true
            },
            // Progress genarating PDF
            onProgress(progress) {
                this.progress = progress;
                console.log(`PDF generation progress: ${progress}%`)
            },

            // set content Rendered to true
            domRendered() {
                console.log("Dom Has Rendered");
                this.contentRendered = true;
            },       
        }
    }
</script>
<style>
    @import 'assets/style.css';
    .background {
        background-color: red;
        background-image: url('~@/assets/background2.jpg'); 
        width: 100%;
        height: 90%;
        position: absolute;
        background-size: cover
    }
    .sc-launcher {
        position: unset !important;
        height: 60px !important;
        margin-bottom: 20px !important;
        
    }

    .sc-launcher::before {
        position: unset !important;
        height: 60px !important;
        height:unset !important;
    }

    .sc-open-icon {
        position: unset !important;
       
    }

    .sc-closed-icon {
        position: unset !important;
    }

    .sc-chat-window {
        width: 20% !important;
        height: 50% !important;
    }

    .sc-header {
        height: 15% !important;
        min-height: unset !important;
    }
    .sc-header--title {
        font-size: 10px !important;
        min-height: unset !important;
    }

    .sc-message {
        width: unset !important;
        margin-right: 10px !important;
    }
    .sc-message--text {
        padding-bottom: 5px !important;
        padding-top: 5px !important;
        padding-left: 5px !important;
        padding-right: 5px !important;
        font-size: 12px !important;
        max-width: unset !important;

    }
    .sc-message--content.sent {
        margin-left: 15%;
    }

    .sc-message--text-content {
        margin-bottom: 0px;
    }

    .sc-user-input {
        min-height: unset !important;
        height: 10% !important;
    }
    .sc-user-input--text {
        height: 40px !important;
        min-height: unset !important;
        padding: 5px !important;
        width: 90% !important;
    }
    .sc-user-input--button {
        margin-left: 50px !important;
    }

    .suggestionContainer {
        background-color: white;
        position: absolute;
        width: 60%;      
        padding: 20px;
        top: 0;
        left: 10%;
        right: 0;
    }

    .suggestionWidth {
        width: 80%;
        float: left;
    }
    .labelSearch {
        width: 15%;
        float: left;
    }
    .formatPDF {
        background: white;
        width: 100%;
        height: 100%;
        padding: 30px;
        overflow: scroll;
    }

    .formatPDFReview {
        background: white;
        width: 100%;
        height: 90vh;
        padding: 30px;
        overflow: scroll;
    }
</style>

