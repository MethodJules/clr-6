<template>
  <div>
    <b-row class="title p-1 d-flex justify-content-center">
      <h3>Input</h3>
    </b-row>

    <b-row>
      <div
        v-for="(input, i) in inputFiles"
        :key="i"
        class="card card-body text-center"
      >
        <div class="text-center">
          {{ input.name }}
        </div>
      </div>
    </b-row>

    <b-row>
      <b-modal id="fileUpload" title="INPUT" ref="fileUploadModal" hide-footer>
        <template>
          <!-- https://bootstrap-vue.org/docs/components/form-file
          Form file input -->
          <b-form-file
            v-model="inputFiles"
            ref="files-input"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            multiple
            class="mb-2"
          ></b-form-file>
          <hr />
          <!-- It does not show state -->
          <span ref="infoBox" class="mt-2">
            Selected Files:

            <li v-for="(input, i) in inputFiles" :key="i">
              <b>{{ input.name }}</b>
            </li>
          </span>
          <b-card-text align="right">
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

    <b-row class="d-flex justify-content-end p-2">
      <b-button v-b-modal.fileUpload align-self="end">+</b-button>
    </b-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      inputFiles: [{ name: "No File Selected" }],
    };
  },
  computed: {
    inputs() {
      // I cannot use computed properties here. I cannot show the inputs in the HTML-DOM.
      // thats why I have created inputFiles array above. I am using it to show uploaded files.
      // But every time I upload files, I cannot see previous files while it overrides to inputFiles array.
      // I do not delete this computed property. If we can solve this problem, our system will work more logical and better.
      console.log("hello");
      return this.$store.getters.getInputs;
    },
  },
  methods: {
    // uploads the files and hides the modal
    upload(files) {
      console.log(files);
      this.$store.commit("inputDocuments/uploadFiles", files);

      this.$refs["fileUploadModal"].hide();
    },
    // deletes all of the files that are selected
    clear() {
      // this.listOfInputs = this.listOfInputsTemplate;
      this.inputFiles = [{ name: "No File Selected" }];
      // console.log("state is clean...");
      // console.log(state.listOfInputs);
    },
    // deletes all ofthe file and closes the modal
    closeModal() {
      // this.listOfInputs = this.listOfInputsTemplate;
      this.inputFiles = [{ name: "No File Selected" }];

      // console.log("state is clean...");
      // console.log(state.listOfInputs);
      this.$refs["fileUploadModal"].hide();
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
</style>