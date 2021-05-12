<template>
    <div>
        <!-- open modal -->
         
        <b-button @click="showThisModal()" v-b-modal="'chat_open'">CHAT</b-button>
        <b-modal ref="chat_open" title="Projekt 1 Chat" hide-footer>
                
                <b-tabs content-class="mt-4">   
                        <!-- differnet tabs for different chats -->
                        <b-tab title="Martin">
                                <div class="chatVerlauf"> 
                                        <div class="chat-list-container">
                                                <!-- shows all messages the user send -->
                                        <ul class="chat-list">
                                                <li class="message"
                                                v-for="(message, idx) in messages"
                                                :key="idx">

                                                <!-- shows who sends which content and when -->
                                                <p>
                                                        
                                                        Ich(<span>{{new Date().toLocaleString()| moment("h:mm:ss")}}</span>): 
                                                        <span>{{ message.text}}</span>
                                                </p>
                                                </li>
                                        </ul>
                                        </div>
                                        
                                                
                                        
                                </div>
                                <!-- user can add his message here -->
                                <div class="chat-inputs">
                                        <input type="text" 
                                                v-model="message"
                                                @keyup.enter="sendMessage"
                                                placeholder="Nachricht..." 
                                        />
                                        <b-button @click="sendMessage">Send</b-button>
                                                                  
                                </div>
                                
                        </b-tab>
                        <b-tab title="Bianca">
                                <b-button>Senden</b-button>
                        </b-tab>
                </b-tabs>         
        </b-modal>
    </div>
</template>
<script>
export default {
        name: 'Chat',
        data: () =>({
                message: '',
                messages: []
        }),
        methods:{
                sendMessage(){
                        this.messages.push({
                                text:this.message,
                                author: 'Du'
                        }),
                        this.message= ''
                        
                },
                showThisModal(){
                        this.$refs['chat_open'].show()
                },
        }
        
}
</script>
<style>
@import "/assets/style.css";
.chatVerlauf{
        width: 100%;
        height: 15em;
        overflow: scroll;
        border: 1px solid #333;
}
</style>