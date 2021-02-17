<template>
    <div>
        <h1>2</h1>
        <TodoListItem 
        :eintragTodo="{
            todo: 'Veronica',
            date: '01.01.2000'
        }"
         ></TodoListItem>

 
        
        <b-modal ref="my-todo-modal" id="modal-prevent-closing" hide-footer title="Neue ToDo" @show="resetModal"
                    @hidden="resetModal" @ok="handleOk">
                    <div class="d-block text-center">
                        <form ref="form" @submit.stop.prevent="handleSubmit">
                            <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2"></b-form-datepicker>
                            <b-form-group
                                label="Todo"
                                label-for="todo-input"
                                invalid-feedback="Todo is required"
                                :state="nameState"
                            >
                            <b-form-input
                                id="todo-input"
                                v-model="todo"
                                :state="nameState"
                                required
                            >
                            <!-- <TodoList :eintragTodo=eintragTodo></TodoList> -->
                            </b-form-input>
                            </b-form-group>
                            <b-button class="mt-3" block @click="hideModal">Close Me</b-button>
                        </form>

                    </div>
                    <div v-if="eintragTodo.buttonAdd==='add'">
                        <button type="button" class="btn btn-primary" @click="addItem()">Hinzufügen</button>
                    </div>
                    <!-- <b-button class="mt-3" variant="outline-danger" block @click="formularTodo()">Speichern</b-button> -->
                </b-modal>
        
    </div>
    
</template>

<script>
import TodoListItem from '@/components/TodoListItem.vue'
export default {
    components:{
        TodoListItem
    },
    data(){
            return{
                
                /* todo: "Mein ToDo 1",
                listOfToDos: [{todo:"todo1", date:"21.02.2021"} , {todo:"todo2", date:"22.02.2021"}, {todo:"todo3", date:"23.02.2021"}] */
            }
        },
    methods:{
        formularTodo(){
                this.$refs['my-todo-modal'].show()
                this.eintragTodo.date=""
                this.eintragTodo.todo= ""
                this.eintragTodo.buttonAdd= "add"

            },
        updateTodo(eintragTodo) {
            this.$store.dispatch('todo/updateTodo', eintragTodo)
        },
        
        mounted() {
            console.log(this.eintragTodo)
    
        }
        /* deleteTodo(date){
                var indx = this.listOfToDos.indexOf(date);
                if(indx > -1){
                this.listOfToDos.splice(indx, 1);
                }
            } */
        
    }
}
</script>

