<template>
  <div>
    <b-row>
      <b-input-group prepend="Benutztes Tool" class="mt-3">
        <b-form-input
          v-model="tool"
          type="text"
          placeholder="Schreiben Sie Tool"
        ></b-form-input>
        <b-input-group-append>
          <b-button variant="secondary" @click="ok">Ok</b-button>
          <b-button variant="danger">Abbrechen</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-row>
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
            :disabled="getUserRole == 'lecturer'"
            >{{ tool.title }}
          </b-form-checkbox>
        </div>
      </div>
    </b-row>
    <b-overlay :show="busy" no-wrap>
      <template #overlay>
        <div
          v-if="processing"
          class="text-center p-4 bg-primary text-light rounded"
        >
          <b-icon icon="cloud-upload" font-scale="4"></b-icon>
          <div class="mb-3">In Bearbeitung...</div>
          <b-progress
            min="1"
            max="20"
            :value="counter"
            variant="success"
            height="3px"
            class="mx-n4 rounded-0"
          ></b-progress>
        </div>
      </template>
    </b-overlay>
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
      busy: false,
      processing: false,
      counter: 1,
      interval: null,
    };
  },
  methods: {
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    /**
     * @param files files that we are going to use
     * uploads the file
     * triggers loading bar
     * closes the modal
     */
    upload(neueEingabe) {
      this.$store.dispatch("tool/createTool", neueEingabe).then(() => {
        this.processing = false;
        this.busy = false;
      });
      this.tool = "";
    },

    ok() {
      this.busy = true;
      this.counter = 1;
      this.processing = true;

      this.clearInterval();
      this.interval = setInterval(() => {
        if (this.counter < 20) {
          this.counter = this.counter + 1;
        }
      }, 350);

      let neueEingabe = {
        usedTool: this.tool,
      };
      this.upload(neueEingabe);
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