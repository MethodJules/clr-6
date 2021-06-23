<template>
    <div id="kalender">
   
     <div class="giveAppointment"  >
            
            <div class="card-body text-center">
                 
                 <!-- v-calendar component open attributes method in computed -->
                <vc-calendar 
                    
                    :attributes='attributes'
                />
                  
                     
            </div>
        </div>
    </div>
</template>
<script>


export default {
    
    data(){
        //todos array
        const todos = [
      {
        description: this.$store.state.todo.listOfToDos,
        isComplete: false,
        dates: this.$store.state.todo.dates,
        color: 'red',
      },
      /* {
        description: this.$store.state.todo.todos[1],
        isComplete: false,
        dates: this.$store.state.todo.dates[1], 
        color: 'red',
      }, */
    ];
    
        return{
            
            incId: todos.length,
            todos,
            todosFromList: this.$store.state.todo.todos,
            dateFromList: this.$store.state.todo.dates,
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
            let ausgabeTodos =[]
            let count = 1
            /* const idx = this.todos.findIndex(t=> t.id === this.todo.id);
            if(idx >= 0){
                this.todos.splice(idx, 1);
            } else{
                this.todos.push({
                    id: this.todo.id,
                    date: this.todo.date
                })
            } */


            for(let i= 0; i< this.dateFromList.length; i++){
                for(let j= 0; j< this.todosFromList.length; j++){
                    ausgabeTodos[i][j] = count;
                    count ++;
                }
            }
            return ausgabeTodos
                /* ausgabeTodos.push(this.$store.state.todo.todos[1]);
                ausgabeTodos.push(this.$store.state.todo.todos[0])
                return ausgabeTodos */
            
            
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
        getCompleteList(){
            
            var completeList= this.$store.state.todo.listOfToDos[0].todo
            
            return completeList
        },
        getTodo(){
            
                var neueTodo=this.$store.state.todo.todos
                return neueTodo
        },
        getDate(){
            var neueDate = this.$store.state.todo.dates
            return neueDate
        },
        attributes() {
            
            
      return [
        // Attributes for todos
        
        ...this.$store.state.todo.listOfToDos.map(todo => ({
          dates: todo.date,
         
          dot: {
            color: 'red',
            class: todo.isComplete ? 'opacity-75' : '',
          },
          popover: {
            
            label: 
                
                todo.todo,
                
            
          },
          
          customData: todo,
        })),
      ];
      
    },
    }
}
</script>
