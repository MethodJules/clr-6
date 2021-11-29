<template>
  <div>
    <div class="buttons-container">
      <Postfach />
      <div>
        <!-- open modal -->
        <!-- https://www.youtube.com/watch?v=2wEcS32MGQc -->
        <b-button id="popover-chat">
          <b-icon icon="chat"></b-icon>
        </b-button>
        <b-popover
          :show.sync="show"
          target="popover-chat"
          triggers="click"
          placement="leftbottom"
        >
          <b-row>
            <b-button
              type="button"
              class="close"
              aria-label="Close"
              @click="show = !show"
            >
              <span aria-hidden="true">&times;</span>
            </b-button>
          </b-row>
          <b-row>
            <ChatAdvanced />
          </b-row>
        </b-popover>
      </div>
    </div>
  </div>
</template>
<script>
import ChatAdvanced from "@/components/ChatAdvanced.vue";
import Postfach from "@/views/Postfach.vue";
export default {
  data() {
    return {
      show: false,
    };
  },
  components: {
    ChatAdvanced,
    Postfach,
  },
  methods: {},
};
</script>
<style scoped>
.buttons-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.popover {
  max-width: 100%; /* Max Width of the popover (depending on the container!) */
}
</style>