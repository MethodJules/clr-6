<template>

    <div class="seitennavigation">


                           <!--  <p><b-button href="Gruppe bilden" @click="hide" variant="outline-dark" >Gruppe bilden</b-button></p>
                            <p><b-button href="Ziel" @click="hide" variant="outline-dark">Ziel & Umfang</b-button></p>  -->
                            <!-- <router-link tag="div" to="./concept">
                                <p><b-button variant="outline-dark" >Konzepte & Definitionen </b-button></p>
                            </router-link> <br>

                            Sinnvoll hier alle Buttons zu befüllen? oder als prop hier reingeben? -> lieber als prop hier reingeben, damit buttons wiederverwendet
                            werden könnnen in anderen komponenten. in anderer funktion die diese hier aufruft einzeln eingeben? oder wie automatisieren?
                            -->
                          <br>
                                <!-- <b-link :to="{name: 'NAME DER ROUTE AUS router/index.js'}" class="btn btn-outline-dark btn-block mb-2">MENU LINK</b-link> -->
                                <b-link :to="{name: 'PhaseTemplate', params: { phase: 'Gruppe bilden'}}" class="btn btn-outline-dark btn-block mb-2">Gruppe bilden</b-link>
                                <b-link :to="{name: 'PhaseTemplate', params: { phase: 'Ziel'}}" class="btn btn-outline-dark btn-block mb-2">Ziel</b-link>
                                <b-link :to="{name: 'PhaseTemplate', params: { phase: 'Literatur'}}" class="btn btn-outline-dark btn-block mb-2">Literatur</b-link>
                                <b-link :to="{name: 'PhaseTemplate', params: { phase: 'Daten'}}" class="btn btn-outline-dark btn-block mb-2">Daten</b-link>                         
                                <b-link :to="{name: 'PhaseTemplate', params: { phase: 'Analyse'}}" class="btn btn-outline-dark btn-block mb-2">Analyse</b-link>
                                <b-link :to="{name: 'PhaseTemplate', params: { phase: 'Ergebnisse'}}" class="btn btn-outline-dark btn-block mb-2">Ergebnisse</b-link>
                                <b-link :to="{name: 'PhaseTemplate', params: { phase: 'Gruppe auflösen'}}" class="btn btn-outline-dark btn-block mb-2">Gruppe auflösen</b-link>
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
   /*  .seitennavigation {
        background-color: #362c2b;
        width: 20%;
        right: 10px;
        position: absolute;
        height: 99%;
        margin-top: 5px;

    }
    b-button-group {
        background-color: white;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        height: 12%;
        display: table;
        margin-top: 25px;
        cursor: pointer;

    }
    */
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

        .buttons {
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








