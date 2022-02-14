<template>
  <b-button
    size="sm"
    v-if="getUserRole != 'lecturer'"
    v-b-modal.outputfileUpload
  >
    <b-icon icon="plus"></b-icon>

    <b-modal
      id="outputfileUpload"
      title="OUTPUT"
      ref="outputfileUploadModal"
      hide-footer
      centered
    >
      <template>
        <b-form-file
          v-model="outputFiles"
          ref="files-output"
          placeholder="Wählen Sie eine Datei oder legen Sie sie hier ab ..."
          drop-placeholder="Datei hier ablegen..."
          multiple
          class="mb-2"
        ></b-form-file>
        <hr />

        <span ref="infoBox" class="mt-2">
          <li v-for="(output, i) in outputFiles" :key="i" class="mb-1">
            <b>{{ output.name }}</b>
            <span class="ml-2 sizeBox">
              {{ output.size | convertSize }}
            </span>
          </li>
        </span>
        <b-card-text align="right" class="mt-4">
          <b-button
            class="mr-2"
            variant="primary"
            size="sm"
            @click="upload(outputFiles)"
            >Ok</b-button
          >
          <b-button class="mr-2" variant="secondary" size="sm" @click="clear()"
            >Leeren</b-button
          >
          <b-button variant="danger" size="sm" @click="closeModal()"
            >Abbrechen</b-button
          >
        </b-card-text>
      </template>
    </b-modal>
  </b-button>
</template>
<script>
export default {
  data() {
    return {
      outputFiles: [],
      uploadedFiles: [], // this is for database interaction.
      noFile: "Keine Datei Ausgewählt",
    };
  },
  computed: {
    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },
  },
  methods: {
    /**
     * @param files files that we are going to use
     * uploads the file
     * triggers loading bar
     * closes the modal
     */
    upload(files) {
      this.$store.dispatch("output_documents/uploadFilesToDatabase", files);
      this.uploadedFiles.push(this.outputFiles);
      this.outputFiles = [];
      this.$refs["outputfileUploadModal"].hide();
    },
    uploadToDatabase() {
      this.$store.dispatch(
        "output_documents/uploadFilesToDatabase",
        this.uploadedFiles
      );
    },
    /**
     * deletes all of the files that are selected by assigning to
     * outputFiles array to the start value
     */
    clear() {
      this.outputFiles = [];
    },
    /**
     * deletes all of the files that are selected by assigning to
     * outputFiles array to the start value
     * and closes the modal
     *  */
    closeModal() {
      this.outputFiles = [];
      this.$refs["outputfileUploadModal"].hide();
    },
  },
};
</script>
<style scoped>
.title {
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: rgb(78, 78, 78);
  width: 100px;
}
.title h3 {
  color: white;
  font-size: 1.5rem;
  width: 100%;
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
</style>