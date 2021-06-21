<template>
    <div id="tododatum">
    <!-- Modal zum eingeben der neuen todos, beinhaltet todo und abgabefrist. 
            Es wird nur die zu erledigende Aufgabe angezeigt -->
            <b-modal id="to_do_edit_modal" title="to_do">
          <label for = "neueTodo">zu erledigende Aufgabe: </label>
          <input v-model="todo.todoNeu" type ="text" placeholder="hier eingeben">
          <label for="example-datepicker">Frist: </label>
            <b-form-datepicker id="example-datepicker" v-model="todo.appointment" class="mb-2"></b-form-datepicker>
          <b-button @click="ok()">
          OK
          </b-button>
        </b-modal>
        <p>{{todo.todoNeu}} am {{todo.appointment}}</p>
    </div>   
</template>
<script>


export default {
    props:{
        todo: Object
    },
    data(){
        return{

        }
    },
    methods:{
        ok(){
            var neueEingabe ={
                todo: this.todoNeu,
                date: this.appointment
            };
            // Benutzereingabe wird in die Liste gespeichert
            this.listOfToDos.push(neueEingabe)
            //Anbindung an die API
            this.$store.dispatch('todo/createToDo', neueEingabe)
            this.todoNeu= ''
        },
    },
    
}
</script>
