// TODO is this currently in use? I think you're using MenueLeiste.vue instead. If not in use, please remove.

<template>

    <div class="navigation">
        <!--  <router-link tag="div" to="/scope" class="element">
        <p><b>Scope </b></p>
    </router-link> -->
        <router-link tag="div" to="/concept" class="element">
            <p><b>Concept </b></p>
        </router-link>
        <router-link tag="div" to="/review" class="element">
            <p><b>Review </b></p>
        </router-link>
        <router-link tag="div" to="/groupmanagement" class="element">
        <p><b>Groupmanagement </b></p>
        </router-link> 
        <!-- <router-link tag="div" to="/analysis" class="element">
        <p><b>Analysis </b></p>
    </router-link> -->
        <!-- <router-link tag="div" to="/agenda" class="element">
        <p><b>Agenda </b></p>
    </router-link> -->

        <div class="search">
            <beautiful-chat class="chat"
                            :participants="participants"
                            :isOpen="isChatOpen"
                            :open="openChat"
                            :close="closeChat"
                            :onMessageWasSent="onMessageWasSent"
                            :colors="colors"
                            :messageList="messageList">

                <template v-slot:header class="chat-header">
                    Helper
                </template>
                <template v-slot:user-avatar="{ message, user }">
                    <div style="margin: 5px;" v-if="message.type === 'text' && user && user.name">

                    </div>
                </template>
            </beautiful-chat>
        </div>
        <router-link tag="div" to="/forum" class="forum">
            <p><b>Forum </b></p>
        </router-link> -->
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
                  messageList: [
                    { type: 'text', author: `me`, data: { text: `Ich habe eine Frage...` } },
                    { type: 'text', author: `user1`, data: { text: `Da helfe ich dir gern!` } }
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
                        bg: '#c93e37'
                    },
                    sentMessage: {
                        bg: '#ffffff',
                        text: '#222222'
                    },
                    receivedMessage: {
                        bg: '#eaeaea',
                        text: '#c93e37'
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
        background: #c93e37 !important;
        color: white;
       
    }

    p {
        display: table-cell;
        vertical-align: middle;
    }
    .search {
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
    .forum {
        position: absolute;
        bottom: 0;
        margin-left: 65%;
        width: 30%;
        height: 60px;
        background-color: #c93e37;
        text-align: center;
        margin-bottom: 20px;
        display: table;
        cursor: pointer;
        color: white;
        border-radius: 50%;
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


</style>

