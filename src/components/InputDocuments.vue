<template>
  <div>
    <div class="loading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>

    <!-- Input Box 
    The uploaded files shown in here.  -->
    <!-- <b-row class="title">
            <h3>Input</h3>
        </b-row> -->
    <b-row class="d-flex justify-content-end">
      <b-button v-if="getUserRole != 'lecturer'" v-b-modal.fileUpload
        >+</b-button
      >
      <!-- For Database upload. This button may be activated later...     -->
      <!-- <b-button @click="uploadToDatabase()">Database Hochladen</b-button> -->
    </b-row>
    <!-- Zeige im Frontend -->
    <b-row>
      <div
        v-for="(input, index) in getInputs"
        :key="index"
        class="card card-body p-2"
      >
        <div>
          <p class="m-0">
            <!-- <p class="m-0"> -->
            {{ input.name }}
          </p>
          <span class="float-right sizeBox"
            >{{ input.size | convertSize }}
          </span>
          <a size="sm" :href="input.url"> Dokument ansehen</a>
          <!-- <b-button variant="success" size="sm" @click="input.url">
                        Show File button
                    </b-button> -->
          <b-button
            block
            variant="outline-danger"
            size="sm"
            @click="deleteFile(input, index)"
            >Löschen</b-button
          >
        </div>
      </div>
    </b-row>

    <!-- Modal, when user click "datei hochladen" button
    The place user adds files. 
     -->
    <b-row>
      <b-modal
        id="fileUpload"
        title="INPUT"
        ref="fileUploadModal"
        hide-footer
        centered
      >
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
            <!-- Ausgewählte Dateien: -->
            <li v-for="(input, i) in inputFiles" :key="i" class="mb-1">
              <b>{{ input.name }}</b>

              <span class="ml-2 sizeBox">
                {{ input.size | convertSize }}
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
              >Leeren</b-button
            >
            <b-button variant="danger" size="sm" @click="closeModal()"
              >Abbrechen</b-button
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
      uploadedFiles: [], // this is for database interaction.
      noFile: "Keine Datei Ausgewählt",
      okButtonClicked: false,
    };
  },
  computed: {
    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },
    ...mapGetters({ getInputs: "inputDocuments/getInputs" }),
    isLoading() {
      if (this.okButtonClicked) {
        return { display: "block" };
      } else {
        return { display: "none" };
      }
    },
    /* getInputs() {
      this.$store.dispatch("inputDocuments/loadInputdocumentsFromBackend");
    }, */
  },
  methods: {
    /**
     * @param files files that we are going to use
     * uploads the file
     * triggers loading bar
     * closes the modal
     */
    upload(files) {
      console.log(files);
      // changing okButtonClicked for loading bar
      this.okButtonClicked = true;
      this.$store.dispatch("inputDocuments/uploadFilesToDatabase", files);
      this.uploadedFiles.push(this.inputFiles);
      this.inputFiles = [];
      this.$refs["fileUploadModal"].hide();
      // setTimeout is for loading bar. - incomplete
      setTimeout(() => (this.okButtonClicked = false), 1000);
    },
    uploadToDatabase() {
      this.$store.dispatch(
        "inputDocuments/uploadFilesToDatabase",
        this.uploadedFiles
      );
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
     * @param index, index of the file that will be deleted
     * Deletes the file from state
     */
    deleteFile(input, index) {
      let payload = { input: input, index: index };
      this.$store.dispatch("inputDocuments/deleteInputDocuments", payload);
    },
  },

  mounted() {
    this.$store.dispatch("inputDocuments/loadInputdocumentsFromBackend");
    /* Because of the loading issues, we doesn't use the mounted function. We had the issue, that 
    the inputdocuments from backend to state could not be loaded, the state was always empty, where the inputarray of Documents are stored
    
    PLEASE NOTE: 
    Therefore we did not use the get request in mounted(), but in phases.js with (line 113), so that the input documents of the respective phases 
    are loaded easily after the individual phases are loaded */
    //this.$store.dispatch("inputDocuments/loadInputdocumentsFromBackend");
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
.card:hover {
  cursor: pointer;
}
</style>