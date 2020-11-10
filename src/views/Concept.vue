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

            </div>
            <div class="viewConcept">
                    <ConceptMap />
                    <!-- <div class="modalView" v-if="showModal">
                        <CreateConnection @closeModal="closeModal($event)" :source=target />
                    </div> -->

                    <b-modal id="create_connection_modal" hide-footer>
                        <div class="d-block text-center">
                            <h1>Create Connection</h1>
                            <b-form-select v-model="source_uuid" :options="source_options"></b-form-select>


                            <b-form-select v-model="target_uuid" :options="target_options"></b-form-select>
                            <!-- <div v-for="option in target_options" :key="option.value.id">
                                <p><b>Connect to:</b> {{option.value.concept}}</p>
                            </div> -->

                            <b-form-input v-model="relationship_label" placeholder="Bitte geben Sie hier die Bezeichnung ein."></b-form-input>
                            <b-button class="mt-3" block @click="createNewConncetionToConceptMap">Speichern</b-button>
                        </div>
                    </b-modal>
                    <b-modal id="create_concept_modal" hide-footer>
                        <div class="d-block text-center">
                            <h1>Neues Concept erstellen</h1>
                            <b-form-input v-model="concept_name" placeholder="Bitte geben Sie hier den Concept Namen ein"></b-form-input>
                        </div>
                        <b-button class="mt-3" block @click="addElement">Speichern</b-button>

                    </b-modal>
            </div>
        </div>

    </div>
</template>



<script>

import ConceptMap from '@/components/ConceptMap'
//import CreateConnection from '@/components/CreateConnection'
import ConceptList from '@/components/ConceptList'
import {mapState} from 'vuex'


    export default {
        name: 'Home',
        data: function () {
            return {
                newconcept: false, //TODO: Muss später geändert werden, damit man neue Concept Maps erstellen kann.
                concept: true,
                showModal: false,
                fromChild: '',
                target: '',
                concept_name: '',
                source_uuid: null,
                target_uuid: null,
                target_options: [],
                source_options: [],
                relationship_label: '',
            }
        },
        components: {
            ConceptMap,
            //CreateConnection,
            ConceptList
        },
        methods: {
            closeModal(value) {
                this.showModal = value
            },
            onChildClick(value) {
                //console.log(value)
                //this.showModal = true
                this.target_options.push({value: {id: value.nid , uuid: value.id, concept: value.name}, text: value.name});
                this.openCreateConnectionModal();
                this.target = value

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

                this.$store.dispatch('concepts/addConcept', this.concept_name);
                this.$bvModal.hide('create_concept_modal');

                //console.log(this.$store.state.items);
                //TODO: Concept hinzufuegen
            },
            loadConceptMap() {
                this.concepts.forEach(element => {
                    //console.log(element);
                    this.source_options.push({value: {id: element.id, uuid: element.uuid, concept: element.name}, text: element.name});
                });
                //console.log(this.source_options);
            },
            openCreateConceptModal() {
                this.$bvModal.show('create_concept_modal');
            },
            openCreateConnectionModal() {
                this.loadConceptMap();
                this.$bvModal.show('create_connection_modal');
            },
            createNewConncetionToConceptMap() {
                //console.log(this.source_uuid);
                //console.log(this.target_uuid);
                //Add Concept to Concept Map
                this.$store.dispatch('concept_map/addConceptToConceptMap', this.target_uuid); //TODO: target_uuid ändern in semantisch korrekte bezeichnung
                this.$store.dispatch('concept_map/addRelationshipToConceptMap', {source: this.source_uuid, target: this.target_uuid, name: this.relationship_label});
                this.$bvModal.hide('create_connection_modal');
            }
        },
        mounted() {
            this.$store.dispatch('concept_map/loadConceptMapFromBackend');
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


    input {
        color: #c93e37;
        border-color: #c93e37;

    }
        input[type=text]:focus {
            outline: 2px solid #c93e37;
        }
</style>