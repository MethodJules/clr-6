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
    <b-row class="buttons">
      <b-button v-b-modal.tools_edit_modal v-if="getUserRole != 'lecturer'"
        >+</b-button
      >
    </b-row>
    <b-modal id="tools_edit_modal" title="tools" @ok="ok">
      <label for="neueTools">Benutztes Tool: </label>
      <input v-model="tool" type="text" placeholder="Tool" />
    </b-modal>
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
      this.$store.dispatch("tool/updateToolWithCheckbox", toolGeaendert);
    },
  },

  mounted() {
    this.$store.dispatch("tool/loadToolsFromBackend");
  },

  computed: {
    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },
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

.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>