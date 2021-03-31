<template>
    <div>
        <h1> To Do </h1>
        <!-- table for ToDos -->
        <b-table-simple hover small caption-top responsive>

            <!-- Row names, header of table -->
            <b-thead head-variant="dark">
                <b-tr>
                    <b-th>Name</b-th>
                    <b-th>Aufgabe</b-th>

                    <b-th>Status</b-th>
                    <b-th> Status bearbeiten</b-th>

                </b-tr>
            </b-thead>
            <!-- Body of the table -->
            <b-tbody>
                <!-- Table entrys, get data from Todo-Array from store -->
                <b-tr v-for="(toDo, index) in toDos.toDos" :key="index">
                    <b-th>{{toDo.name}}</b-th>
                    <b-th>{{toDo.exercise}}</b-th>

                    <b-td :class="{'table-success': toDo.status === 'done', 'table-warning': toDo.status === 'in Progress', 'table-danger': toDo.status === 'new'}">
                        {{toDo.status}}
                    </b-td>
                    <b-td>
                        <!-- Edit single toTo, open editTodo-Modal -->
                        <b-button variant="outline-dark" @click="edit(toDo)"> Edit</b-button>
                       
                    </b-td>
                </b-tr>
            </b-tbody>

        </b-table-simple>

        
        <!-- Edit-Modal, to change status of single toTo -->
        <b-modal id="editToDo" hide-footer>
            
            <b-form-group id="toDo"
                          label="Aendere den Status"
                          label-for="toDoEl">
                <b-form-select id="toDoEl" v-model="toDoElement.status" :options="options"></b-form-select>
                <b-button class="mt-3" block @click="changeStatus()">erstellen</b-button>
            </b-form-group>
 
        </b-modal>

    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'Home',
    components: {

    },
    data() {
        return {
            // Status options 
            options: [
                { value: 'in Progress', text: 'in Progress' },
                { value: 'done', text: 'done' },
                { value: 'new', text: 'new' },
            ],
            // current status of selected Element, changed by change option of select element
            toDoElement: {            
                status: ''
            }
        }
        },

    methods: {
        // open Edit-Modal
        edit(toDo) {
            this.toDoElement = toDo;
            console.log(toDo);
            this.$bvModal.show('editToDo');
        }, 
        // hide Edit-Modal 
        changeStatus() {
            this.$bvModal.hide('editToDo');
        }
    }, 
        computed: {
        // Save Data from store, to use in this class
        ...mapState({
            toDos: state => state.toDos,
        })
    }
}
</script>
