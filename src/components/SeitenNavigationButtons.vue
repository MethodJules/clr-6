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
      phasen: [
        {
          id: "0",
          title: "Gruppe Bilden",
          status: true,
          to: "PhaseTemplate",
          iconType: "people",
        },
        {
          id: "1",
          title: "Ziel & Umfang definieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "signpost-split",
        },
        {
          id: "2",
          title: "Konzepte & Definitionen identifizieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "diagram3",
        },
        {
          id: "3",
          title: "Literatur Suchen",
          status: true,
          to: "PhaseTemplate",
          iconType: "book",
        },
        {
          id: "4",
          title: "Daten Extrahieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "arrow-left-right",
        },
        {
          id: "5",
          title: "Literatur Analysieren & Syntheisieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "vector-pen",
        },
        {
          id: "6",
          title: "Ergebnisse Kommunizieren",
          status: true,
          to: "PhaseTemplate",
          iconType: "card-checklist",
        },
        {
          id: "7",
          title: "Gruppe Auflösen",
          status: true,
          to: "PhaseTemplate",
          iconType: "columns-gap",
        },
      ],
    };
  },
  components: {
    ChatAdvanced,
    Postfach,
  },
  methods: {
    phaseAbschliessen(id) {
      this.phasen[id].status = false;
      this.$emit("statusChange", this.phasen[id]);
      console.log(this.phasen);
    },
  },
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