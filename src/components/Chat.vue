<template>
    <div>
        <!-- open modal -->
         <!-- https://www.youtube.com/watch?v=2wEcS32MGQc -->
        <b-button @click="showThisModal()" v-b-modal="'chat_open'">CHAT</b-button>
        <b-modal ref="chat_open" title="Projekt 1 Chat" hide-footer>
                
                <b-tabs content-class="mt-3" pills card vertical>   
                        <!-- differnet tabs for different chats -->
                        <b-tab title="Martin">
                                <div class="chatVerlauf"> 
                                        <div class="chat-list-container">
                                                <!-- shows all messages the user send -->
                                        <ul class="chat-list">
                                                <li class="message"
                                                v-for="(message, idx) in messages"
                                                :key="idx"
                                                >

                                                <!-- shows who sends which content and when -->
                                                <p >
                                                        
                                                        Ich(<span>{{timestamp}}</span>): 
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
                                        <br>
                                        <b-button @click="showThisMemberModal()" variant="success" size="sm" v-b-modal.chat_member>
                                                neuer Chat
                                        </b-button>                      
                                </div>
                                
                                
                        </b-tab>
                        <!-- adding v-for="chat in chatList" :key="chat.id" -->
                        <b-tab v-for="i in tabs" :key="'dyn-tab-' + i" :title="'Tab ' +i + ' '+ chat.name">
                                <div class="chatVerlauf"> 
                                        <div class="chat-list-container">
                                                <!-- shows all messages the user send -->
                                        <ul class="chat-list">
                                                <li class="message"
                                                v-for="(message, idx) in messages"
                                                :key="idx"
                                                >

                                                <!-- shows who sends which content and when -->
                                                <p >
                                                        
                                                        Ich(<span>{{message.timestamp}}</span>): 
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
                                        <br>
                                        <b-button @click="showThisMemberModal()" variant="success" size="sm" v-b-modal.chat_member>
                                                neuer Chat
                                        </b-button>                      
                                </div>
                                <b-button size="sm" variant="danger" class="float-right" @click="closeTab(i)">
                                        Close tab
                                </b-button>
                        </b-tab>
                        <!-- New Tab Button (Using tabs-end slot) -->
                        <template #tabs-end>
                                <b-nav-item role="presentation" @click.prevent="newTab" href="#"><b>+</b></b-nav-item>
                        </template>
                        
                        <b-modal ref="chat_member" title="Kontakte" hide-footer>
                                <label for="chatMember">Gruppenmitglied:</label>
                                <input id="chatMember" v-model="chat.name"/>
                                <b-button @click.prevent="newTab">hinzufügen</b-button>
                        </b-modal>
                </b-tabs>         
        </b-modal>
    </div>
</template>
<script>
export default {
        name: 'Chat',
        data: () =>({
                message: '',
                messages: [],
                timestamp: '',
                timeList: [],
                today: '', 
                tabs: [],
                tabCounter: 0,
                chat:{
                        messages:[],
                        members: [
                                {
                                name: 'Marcel',
                                },{
                                name: 'Nithusha'
                        }]
                }
        }),
        
        methods:{
                
                sendMessage(){
                        //get the time
                        const today = new Date();
                        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        this.timestamp = time;
                        this.timeList.push({
                                timestamp:this.timestamp,
                        })
                        //save the user input in the array messages
                        this.messages.push({
                                
                                text:this.message,
                                author: 'Du'
                        }),
                        this.message= ''
                        
              
                },
                showThisModal(){
                        this.$refs['chat_open'].show()
                },
                addNewChat(){
                        this.chatList.push({
                                member: this.chat
                        })
                        this.chat= ''

                }, 
                showThisMemberModal(){
                        this.$refs['chat_member'].show()
                },
                closeTab(x) {
                        for (let i = 0; i < this.tabs.length; i++) {
                                if (this.tabs[i] === x) {
                                        this.tabs.splice(i, 1)
                                }
                        }
                 },
                newTab() {
                        this.tabs.push(this.tabCounter++)
                }
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