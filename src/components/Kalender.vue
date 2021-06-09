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
                <div class="giveTodo" v-for="todo in ourTodos" :key="todo.date">
           <b-card> Todo: '{{ ourTodos}}', bis: </b-card>
        </div>
                   
                    
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
        return{
                
                date:"",
                listeTodos: [],
               
            
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
        ourTodos(){
                var neueTodo= this.$store.state.todo.listOfToDos
                 
                return neueTodo
            
        
        
    }
    }
}
</script>
