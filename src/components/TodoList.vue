<template>
    <div>
        <li v-for= "todos in listOfToDos" :key="todos.date">
            <b-row>
                                        
                <b-col><b-form-checkbox>{{todos.todo}}</b-form-checkbox></b-col>
                <b-col><b-button @click="deleteTodo(todos.date)" size= "sm"><b-icon-trash/></b-button></b-col>
            </b-row>
        </li>
    </div>
</template>

<script>
export default {
    data(){
            return{
                todo: "Mein ToDo 1",
                listOfToDos: [{todo:"todo1", date:"21.02.2021"} , {todo:"todo2", date:"22.02.2021"}, {todo:"todo3", date:"23.02.2021"}]
            }
        },
    methods:{
        deleteTodo(date){
                var indx = this.listOfToDos.indexOf(date);
                if(indx > -1){
                this.listOfToDos.splice(indx, 1);
                }
            }
    }
}
</script>
