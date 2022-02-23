<template>
  <div>
    <div class="file-upload">
      <b-form-file
        v-model="inputFiles"
        ref="files-input"
        placeholder="Wählen Sie eine Datei oder legen Sie sie hier ab ..."
        drop-placeholder="Datei hier ablegen..."
        multiple
        class="mb-2"
      ></b-form-file>
      <b-card-text align="right" class="mt-3">
        <b-button class="mr-2" variant="secondary" size="sm" @click="onOK"
          >Hochladen</b-button
        >
        <b-button class="mr-2" variant="secondary" size="sm" @click="clear()"
          >Leeren</b-button
        >
      </b-card-text>
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
    </div>

    <b-row>
      <div
        v-for="(input, index) in getInputs"
        :key="index"
        class="card card-body p-2"
      >
        <div>
          <p class="m-0">
            {{ input.name }}
            <span class="sizeBox float-right"
              >{{ input.size | convertSize }}
            </span>
          </p>

          <div class="buttons">
            <a
              :href="input.url"
              class="btn btn-secondary btn-sm"
              v-b-tooltip.hover
              title="Dokument Ansehen"
            >
              <b-icon icon="eyeglasses"></b-icon>
            </a>

            <b-button
              variant="secondary"
              size="sm"
              @click="deleteFile(input, index)"
            >
              <b-icon icon="trash"></b-icon
            ></b-button>
          </div>
        </div>
      </div>
    </b-row>
    <!-- <b-row class="addFileButton">
      <InputFileUploadButton />
    </b-row> -->
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import InputFileUploadButton from "@/components/buttons/InputFileUploadButton.vue";
export default {
  data() {
    return {
      busy: false,
      processing: false,
      counter: 1,
      interval: null,
      inputFiles: [],
    };
  },
  components: {
    InputFileUploadButton,
  },
  computed: {
    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },
    ...mapGetters({ getInputs: "inputDocuments/getInputs" }),
  },
  methods: {
    /**
     * @param index, index of the file that will be deleted
     * Deletes the file from state
     */
    deleteFile(input, index) {
      let payload = { input: input, index: index };
      this.$store.dispatch("inputDocuments/deleteInputDocuments", payload);
    },
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
    upload(files) {
      this.$store
        .dispatch("inputDocuments/uploadFilesToDatabase", files)
        .then(() => {
          this.processing = false;
          this.busy = false;
        });

      this.inputFiles = [];
    },

    onCancel() {
      this.busy = false;
    },
    onOK() {
      this.busy = true;
      this.counter = 1;
      this.processing = true;

      this.clearInterval();
      this.interval = setInterval(() => {
        if (this.counter < 20) {
          this.counter = this.counter + 1;
        }
      }, 350);
      // upload files..
      this.upload(this.inputFiles);
      // upload files
    },
  },
  mounted() {
    this.$store.dispatch("inputDocuments/loadInputdocumentsFromBackend");
  },
};
</script>
<style scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.7rem;
  gap: 0.5rem;
}

.card:hover {
  cursor: pointer;
}
.sizeBox {
  font-size: 0.8rem;
  color: white;
  background: #6c757d;
  padding: 0.3rem;
  margin-bottom: 0.4rem;
  border-radius: 10%;
}
.sizeBox:hover {
  background: #626a72;
}
.addFileButton {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem !important;
}
</style>