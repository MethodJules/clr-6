<template>
  <div>
    <!-- Input Box 
    The uploaded files shown in here.  -->
    <b-row class="title p-1 d-flex justify-content-center">
      <h3>Input</h3>
    </b-row>
    <b-row class="d-flex justify-content-center p-2">
      <b-button v-b-modal.fileUpload>Datei Hochladen</b-button>
    </b-row>
    <b-row>
      <div v-for="(input, i) in getInputs" :key="i" class="card card-body p-2">
        <div>
          <p class="m-0">
            {{ input.name }}
          </p>
          <span class="float-right sizeBox">{{ input.size }} </span>

          <b-button
            block
            variant="outline-danger"
            size="sm"
            @click="deleteFile(i)"
            >Delete</b-button
          >
        </div>
      </div>
    </b-row>

    <!-- Modal, when user click "datei hochladen" button
    The place user adds files. 
     -->
    <b-row>
      <b-modal id="fileUpload" title="INPUT" ref="fileUploadModal" hide-footer>
        <template>
          <!-- https://bootstrap-vue.org/docs/components/form-file
          Form file input -->
          <b-form-file
            v-model="inputFiles"
            ref="files-input"
            placeholder="Wählen Sie eine Datei oder legen Sie sie hier ab ..."
            drop-placeholder="Datei hier ablegen..."
            multiple
            class="mb-2"
          ></b-form-file>
          <hr />

          <span ref="infoBox" class="mt-2">
            Button namen in Deutsch?
            <hr />

            <!-- Ausgewählte Dateien: -->

            <li v-for="(input, i) in inputFiles" :key="i" class="mb-1">
              <b>{{ input.name }}</b>

              <span class="ml-2 sizeBox">
                {{ convertSize(input.size) }}
              </span>
            </li>
          </span>
          <b-card-text align="right" class="mt-3">
            <b-button
              class="mr-2"
              variant="primary"
              size="sm"
              @click="upload(inputFiles)"
              >Ok</b-button
            >
            <b-button
              class="mr-2"
              variant="secondary"
              size="sm"
              @click="clear()"
              >Clear</b-button
            >
            <b-button variant="danger" size="sm" @click="closeModal()"
              >Cancel</b-button
            >
          </b-card-text>
        </template>
      </b-modal>
    </b-row>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      inputFiles: [],
      noFile: "Keine Datei Ausgewählt",
    };
  },
  computed: {
    ...mapGetters({ getInputs: "inputDocuments/getInputs" }),
  },

  methods: {
    // uploads the files and hides the modal
    /**
     * @param files files that we are going to use
     */
    upload(files) {
      this.$store.commit("inputDocuments/uploadFiles", files);
      this.inputFiles = [];
      this.$refs["fileUploadModal"].hide();
    },
    //
    /**
     * deletes all of the files that are selected by assigning to
     * inputFiles array to the start value
     */
    clear() {
      this.inputFiles = [];
    },
    /**
     * deletes all of the files that are selected by assigning to
     * inputFiles array to the start value
     * and closes the modal
     *  */

    closeModal() {
      this.inputFiles = [];
      this.$refs["fileUploadModal"].hide();
    },

    /**
     * @param size a value in byte
     * @return size a value in GB or MB
     * converts given size in byte to MB or GB
     */
    convertSize(size) {
      if (size > 100000000) {
        size /= 1073741824;
        size = size.toFixed(2);
        size += " GB";
      } else {
        size /= 1048576;
        size = size.toFixed(2);
        size += " MB";
      }
      return size;
    },
    /**
     * @param index, index of the file that will be deleted
     * Deletes the file from state
     */
    deleteFile(index) {
      this.$store.commit("inputDocuments/deleteInput", index);
    },
  },
};
</script>
<style scoped>
.title {
  width: auto;
  background-color: rgb(78, 78, 78);
}
.title h3 {
  color: white;
}
hr {
  background-color: #e9ecef;
  border-radius: 0.1px;
}
.sizeBox {
  font-size: 0.8rem;
  color: white;
  background: rgb(49, 180, 167);
  padding: 0.3rem;
  margin-bottom: 0.4rem;
  border-radius: 10%;
}
.sizeBox:hover {
  background: rgb(39, 146, 135);
}
.card:hover {
  cursor: pointer;
}
</style>