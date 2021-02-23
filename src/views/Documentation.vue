<template>
    <b-container>
        <b-row>
            <b-col>
                <b-row>
                    <b-col>
                        <div id="input">
                            <h3>Input</h3>
                            <ul>
                                <li>Hilfsdokument 1</li>
                                <li>Hilfsdokument 2</li>
                                <li>Hilfsdokument 3</li>
                                <li>Vorlage 1</li>
                                <li>Vorlage 2</li>
                            </ul>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <div id="applied_tools">
                            <h3>Verwendete Tools</h3>
                            <b-form-checkbox> Tool 1</b-form-checkbox>
                            <b-form-checkbox> Tool 2</b-form-checkbox>
                            <b-form-checkbox> Tool 3</b-form-checkbox>
                            <b-form-checkbox> Tool 4</b-form-checkbox>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <div id="documentation">
                    <h3>Dokumentation</h3>
                    <p>{{documentationText}}</p>
                </div>
                <b-modal id="documentation_edit_modal" title="Bearbeiten">
                    <b-form-textarea id="documentation_edit_form_textarea" rows="6" v-model="documentationText"></b-form-textarea>
                </b-modal>
            </b-col>
            <b-col>
                <div id="output" class="border border-dark">
                    <h3>Output</h3>
                    <ul>
                        <li>Outputdatei 1</li>
                        <li>Outputdatei 1</li>
                        <li>Outputdatei 1</li>
                        <li>Outputdatei 1</li>
                    </ul>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button>Zum Dashboard</b-button>
            </b-col>
            <b-col>
                <b-button v-b-modal.documentation_edit_modal>Dokumentation bearbeiten</b-button>
            </b-col>
            <b-col>
                <b-button>Phase abschließen</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            documentationText: ''
        }
    }
}
</script>