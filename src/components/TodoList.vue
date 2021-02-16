<template>
    <div>
        <li v-for= "todos in listOfToDos" :key="todos.date">
            <b-row>
                                        
                <b-col><b-form-checkbox v-model="eintragTodo.todo">{{todos.todo}}</b-form-checkbox></b-col>
                <b-col><b-button @click="deleteTodo(todos.date)" size= "sm"><b-icon-trash/></b-button></b-col>
            </b-row>
        </li>
        <div v-if="eintragTodo.buttonAdd==='add'">
            <button type="button" class="btn btn-primary" @click="addItem()">Hinzufügen</button>
        </div>
    </div>
    
</template>

<script>
export default {
    props:{
        eintragTodo: Object
    },
    data(){
            return{
                /* todo: "Mein ToDo 1",
                listOfToDos: [{todo:"todo1", date:"21.02.2021"} , {todo:"todo2", date:"22.02.2021"}, {todo:"todo3", date:"23.02.2021"}] */
            }
        },
    methods:{
        updateTodo(eintragTodo) {
            this.$store.dispatch('todo/updateTodo', eintragTodo)
        },
        addItem(){
            
            var ausgabe= this.todo
            this.$store.dispatch('todo/createToDo', ausgabe)
            this.rowData.push(ausgabe)
            this.todo = ''
        },
         deleteTodo(date) {
            alert("Delete");
              //console.log(row);
            this.$store.dispatch('todo/deleteTodo', date)
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

