<template>
    <div id="app">      
                

                <b-container>
                    <!-- <router-view /> -->
                </b-container>
                <b-container fluid> 
                <b-row class ="obereLeiste">
                    <b-col>
                        <div>
                            
                           
                            <MenueLeiste/>
                                    
                              
                        </div>
                    </b-col>

        
                </b-row>
             
                <b-row>
                    <b-col class="linkeSeite">
                        
                        <b-row>
                            <b-col>
                                <TodoList/>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            </b-col>
                            <b-col>
                                <br>
                                
                            </b-col>
                        </b-row>
                        <b-row>
                            
                            <b-col>
                                <Kalender/>
                        
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col class="mitte">
                        <Vorgehensmodell/>

                    
                    </b-col>

                    <b-col class="rechteSeite">
                        
                        <b-row>
                            <b-col>
                                <SeitenNavigation/>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            </b-col>
                            <b-col>
                                <br>
                                
                            </b-col>
                        </b-row>
                        <b-row class="chat">
                            
                            <b-col>
                                <Chat/>
                        
                            </b-col>
                        </b-row>
                        <b-row class="postfach">

                            <b-col>
                                <Postfach/>
                            </b-col>
                        </b-row>
                    </b-col>
                   
                        
                    
                       <!--  <b-row>
                            <b-col>
                            
                            </b-col>
                            <b-col>
                                
                                <b-icon-chat/>
                                
                            </b-col>

                           
                            <b-col>
                                <b-icon-envelope size="lg"/>
                            </b-col> 

                            
                           
                        </b-row> 
                         <br> -->
                    
                </b-row>
                
                <b-row class="untereLeiste">
                </b-row>
                
                
                
                </b-container>
                


            
    </div>
</template>


<script>

    import SeitenNavigation from '@/components/SeitenNavigation.vue'
    import TodoList from '@/components/TodoList.vue'
    import MenueLeiste from '@/components/MenueLeiste.vue'
    import Vorgehensmodell from '@/components/Vorgehensmodell.vue'
    import Kalender from '@/components/Kalender.vue'
    import Chat from '@/components/Chat.vue'
    import Postfach from '@/components/Postfach.vue'

    
    export default {
        name: 'App',
        components: {
            SeitenNavigation,
            TodoList,
            MenueLeiste,
            Vorgehensmodell,
            Kalender,
            Chat,
            Postfach
        },
        data(){
            return{
                
                nameState: null,
                eintragTodo:{
                    todo: ""
                },
                
                /* listOfToDos [
                    {todo:"Mein1", date:"20.02.2021"},
                ], */ 
            };
            
        },
        methods: {
            formularTodo(){
                this.$refs['my-todo-modal'].show()
                this.eintragTodo.date=""
                this.eintragTodo.todo= ""
                this.eintragTodo.buttonAdd= "add"

            },
            neueToDo(){
                this.$refs['my-todo-modal'].show()
                /* this.eintragTodo.todo= listOfToDos.todo
                this.eintragTodo.date= listOfToDos.date
                this.eintragTodo.buttonAdd= "add" */
                
                /* var ausgabeToDo ={
                    date: this.eintragTodo.date,
                    todo: this.eintragTodo.todo
                }
                this.listOfToDos.push(ausgabeToDo)
                this.date = ''
                this.todo = '' */
            },
            
            hideModal() {
                this.$refs['my-todo-modal'].hide()
            }
        },
        mounted() {
            this.$store.dispatch('todo/loadToDoFromBackend')
            this.listOfToDos = this.$store.state.todo.listOfToDos
    
        },
    }
</script>
<style>
    @import 'assets/style.css';

    .postfach {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0;
        height: 15%;
        display: table;
        margin: auto;
    }

    .chat {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0;
        height: 10%;
        display: table;
        margin-top: 20px;
        
        
        
    }
      .obereLeiste{
        width: auto;
        border: 1px solid black;
    }
    .linkeSeite{
        width: auto;
        border: 1px solid black;
        
    }
    .rechteSeite{
        width: 60 px;
        border: 1px solid black;
    }
    .untereLeiste{
        width: auto;
        height: 100 px;
        border: 1px solid black;
    }  


    /* .background {
        background-color: red;
        background-image: url('~@/assets/background2.jpg'); 
        width: 100%;
        height: 90%;
        position: absolute;
        background-size: cover;
        
    } */
   /**/ 
    .sc-launcher {
        position: unset !important;
        height: 60px !important;
        margin-bottom: 20px !important;
        
    }

    .sc-launcher::before {
        position: unset !important;
        height: 60px !important;
        height:unset !important;
    }

    .sc-open-icon {
        position: unset !important;
       
    }

    .sc-closed-icon {
        position: unset !important;
    }

    .sc-chat-window {
        width: 20% !important;
        height: 50% !important;
    }

    .sc-header {
        height: 15% !important;
        min-height: unset !important;
    }
    .sc-header--title {
        font-size: 10px !important;
        min-height: unset !important;
    }

    .sc-message {
        width: unset !important;
        margin-right: 10px !important;
    }
    .sc-message--text {
        padding-bottom: 5px !important;
        padding-top: 5px !important;
        padding-left: 5px !important;
        padding-right: 5px !important;
        font-size: 12px !important;
        max-width: unset !important;

    }
    .sc-message--content.sent {
        margin-left: 15%;
    }

    .sc-message--text-content {
        margin-bottom: 0px;
    }

    .sc-user-input {
        min-height: unset !important;
        height: 10% !important;
    }
    .sc-user-input--text {
        height: 40px !important;
        min-height: unset !important;
        padding: 5px !important;
        width: 90% !important;
    }
    .sc-user-input--button {
        margin-left: 50px !important;
       
    }


</style>

