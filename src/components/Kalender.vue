<template>
    <div id="kalender">
   
     <div class="giveAppointment"  >
            
            <div class="card-body text-center">
                 <b-calendar
                                    
                                    size= "sm"
                                    hide-header
                                    id="ex-disabled-readonly"
                                    @date="showTodos"
                                    :select-attribute="selectAttribute"
                                    :readonly="readonly"
                ></b-calendar>
                <vc-calendar 
                    
                    :attributes='attributes'
                />
                   <b-container>
                       <b-row v-for="i in listOfToDos" :key="i.idx"> <b-col><b-row>Todo: <b-col>{{getTodo[i]}}, bis : {{getDate[i]}}</b-col></b-row></b-col> </b-row>
                        <b-card style="width: 11rem;"><b-row> <b-col><b-row>Todo: <b-col>{{getTodo[0]}}, <b-row> bis : <b-col>{{getDate[0]}}</b-col></b-row></b-col></b-row></b-col> </b-row></b-card>
                        <b-card style="width: 11rem;"><b-row> <b-col><b-row>Todo: <b-col>{{getTodo[1]}}, <b-row> bis : <b-col>{{getDate[1]}}</b-col></b-row></b-col></b-row></b-col> </b-row></b-card>
                   
                    </b-container>
                <!-- <div class="giveTodo" v-for="todo in getTodo" :key="todo.getDate">
                    <b-card> Todo: '{{ getTodo}}', bis: {{getDate}} </b-card>
                </div> -->
                   
                    
                    <!-- <TodoList :date="todo.date"/> -->
                     
            </div>
        </div>
    </div>
</template>
<script>
//import TodoForm from '@/components/TodoForm'
//import TodoList from '@/components/TodoList'

export default {
    components:{
        //TodoForm
        //TodoList
    },
    data(){
        const todos = [
      {
        description: this.$store.state.todo.todos[0],
        isComplete: false,
        dates: this.$store.state.todo.dates[0], // Every Friday
        color: 'red',
      },
      {
        description: this.$store.state.todo.todos[1],
        isComplete: false,
        dates: this.$store.state.todo.dates[1], // Every Friday
        color: 'red',
      },
    ];
        return{
            incId: todos.length,
            todos,
                /* attributes: [
                    {
                        key: 'today',
                        highlight: true,
                        dates: new Date(),
                    },
                ], */
                date:"",
                listeToDos: [],
               
            
            selectAttribute: {
                dot: true,
            },
        }
    },
    methods:{
        showTodos(){
            this.date =this.$store.state.todo.listOfToDos.date;
        }
    },
  /*   mounted () {
        console.log(this.$store.state.todo.listOfToDos[1].date);
        console.log(this.$store.state.todo.listOfToDos[1].todo);
        
        this.date = this.$store.state.todo.listOfToDos[0].date;
        
        this.listeTodos= this.$store.state.todo.listOfToDos;
        this.todo = this.$store.state.todo.listOfToDos[0].todo;
       
    }, */
    computed:{
        getTodo(){
            
                var neueTodo= this.$store.state.todo.todos
                
                return neueTodo
        },
        getDate(){
            var neueDate = this.$store.state.todo.dates
            return neueDate
        },
        attributes() {
            
      return [
        // Attributes for todos
        ...this.todos.map(todo => ({
          dates: todo.dates,
          
          dot: {
            color: todo.color,
            class: todo.isComplete ? 'opacity-75' : '',
          },
          popover: {
            
            label: 
                todo.description,
            
          },
          customData: todo,
        })),
      ];
    },
    }
}
</script>
