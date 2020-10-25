<template>

    <div class="home">
        <h1>
            CONCEPT VERSIONS
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
                    <v-btn class="addButton" @click="addElement()"> + </v-btn>
                </div>
                <!--Test-->
                <div>
                    <v-btn @click="loadConceptMap()">Load CM</v-btn>
                </div>
                <!--TestEnde-->

            </div>
            <div class="viewConcept">
                    <ConceptMap />
                    <div class="modalView" v-if="showModal">
                        <CreateConnection @closeModal="closeModal($event)" :source=target />
                    </div>

            </div>
        </div>

    </div>
</template>



<script>

import ConceptMap from '@/components/ConceptMap'
import CreateConnection from '@/components/CreateConnection'
import ConceptList from '@/components/ConceptList'

    export default {
        name: 'Home',
        data: function () {
            return {
                newconcept: false, //TODO: Muss später geändert werden, damit man neue Concept Maps erstellen kann.
                concept: true,
                showModal: false,
                fromChild: '',
                target: ''




            }
        },
        components: {
            ConceptMap,
            CreateConnection,
            ConceptList
        },
        methods: {
            closeModal(value) {
                this.showModal = value
            },
            onChildClick(value) {
                console.log(value)
                this.showModal = true
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
                alert("Hinzuf�gen");
                this.$store.dispatch('items/addItem', { text: "Item"});
                console.log(this.$store.state.items);
            },
            loadConceptMap() {
                this.$store.dispatch('concept_map/loadConceptMapFromBackend');
            }
        }
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