<template>

    <div class="home">
        <h1>
            CONCEPT MAP
        </h1>
        <div v-if="newconcept" @click="openConcept()" class="newConcept">
            <h1 class="centerText">
                +
            </h1>
        </div>
        <div v-if="concept" @click="openConcept()" class="conceptMap">
            <div class="showElements">
                <ConceptList @childToParent="onChildClick($event)" />
                <div class="newElement">
                    <v-btn class="addButton" @click="openCreateConceptModal"> + </v-btn>
                </div>
                <div class="recomander">
                    <v-btn class="addButton" @click="openRecommander"> Recommander </v-btn>
                </div>

            </div>
            <div class="viewConcept">
                <ConceptMap @parentToChild="onParentClick($event)" />
                <!-- <div class="modalView" v-if="showModal">
        <CreateConnection @closeModal="closeModal($event)" :source=target />
    </div> -->
                <!-- Modal für die Erstellung eines neuen Konzeptes aus der Liste in die Map -->
                <b-modal id="create_connection_modal" hide-footer>
                    <div class="d-block text-center">
                        <h1>Create Connection</h1>

                        <table>
                            <tr>
                                <td> Source: </td>
                                <td> <b-form-select v-model="source_uuid" :options="source_options"></b-form-select></td>

                            </tr>
                            <tr>
                                <td> Target: </td>
                                <td>{{target.name}}</td>
                            </tr>
                            <tr>
                                <td> Name: </td>
                                <td> <b-form-input v-model="relationship_label" placeholder="Bitte geben Sie hier die Bezeichnung ein."> </b-form-input></td>
                            </tr>
                        </table>


                        <!-- <div v-for="option in target_options" :key="option.value.id">
                <p><b>Connect to:</b> {{option.value.concept}}</p>
            </div> -->
                        <b-button class="mt-3" block @click="createNewConncetionToConceptMap">Speichern</b-button>
                    </div>
                </b-modal>

                <!-- Modal für die Erstellung eines neuen Konzeptes aus der Map in die Map -->
                <b-modal id="create_connection_modal_net" hide-footer>
                    <div class="d-block text-center">
                        <h1>Create Connection </h1>

                        <table>
                            <tr>
                                <td> Source: </td>
                                <td>{{source.name}}</td>
                            </tr>
                            <tr>
                                <td> Target: </td>
                                <td> <b-form-select v-model="target_uuid_map" :options="target_options"></b-form-select></td>
                            </tr>
                            <tr>
                                <td> Name: </td>
                                <td> <b-form-input v-model="relationship_label" placeholder="Bitte geben Sie hier die Bezeichnung ein."> </b-form-input></td>
                            </tr>
                        </table>
                        <b-button class="mt-3" block @click="createNewConncetionToConceptMapFromMap">Speichern</b-button>
                    </div>
                </b-modal>

                <!-- Modal für die Erstellung eines neuen Konzeptes  -->
                <b-modal id="create_concept_modal" hide-footer>
                    <div class="d-block text-center">
                        <h1>Neues Concept erstellen</h1>
                        <b-form-input v-model="concept_name" placeholder="Bitte geben Sie hier den Concept Namen ein"></b-form-input>
                    </div>
                    <b-button class="mt-3" block @click="addElement">Speichern</b-button>

                </b-modal>

                 <b-modal id="create_recommander_modal" hide-footer>
                    <div class="d-block">
                        <h1>Recommander</h1>
                        <b-form-group>
                            <b-form-checkbox-group size="lg" id="recommander" v-model="selectedRecommanders" :options="recommands" name="recommander" stacked></b-form-checkbox-group>
                        </b-form-group>
                                 </div>
                    <b-button class="mt-3" block @click="createRecommands">erstellen</b-button>

                </b-modal>

            </div>
        </div>

        <div class="comments">
            
            <CommentForm/>

        </div>

    </div>
</template>



<script>

import ConceptMap from '@/components/ConceptMap'
//import CreateConnection from '@/components/CreateConnection'
    import ConceptList from '@/components/ConceptList'
    import CommentForm from '@/components/CommentForm'
import {mapState} from 'vuex'


    export default {
        name: 'Home',
        data: function () {
            return {
                spliceConcepts: [],
                newconcept: false, //TODO: Muss später geändert werden, damit man neue Concept Maps erstellen kann.
                concept: true,
                showModal: false,
                fromChild: '',
                target: '',
                source: '',
                concept_name: '',
                // Variablen, um neues Konzept aus der Liste hinzuzufügen
                source_uuid: null,
                target_uuid: {},
                // Variablen, um neues Konzept aus der Map heraus hinzuzufügen
                target_uuid_map: null,
                source_uuid_map: {},
                
                target_options: [],
                source_options: [],
                relationship_label: '',
                // Variable für die ausgewählten Vorschläge
                selectedRecommanders: [], 
                recommands: []
            }
        },
        components: {
            ConceptMap,
            //CreateConnection,
            ConceptList,
            CommentForm
        },
        methods: {
            closeModal(value) {
                this.showModal = value
            },

            // aus Liste neues Konzept zu Map hinzufügen
            onChildClick(value) {
                //console.log(value)
                //this.showModal = true
                this.target = value
                this.openCreateConnectionModal();

            },

            // aus Map neues Konzept hinzufügen
            onParentClick(value) {
                console.log(value)
                //this.showModal = true       
                this.source = value
                this.openCreateConnectionModalNet();
                
                

            },

            // Load targets from database
            loadTarget() {    

                this.conceptList = this.$store.state.concepts.concepts;
                this.spliceConcepts = [];
                this.target_options = [];
                /*
                this.$store.state.concepts.concepts.forEach(element => {
                    for (let map of this.$store.state.concept_map.nodes) {


                        if (element.id == map.uuid) {
                            this.spliceConcepts.push(element);
                        }
                    }
                })
                
                console.log(this.spliceConcepts);
                for (let splice of this.spliceConcepts) {
                    this.conceptList.splice(this.conceptList.indexOf(splice), 1);
                }
                */

                this.conceptList.forEach(element => {
                    //console.log(element);
                    this.target_options.push({ value: { id: element.nid, uuid: element.id, concept: element.name }, text: element.name });
                });


                this.target_options.forEach(element => {
                    
                    if (element.value.uuid == this.source.uuid) {
                        this.target_options.splice(this.target_options.indexOf(element), 1);
                    }       
                });

            },

            lcb(link) {
                link._svgAttrs = {'marker-end': 'url(#m-end)'}
                return link
            },
            openConcept() {
                this.newconcept = false;
                this.concept = true;

            },
            addElement() {
                //alert("Hinzuf�gen");

                this.conceptList = this.$store.state.concepts.concepts;
                var isEqual = false;

                this.conceptList.forEach(element => {
                    if (element.name === this.concept_name) {
                        alert("Konzeptname ist gleich");
                        isEqual = true;
                    }
                })
                if (!isEqual) {
                    this.$store.dispatch('concepts/addConcept', this.concept_name);
                    this.$bvModal.hide('create_concept_modal');
                }

             

                //console.log(this.$store.state.items);
                //TODO: Concept hinzufuegen
            },
            // load sources
            loadConceptMap() {
                this.source_options = [];
                this.concepts.forEach(element => {
                    this.source_options.push({value: {id: element.id, uuid: element.uuid, concept: element.name}, text: element.name});
                });               
            },

            openCreateConceptModal() {
                this.$bvModal.show('create_concept_modal');
            },
            // open Connection Modal from list
            openCreateConnectionModal() {
                this.loadConceptMap();
                this.$bvModal.show('create_connection_modal');
            },
            // open Connection Modal from map
            openCreateConnectionModalNet() {
                this.loadTarget();
                this.$bvModal.show('create_connection_modal_net');
            },

            // opern Recommander Modal 
            openRecommander() {
                // recommands austauschen durch variable Liste
                this.recommands = [
                    { text: 'Konzept 1', value: 'concept1' },
                    { text: 'Konzept 2', value: 'concept2' },
                    { text: 'Konzept 3', value: 'concept3' },
                    { text: 'Konzept 4', value: 'concept4' },
                    { text: 'Konzept 5', value: 'concept5' },
                    { text: 'Konzept 6', value: 'concept6' }
                ];

                this.$bvModal.show('create_recommander_modal');
            },

            // Ausgewählte Recommands anlegen
            createRecommands() {
                console.log(this.selectedRecommanders);
                this.conceptList = this.$store.state.concepts.concepts;

               

                this.selectedRecommanders.forEach(concept => {
                    var isEqual = false;

                    this.conceptList.forEach(element => {
                        if (element.name === concept) {
                            alert("Konzept"  + concept + " existiert bereits und wurde nicht erstellt");
                            isEqual = true;
                        }
                    })
                    if (!isEqual) {
                        this.$store.dispatch('concepts/addConcept', concept);
                        
                    }
                })

                  this.$bvModal.hide('create_recommander_modal');
    
                

            },

            createNewConncetionToConceptMap() {
                console.log(this.target_uuid);
                console.log(this.target);
                this.target_uuid.concept = this.target.name;
                this.target_uuid.id = this.target.nid;
                this.target_uuid.uuid = this.target.id;

                var isExisting = false;

                //Add Concept to Concept Map
                for (let map of this.$store.state.concept_map.nodes) {
                    if (map.uuid == this.target_uuid.uuid) {
                        isExisting = true; 
                    }
                }
                if (!isExisting) {
                    this.$store.dispatch('concept_map/addConceptToConceptMap', this.target_uuid); //TODO: target_uuid ändern in semantisch korrekte bezeichnung

                }
                 this.$store.dispatch('concept_map/addRelationshipToConceptMap', {source: this.source_uuid, target: this.target_uuid, name: this.relationship_label});
                this.$bvModal.hide('create_connection_modal');
            },

            createNewConncetionToConceptMapFromMap() {    
                console.log(this.source);
                this.source_uuid_map.concept = this.source.name;
                this.source_uuid_map.id = this.source.id;
                this.source_uuid_map.uuid = this.source.uuid;

                var isExisting = false;

                for (let map of this.$store.state.concept_map.nodes) {

                    if (map.uuid == this.target_uuid_map.uuid) {
                        isExisting = true;
                    }
                }
                if (!isExisting) {      
                    this.$store.dispatch('concept_map/addConceptToConceptMap', this.target_uuid_map); //TODO: target_uuid ändern in semantisch korrekte bezeichnung

                }
                this.$store.dispatch('concept_map/addRelationshipToConceptMap', { source: this.source_uuid_map, target: this.target_uuid_map, name: this.relationship_label });
                this.$bvModal.hide('create_connection_modal_net');
            }

        },
        async mounted() {
            await this.$store.dispatch('concept_map/loadConceptMapFromBackend');
        },
        computed: {
        ...mapState({concepts: state => state.concept_map.nodes})
        },

}
</script>
<style>

    .home {
        width: 70%;
        background-color: white;
        height: 85%;
        position: absolute;
        top: 10%;
        left: 5%;
        padding: 30px
    }

    h1 {
        color: #c93e37;
    }
    .newConcept {
        border: dashed;
        border-color: #c93e37;
        height: 30%;
        width: 25%;

    }
    .centerText {
        margin-top: 30%;
        margin-left: 40%;
    }
    .viewConcept {
        border: dashed;
        border-color: #c93e37;
        height: 75%;
        width: 70%;
        position: absolute;
        right: 10px;
    }

    .showElements {
        border: dashed;
        border-color: #c93e37;
        height: 75%;
        width: 25%;
        position: absolute;
        left: 10px;
    }
    .addButton {
        position: relative;
        margin-bottom: 10px;
        color: #c93e37;
    }
    .scrollbar {
        width: 100%;
        height: 80%;
    }
    .newElement {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #c93e37;
    }
    .recomander {
        position: absolute;
        right: 40px;
        bottom: 10px;
        color: #c93e37;
    }
    .listElement {
        border: dashed;
        width: 90%;
        margin-left: 5%;
        float: left;
        text-align: center;
        color: white
    }
    .listIcon {
        background-color: #c93e37;
        float: left;
        margin-right: 3px;
        width: 10%;
        cursor: pointer;
    }
    .listName {
        background-color: #c93e37;
        width: 75%;
        margin-right: 3px;
        float: left;
    }
    .listArrow {
        background-color: #c93e37;
        width: 10%;
        float: left;
        cursor: pointer;
    }

    .modalView {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        width: 100%;
        height: 30%;
        max-width: 400px;
        background-color: #FFF;
        border: solid;
        border-color: #c93e37;
        border-width: 2px;
        padding: 25px;
        box-shadow: 3px 7px #888888;
        color: #c93e37;
    }
    .center {
        text-align: center;
        color: #c93e37;
    }

    select {
        color: #c93e37;
        border-color: #c93e37;
        width: 100%;
    }

    table {
        width: 100%
    }

    input {
        color: #c93e37;
        border-color: #c93e37;

    }
        input[type=text]:focus {
            outline: 2px solid #c93e37;
        }
    .conceptMap {
        width: 100%;
        height: 90%;
    }

    .comments {
        border: solid;
        background-color: white;
        border-color: #c93e37;
    }

</style>