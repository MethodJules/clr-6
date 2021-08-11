<template>
    <div>
        <!-- open modal -->
        <!-- https://www.youtube.com/watch?v=2wEcS32MGQc -->
        <b-button id="popover-chat">
            <b-icon icon="chat"></b-icon>
        </b-button>
        <b-popover
            target="popover-chat"
            triggers="click"
            placement="bottomleft"
        >
            <template #title>Projekt 1 Chat</template>
            <ChatAdvanced />
        </b-popover>
    </div>
</template>
<script>
import ChatAdvanced from "@/components/ChatAdvanced.vue";
export default {
    components: {
        ChatAdvanced,
    },
};
</script>
<style>
@import "/assets/style.css";
</style>