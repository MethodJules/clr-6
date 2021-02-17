<template>
    <div>
        <h1>test</h1>
        <li v-for= "todos in listOfToDos" :key="todos.date">
            <b-row>
                                        
                <b-col><b-form-checkbox v-model="eintragTodo.todo">{{todos.todo}}</b-form-checkbox></b-col>
                <b-col><b-button @click="deleteTodo(todos.date)" size= "sm"><b-icon-trash/></b-button></b-col>
            </b-row>
        </li>
        
    </div>
</template>
<script>
export default {
    props:{
        eintragTodo: Object
    },
    methods:{
        addItem(){
            
            var ausgabe= this.todo
            this.$store.dispatch('todo/createToDo', ausgabe)
            this.listOfTodos.push(ausgabe)
            this.todo = ''
        },
         deleteTodo(date) {
            alert("Delete");
              //console.log(row);
            this.$store.dispatch('todo/deleteTodo', date)
        }
    }
}
</script>