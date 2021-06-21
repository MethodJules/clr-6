<template>
    <div>
        <!-- open modal -->
         <!-- https://www.youtube.com/watch?v=2wEcS32MGQc -->
        <b-button @click="showThisModal()" v-b-modal="'chat_open2'">CHAT</b-button>
        <b-modal ref="chat_open2" height="600" width="600" title="Projekt 1 Chat" hide-footer>
            <ChatAdvanced/>
            
        </b-modal>
        
    </div>

</template>
<script>
import ChatAdvanced from "@/components/ChatAdvanced.vue";
export default {
    components: {
        ChatAdvanced
    },
    methods:{
        showThisModal(){
                        this.$refs['chat_open2'].show()
                },
    }

}
</script>
<style>
@import "/assets/style.css";
.chat_open2{
        width: 500;
        height: 35em;
        overflow: scroll;
        border: 1px solid #333;
}
</style>