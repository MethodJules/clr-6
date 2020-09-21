<template>
    
    <div class="navigation">
        <router-link tag="div" to="/scope" class="element">
            <p><b>Scope </b></p>
        </router-link>
        <router-link tag="div" to="/concept" class="element">
            <p><b>Concept </b></p>
        </router-link>
        <router-link tag="div" to="/search" class="element">
            <p><b>Search </b></p>
        </router-link>
        <router-link tag="div" to="/analysis" class="element">
            <p><b>Analysis </b></p>
        </router-link>
        <router-link tag="div" to="/agenda" class="element">
            <p><b>Agenda </b></p>
        </router-link>

        <div>
            <beautiful-chat :participants="participants"
                            :isOpen="isChatOpen"
                            :open="openChat"
                            :close="closeChat"
                            :onMessageWasSent="onMessageWasSent"
                            :colors="colors"
                            :messageList="messageList" />
        </div>
            <!--      
         :newMessagesCount="newMessagesCount"

         :showEmoji="true"
         :showFile="true"
         :showEdition="true"
         :showDeletion="true"
         :showTypingIndicator="showTypingIndicator"
         :showLauncher="true"
         :showCloseButton="true"

         :alwaysScrollToBottom="alwaysScrollToBottom"
         :messageStyling="messageStyling"
         @onType="handleOnType"
         @edit="editMessage"
    -->
            <!--
            <div class="search" @click="showDiv()">
                <p><b>&#9993; </b></p>
            </div>
            <div v-if="showSearch" class="viewSearch">
                <v-btn class="closeButton" @click="closeDiv()"> &#10006; </v-btn>


            </div>
    -->
        </div>
</template>
<script>

    export default {
        name: 'App',
        data: function () {
            return {
                showSearch: false, 
           
                participants: [
                    {
                        id: 'user1',
                        name: 'Admin',
                    },
                    {
                        id: 'user2',
                        name: 'User',
    
                    }
                ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
                titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
                messageList: [
                    { type: 'text', author: `me`, data: { text: `Say yes!` } },
                    { type: 'text', author: `user1`, data: { text: `No.` } }
                ], // the list of the messages to show, can be paginated and adjusted dynamically
                newMessagesCount: 0,
                isChatOpen: false, // to determine whether the chat window should be open or closed
                showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
                colors: {
                    header: {
                        bg: '#c93e37',
                        text: '#ffffff'
                    },
                    launcher: {
                        bg: '#c93e37'
                    },
                    messageList: {
                        bg: '#ffffff'
                    },
                    sentMessage: {
                        bg: '#c93e37',
                        text: '#ffffff'
                    },
                    receivedMessage: {
                        bg: '#eaeaea',
                        text: '#222222'
                    },
                    userInput: {
                        bg: '#f4f7f9',
                        text: '#565867'
                    }
                }, // specifies the color scheme for the component
                alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
                messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
            }
        },
        components: {
        },
        methods: {
            showDiv() {
                this.showSearch = true;
            },
            closeDiv() {
                this.showSearch = false;
            },

            sendMessage(text) {
                if (text.length > 0) {
                    this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
                    this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
                }
            },
            onMessageWasSent(message) {
                // called when the user sends a message
                this.messageList = [...this.messageList, message]
            },
            openChat() {
                // called when the user clicks on the fab button to open the chat
                this.isChatOpen = true
                this.newMessagesCount = 0
            },
            closeChat() {
                // called when the user clicks on the botton to close the chat
                this.isChatOpen = false
            },
            handleScrollToTop() {
                // called when the user scrolls message list to top
                // leverage pagination for loading another page of messages
            },
            handleOnType() {
                console.log('Emit typing event')
            },
            editMessage(message){
                const m = this.messageList.find(m => m.id === message.id);
                m.isEdited = true;
                m.data.text = message.data.text;
            }
        }

    }
</script>
<style scoped>
    .navigation {
        background-color: #362c2b;
        width: 20%;
        right: 10px;
        position: absolute;
        height: 99%;
        margin-top: 5px;    
        
    }
    .element {
        background-color: white;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        height: 12%;
        display: table;
        margin-top: 25px;
        cursor: pointer;
    }
    .router-link-active {
        background: #c93e37;
        color: white;
    }

    p {
        display: table-cell;
        vertical-align: middle;
    }
    .search {
        background-color: #c93e37;
        width: 30%;
        margin-left: 30%;
        position: absolute;
        bottom: 0;
        text-align: center;
        height: 8%;
        display: table;
        margin-top: 20px;
        color: white
    }
    .viewSearch {
        background-color: #c93e37;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0;
        height: 20%;
        display: table;
        margin-top: 20px;
    }

    .closeButton {
        background-color: #c93e37;
        position: absolute;
        right: 5px;
    }
</style>

