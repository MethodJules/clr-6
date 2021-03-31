<!-- PDF Control Template, generate Controloptions and open "Create PDF" -->
<template>
    <div>
        <!-- Button to create an PDF, open the Controlpanel -->
        <b-button @click="createPDF" class="pdfSave"> PDF erstellen </b-button>
        
        <!-- show PDF-Preview -->
        <section v-if="showPDF" class="control-container">

            <section class="control">
                <span class="close">
                    <!--Button to close PDF-Downloadpanel and Preview -->
                    <b-button @click="closePDF"> X </b-button>
                </span>
                <!-- Show / Disable Preview with checkbox-->
                <span class="item-label">
                    Show Preview
                </span>
                <input type="checkbox"
                       v-model="controlValue.controlValue[showLayout]"
                       value="controlValue.controlValue[showLayout]"
                       @input="setInput($event, showLayout)" />
            </section>

            <!-- Possible to create more options here -->


            <!-- Button to generate and save PDF -->
            <b-button :disabled="isGenerating"
                      class="generate-btn"
                      @click="$emit('generateReport')">
                {{ isGenerating ? 'Loading...' : 'Generate PDF' }}
            </b-button>
            <!-- Progress bar -->
            <section class="progress-container">
                <div class="progress-bar">
                    <div class="progress"
                         :style="`width: ${progress}%;`" />
                </div>
                <section class="generating-label" v-if="progress !== 0">
                    <span class="label-title">
                        {{ progress === 100 ? 'PDF Generated' : 'Generating PDF' }}
                    </span>

                    <span class="label-progress">
                        {{ `${ progress } %` }}
                    </span>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        props: {
            // Progressbar 
            progress: {
                type: Number,
                default: 0
                }
            },
            data() {
                return {           
                    showPDF: false,
                    // helper to show/ disable preview 
                    showLayout: "showLayout"
                }
            },
            computed: {
                ...mapState({ controlValue: state => state.controlValue }), 

                isGenerating() {
                    return this.progress !== 0 && this.progress !== 100
                }
            },
        methods: {
                // open ControlPanel, set showPDF to true, to show preview and Controlpanel 
                createPDF() {
                    this.$set(this.controlValue.controlValue, "showLayout", true);
                    this.showPDF = true; 
            }, 
                // set Checkboxvalue to disable / enable preview 
                setInput(e, key) {
                    let value = e.target.value
                    value = e.target.checked
                    this.$set(this.controlValue.controlValue, key, value);
            }, 
                // close ControlPanel, set showPDF to false, to disable preview and Controlpanel 
                closePDF() {
                    this.showPDF = false;
                    this.$set(this.controlValue.controlValue, "showLayout", false);
                }
            },
    }
</script>

<style lang="scss" scoped>

    .control-container {
        position: fixed;
        z-index: 999999;
        padding: 15px;
        display: flex;
        flex-direction: column;
        background: #fff;
        border-radius: 5px;
        right: 25px;
        top: 25px;
        width: 405px;
        box-shadow: 5px 5px 10px #000000;
        max-height: calc(100vh - 50px);
    }
    .pdfSave {
        position: fixed;
        bottom: 0;
        left: 0;
    }

</style>