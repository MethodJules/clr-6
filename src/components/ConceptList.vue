<template>
    <div class="scrollbar">
        <!-- List of concepts with delete and create (put it into map) icon-->
        <vuescroll :ops="ops">
            <div class="listElement" v-for="concept in concepts" :key="concept.name">
                <div class="listIcon" @click="deleteItem(concept)"> <b-icon icon="trash" aria-hidden="true"></b-icon> </div>
                <div class="listName"> {{concept.name}} </div>
                <div class="listArrow" @click="createElement(concept)"> <b-icon icon="arrow-right" aria-hidden="true"></b-icon> </div>
            </div>
        </vuescroll>
    </div>
</template>

<script>
import vuescroll from 'vuescroll';
import { mapState } from 'vuex';

export default {
    components: {
        vuescroll,
    },
    data: function() {
        return {
            conceptList: null, 
            // options for vuescroll
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
        methods: {
        // create new Conncetion (method in Concept.vue-Component)
        createElement (value) {
            this.$emit('childToParent', value)
            },
        // delete Concept
        deleteItem(concept) {
            this.$store.dispatch('concepts/deleteConcept', concept)
        }
    },
        computed: {
            ...mapState({
                // get Concepts from state
                concepts: state => state.concepts.concepts
            })
           
          /*  
           * erster versuch alle aktuellen Konzepte zu laden 
           * 
           *
        ...mapState({ 
                concepts(state) {
                    
                    console.log(state.concept_map.nodes);
                    this.conceptList = state.concepts.concepts;

                    for (let concept of state.concepts.concepts) {
                        for (let map of state.concept_map.nodes) {
                            if (concept.id == map.id) {
                                console.log(concept.id);
                                console.log(map.id);
                                console.log(this.conceptList.indexOf(concept));
                                this.conceptList.splice(this.conceptList.indexOf(concept), 1);
                            }
                        }           
                    return this.conceptList
                }
        })
        */
        },
    
    async mounted() {
        // load concepts from store
        await this.$store.dispatch('concepts/loadConcepts');
       
        this.conceptList = this.$store.state.concepts.concepts;


       // versuch Konzpte richtig aus store zu laden 
        for (let map of this.$store.state.concept_map.nodes) {
            console.log(map);

        }
        // versuch Konzpte richtig aus store zu laden 
        for (let concept of this.$store.state.concepts.concepts) {
            console.log(this.$store.state.concept_map.nodes);
            console.log(concept);
            /*
            for (let map of this.$store.state.concept_map.nodes) {
                console.log(concept.id);
                console.log(map.uuid);

                if (concept.id == map.uuid) {
                   
                    console.log(this.conceptList.indexOf(concept));
                    this.conceptList.splice(this.conceptList.indexOf(concept), 1);
                }
            }
            */
        }
        
        
    }
}
</script>