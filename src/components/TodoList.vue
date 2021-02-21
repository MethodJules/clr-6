<template>
    <div>
       
         

        <ul v-for="todos in listOfToDos" :key="todos.date">
            <b-col><b-form-checkbox><li><TodoListItem :eintragTodo=todos></TodoListItem></li></b-form-checkbox></b-col>
            <b-button size= "sm"><b-icon-trash/></b-button>
            
        </ul>

        <b-col>
                    <br>
                                
                    <b-button @click="formularTodo()" pill size= "lg"><b-icon-plus/></b-button>
        </b-col>
                        
        
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
                
                todo: "Mein ToDo 1",
                listOfToDos: [{todo:"todo1", date:"21.02.2021"} , {todo:"todo2", date:"22.02.2021"}, {todo:"todo3", date:"23.02.2021"}]
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
    
        },
            
            hideModal() {
                this.$refs['my-todo-modal'].hide()
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