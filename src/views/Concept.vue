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
                <div class="scrollbar">
                    <vuescroll :ops="ops">
                        <div class="listElement" v-for="item in items" :key="item.name">
                            <div class="listIcon" @click="deleteItem()"> <b-icon icon="trash" aria-hidden="true"></b-icon> </div>
                            <div class="listName"> {{item.name}} </div>
                            <div class="listArrow" @click="createElement()"> <b-icon icon="arrow-right" aria-hidden="true"></b-icon>  </div>

                        </div>
                    </vuescroll>
                </div>
                <div class="newElement">
                    <v-btn class="addButton" @click="addElement()"> + </v-btn>
                </div>

            </div>
            <div class="viewConcept">
       
                    <div class="modalView" v-if="showModal">                    
                        <h2 class="center"> CONNECTION </h2>
                       
                        <table>
                            <tr>
                                <td class="tableName"> Concept: </td>
                                <td>
                                    <select>
                                        <option>  Rock Cycle </option>
                                    </select>
                                </td>

                            </tr>

                            <tr>
                                <td class="tableName"> Connect to: </td>
                                <td>
                                    <select>
                                        <option>  Earthquakes </option>
                                        <option>  Rivers </option>
                                        <option>  Deserts </option>
                                        <option>  Minerals </option>
                                    </select>
                                </td>
                            <tr>
                                <td class="tableName"> Label </td>
                                <td>
                                    <input type="text" />
                                </td>
                            </tr>
                  
                        </table>
                       
                       

                    </div>
         
            </div>
        </div>

    </div>
</template>



<script>

import vuescroll from 'vuescroll';

    export default {
        name: 'Home',
        data: function () {
            return {
                newconcept: true,
                concept: false,
                showModal: false,
                items: [
                    {name: "Rivers"},
                    { name: "Desserts" },
                    {name: "Minerals"}

                ],
                ops: {           
                    rail: {
                        background: '#bababa',                      
                        border: '1px solid #000',
                        opacity: 0.5, 
                        size: "10px"                        
                    },
                    bar: {
                        background: 'white',
                        size: "8px",
                        keepShow: true,
                    }
                }
                
            }
        },
        components: {
            vuescroll
        },
        methods: {
            openConcept() {
                this.newconcept = false;
                this.concept = true;
                
            },
            addElement() {
                alert("Hinzufügen");
            },
            createElement() {
                this.showModal = true;
            },
            deleteItem() {
                alert("Delete");
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

    .tableName {
        width: 60%;
    }
    input {
        color: #c93e37;
        border-color: #c93e37;

    }
        input[type=text]:focus {
            outline: 2px solid #c93e37; 
        }
</style>