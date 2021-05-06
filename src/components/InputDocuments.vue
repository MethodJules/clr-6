<template>
  <div>
    <b-row class="title p-1 d-flex justify-content-center">
      <h3>Input</h3>
    </b-row>
    <b-row>
      <div
        class="card card-body text-center"
        v-for="inputDocs in listOfInputs"
        :key="inputDocs.name"
      >
        <div class="text-center">
          {{ inputDocs.name }}
        </div>
      </div>
    </b-row>

    <b-row>
      <b-modal id="fileUpload" title="INPUT" hide-footer>
        <template #default="{ ok, cancel }">
          <b-form-file
            v-model="listOfInputs"
            ref="files-input"
            multiple
            class="mb-2"
          ></b-form-file>
          <hr />

          <span ref="infoBox" class="mt-2">
            Selected Files:

            <li v-for="file in listOfInputs" :key="file.name">
              <b>{{ file.name }}</b>
            </li>
          </span>
          <b-card-text align="right">
            <b-button class="mr-2" variant="success" size="sm" @click="ok()">
              Ok
            </b-button>
            <b-button
              class="mr-2"
              variant="primary"
              size="sm"
              @click="upload(listOfInputs)"
              >Upload</b-button
            >
            <b-button
              class="mr-2"
              variant="secondary"
              size="sm"
              @click="clear()"
              >Clear</b-button
            >
            <b-button variant="danger" size="sm" @click="cancel()"
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
const state = () => ({
  listOfInputs: [],
});

export default {
  data() {
    return {
      listOfInputs: [
        { name: "Inputdatei 1" },
        { name: "Inputdatei 2" },
        { name: "Inputdatei 3" },
      ],

      listOfInputsTemplate: [
        { name: "Inputdatei 1" },
        { name: "Inputdatei 2" },
        { name: "Inputdatei 3" },
      ],
    };
  },
  methods: {
    upload(files) {
      state.listOfInputs  = files;
      console.log("From State");
      console.log(state.listOfInputs);
      console.log("From Page:");
      console.log(this.listOfInputs);
    },
    clear() {
      // this.listOfInputs = null;
      this.listOfInputs = this.listOfInputsTemplate;
      state.listOfInputs = null;
      console.log("state is clean...");
      console.log(state.listOfInputs);
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