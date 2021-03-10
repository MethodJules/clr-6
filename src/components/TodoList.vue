<template>
    <div id="todoList">
        <div class="card" v-for="todo in listOfToDos" :key="todo.date">
            <div class="card-body text-center">
                <b-form-checkbox :id="todo.date" v-model="status" name="checkbox-1" value="checked" unchecked-value="unchecked">{{todo.todo}}<b-button class="btn btn-s">Löschen</b-button></b-form-checkbox>
            </div>
        </div>
        <div>
            <b-modal id="to_do_edit_modal" title="to_do">
          <label for = "neueTodo">zu erledigende Aufgabe: </label>
          <input v-model="todoNeu" type ="text" placeholder="hier eingeben">
          <b-button @click="ok()">
          OK
          </b-button>
        </b-modal>
        <b-button v-b-modal.to_do_edit_modal>+</b-button>
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
    methods:{
        ok(){
            var neueEingabe ={
                todo: this.todoNeu
            };
            this.listOfToDos.push(neueEingabe)
            this.todoNeu= ''
        }
    }
}
</script>