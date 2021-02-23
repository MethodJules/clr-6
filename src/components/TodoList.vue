<template>
    <div id="todoList">
        <div class="card" v-for="todo in listOfToDos" :key="todo.date">
            <div class="card-body text-center">
                <b-form-checkbox :id="todo.date" v-model="status" name="checkbox-1" value="checked" unchecked-value="unchecked">{{todo.todo}}<b-button class="btn btn-s">Löschen</b-button></b-form-checkbox>
            </div>
        </div>
        <div>
            <b-button>Neue Aufgabe</b-button>
        </div>
    </div>

</template>



<script>
export default {
    components:{
    },
    data(){
            return{
                listOfToDos: [{todo:"todo1", date:"21.02.2021"} , {todo:"todo2", date:"22.02.2021"}, {todo:"todo3", date:"23.02.2021"}]
            }
    },
}
</script>