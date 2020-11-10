<template>
    <div class="scrollbar">
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
import {mapState} from 'vuex'

export default {
    components: {
        vuescroll,
    },
    data: function() {
        return {
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
        createElement (value) {
            alert("Create");
            this.$emit('childToParent', value)
            },
        deleteItem(concept) {
            alert("Delete");
            this.$store.dispatch('concepts/deleteConcept', concept)
        }
    },
    computed: {
        ...mapState({
            concepts: state => state.concepts.concepts
        })
    },
    mounted() {
        console.log("mounted")
        this.$store.dispatch('concepts/loadConcepts')
    }
}
</script>