<template>
  <div>
    <b-row>
      <div
        class="card-body text-center"
        v-for="(tool, index) in listOfTools"
        :key="index"
      >
        <div>
          <b-form-checkbox
            :id="tool.uuid"
            name="checkbox-1"
            @input="checkboxUpdate(index, tool)"
            v-model="tool.benutzt"
            >{{ tool.title }}
          </b-form-checkbox>
        </div>
      </div>
    </b-row>
    <b-row>
      <b-col cols="6"> </b-col>
      <b-col>
        <b-modal id="tools_edit_modal" title="tools">
          <label for="neueTools">Benutztes Tool: </label>
          <input v-model="tool" type="text" placeholder="Tool" />
          <b-button @click="ok()"> OK </b-button>
        </b-modal>
        <b-button v-b-modal.tools_edit_modal>+</b-button>
      </b-col>
    </b-row>
  </div>
</template> 
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tool: "",
    };
  },
  methods: {
    ok() {
      var neueEingabe = {
        usedTool: this.tool,
      };

      this.$store.dispatch("tool/createTool", neueEingabe);

      this.tool = "";
    },

    checkboxUpdate(index, toolGeaendert) {
      console.log(toolGeaendert);

      this.$store.dispatch("tool/updateToolWithCheckbox", toolGeaendert);
    },
  },

  /* mounted() {
    this.$store.dispatch("tool/loadToolsFromBackend");
  }, */

  computed: {
    ...mapGetters({ listOfTools: "tool/getTools" }),
  },
};
</script> 
<style>
.title {
  width: auto;
  height: 100 px;
  background-color: rgb(78, 78, 78);
}
h4 {
  color: white;
}
</style>