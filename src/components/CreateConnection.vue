<template>
    <div>
        <h2 class="center"> CONNECTION </h2><h3 @click="closeModal" class="closeIcon">x</h3>
            <table>
                <tr>
                    <td class="tableName"> Concept: </td>
                        <td>
                            <select>
                                <option v-for="concept in concepts" :key="concept.name">{{concept.name}}</option>
                            </select>
                        </td>
                </tr>
                <tr>
                    <td class="tableName"> Connect to: </td>
                    <td>
                        <select v-model="selected_target">
                            <option>{{source.name}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="tableName"> Label </td>
                    <td>
                        <input type="text" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <b-btn class="button" @click="addToConceptMap">Speichern</b-btn>
                    </td>
                </tr>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            selected_target: null
        }
    },
    props: {
        source: Object
    },
    methods: {
        closeModal() {
            console.log("closing..")
            this.$emit('closeModal', false)
            //TODO: showModal in der Parent Componente auf false setzen
        },
        addToConceptMap() {
            console.log(this.selected_target);
        }
    },
    computed: {
        ...mapState({
            concepts: state => state.concept_map.nodes
        })
    }
}
</script>

<style scoped>
.tableName {
        width: 60%;
    }
.closeIcon {
    position: relative;
    left: 340px;
    bottom: 70px;
    cursor: pointer;
}

.button {
    color: '#c93e37'
}
</style>