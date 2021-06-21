<template>
    <div id="todoList">
        <!-- Liste zum Erstellen der Todos  -->
        <div class="card" v-for="todo in listOfToDos" :key="todo.date">
            <div class="card-body text-center">
                <b-form-checkbox :id="todo.date" v-model="status" name="checkbox-1" value="checked" unchecked-value="unchecked">
                    <p>Datum: <b>'{{ todo.date }}'</b></p>
                    {{todo.todo}}
                    <b-button @click="deleteTodo(todo)" class="btn btn-s">Löschen</b-button></b-form-checkbox>
            </div>
        </div>
        <div>
        <!-- Modal zum eingeben der neuen todos, beinhaltet todo und abgabefrist. 
            Es wird nur die zu erledigende Aufgabe angezeigt -->
            <b-modal id="to_do_edit_modal" title="to_do">
          <label for = "neueTodo">zu erledigende Aufgabe: </label>
          <input v-model="todoNeu" type ="text" placeholder="hier eingeben">
          <label for="example-datepicker">Frist: </label>
            <b-form-datepicker id="example-datepicker" v-model="appointment" :select-attribute="selectAttribute" class="mb-2"></b-form-datepicker>
          <b-button @click="ok()">
          OK
          </b-button>
        </b-modal>
        <!-- Zum öffnen des Modals -->
        <b-button v-b-modal.to_do_edit_modal>+</b-button>
        </div>
        <!-- <div class="giveTodo" v-for="todo in listOfToDos" :key="todo.date">
            <b-card v-if="diffMonth">Todo: '{{ todo.todo }}', bis: '{{ todo.date }}'</b-card>
        </div> -->
    </div>

</template>



<script>
export default {
   state:{
       listOfToDos: [{todo:"todo1", date:"21.02.2021"} , {todo:"todo2", date:"22.02.2021"}, {todo:"todo3", date:"23.02.2021"}],
   },
    props:{
        date: String
    },
    components:{
    },
    data(){
        
      
            return{
                listOfToDos: [{todo:"todo1", date:"21.02.2021"} , {todo:"todo2", date:"22.02.2021"}, {todo:"todo3", date:"23.02.2021"}],
                status: '',
                selectAttribute: {
                    dot: true,
                },
                todoNeu: '',
                //msg: "Datum:" + { date } + { todo }
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
        deleteTodo(todo){
                //Löschen eines Todos
                //this.listOfToDos.splice(this.listOfToDos.indexOf(todo), 1)
                alert("Delete");
              
            this.$store.dispatch('todo/deleteTodo', todo)
            
        },
        diffMonth(){
            //Soll die Todos ausgeben deren Frist im aktuellen Monat endet
            if(this.date === new Date().getMonth()){
                return this.date
            }
            
        }
    },
    //Die in der Datenbank gespeicherten Todos werden hiermit aufgelistet
    mounted(){
        this.$store.dispatch('todo/loadToDoFromBackend')
        this.listOfToDos = this.$store.state.todo.listOfToDos
        //console.log(this.$store.getters.termin);
    },
   /*  getters:{
        termin: state=() => {
            return state.todo.listOfToDos.date
        }
    }, */
    computed:{
        todoAusgabe(){
            return this.todo.date + ' ' + this.todo.todo;
            /* get: function(){
                return this.listOfToDos.slice()
            },
            set: function(newTodo){
                
                newTodo.forEach((listOfToDos, key) =>{
                    this.listOfToDos[key] = this.date + ': ' + this.todo
                })
            } */
        }
    }
}
</script>