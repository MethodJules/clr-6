<template>
    <div id="todoList">
        <!-- Liste zum Erstellen der Todos  -->
        <div class="card p-0 m-1" v-for="todo in listOfToDos" :key="todo.date">
            <div class="card-body p-2">
                <b-form-checkbox
                    :id="todo.date"
                    v-model="status"
                    name="checkbox-1"
                    value="checked"
                    unchecked-value="unchecked"
                    class="checkbox"
                >
                    <p><strong>{{ todo.todo }}</strong></p>
                    <p>Frist: {{ todo.date }}</p>
                </b-form-checkbox>
            </div>
            <div class="card-buttons">
                <!-- removed the update?? button because it did not have any functionality -->
                <b-button @click="deleteTodo(todo)" size="sm">
                    <b-icon icon="trash"></b-icon>
                </b-button>
            </div>
        </div>

        <div>
            <!-- Modal zum eingeben der neuen todos, beinhaltet todo und abgabefrist. 
            Es wird nur die zu erledigende Aufgabe angezeigt -->
            <b-modal id="to_do_edit_modal" title="Neue Aufgabe" cancel-title="Abbrechen" @ok="saveTodo">
                <div>
                <label for="neueTodo">Zu erledigende Aufgabe: </label>
                <input
                    v-model="todoNeu"
                    type="text"
                    placeholder="hier eingeben"
                />
                </div>
                <div>
                <label for="example-datepicker">Frist:</label>
                <b-form-datepicker
                    id="example-datepicker"
                    v-model="appointment"
                    :select-attribute="selectAttribute"
                    class="mb-2"
                ></b-form-datepicker>
                </div>
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
    props: {
        date: String,
    },

    data() {
          return{
                //To DO: new key for todo list
                listOfToDos: [{todo:"todo1", date:"21.02.2021"} , {todo:"todo2", date:"23.02.2021"}, {todo:"todo3", date:"24.02.2021"}],
                status: '',
                selectAttribute: {
                    dot: true,
                },
                todoNeu: '',
                appointment: ''
                //msg: "Datum:" + { date } + { todo }
            }
    },
    methods: {
        saveTodo() {
            var neueEingabe = {
                todo: this.todoNeu,
                date: this.appointment,
            };
            // Benutzereingabe wird in die Liste gespeichert
            this.listOfToDos.push(neueEingabe);

            //Anbindung an die API
            this.$store.dispatch("todo/createToDo", neueEingabe);
            this.todoNeu = "";
        },
        deleteTodo(todo) {
            //Löschen eines Todos
            //this.listOfToDos.splice(this.listOfToDos.indexOf(todo), 1)
            alert("Das To Do wurde erfolgreich gelöscht.");

            this.$store.dispatch("todo/deleteTodo", todo);
        },
        diffMonth() {
            //Soll die Todos ausgeben deren Frist im aktuellen Monat endet
            if (this.date === new Date().getMonth()) {
                return this.date;
            }
        },
    },
    //Die in der Datenbank gespeicherten Todos werden hiermit aufgelistet
    mounted() {
        this.$store.dispatch("todo/loadToDoFromBackend");
        this.listOfToDos = this.$store.state.todo.listOfToDos;
        //console.log(this.$store.getters.termin);
    },
    /*  getters:{
        termin: state=() => {
            return state.todo.listOfToDos.date
        }
    }, */
    computed: {
        todoAusgabe() {
            return this.todo.date + " " + this.todo.todo;
            /* get: function(){
                return this.listOfToDos.slice()
            },
            set: function(newTodo){
                
                newTodo.forEach((listOfToDos, key) =>{
                    this.listOfToDos[key] = this.date + ': ' + this.todo
                })
            } */
        },
    },
};
</script>
<style scoped>
#todoList {
    overflow: auto; /*For scrollbar */
    height: 60vh;
    padding: 0;
}
.checkbox p {
    margin-bottom: 0.3rem;
}
.card-buttons {
    display: flex;
    justify-content: flex-end;
    padding: 0.3rem;
}
.card-buttons * {
    margin-left: 0.3rem;
}
</style>