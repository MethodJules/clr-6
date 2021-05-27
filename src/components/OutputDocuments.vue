<template>
  <div>
    <b-row class="title d-flex justify-content-center p-1">
      <h3>Output</h3>
    </b-row>
    <b-row>
      <div
        class="card card-body text-center"
        v-for="outputDocs in listOfOutputs"
        :key="outputDocs.file"
      >
        <div class="text-center">
          {{ outputDocs.file }}
        </div>
      </div>
    </b-row>
    <b-row>
      <b-col cols="6"> </b-col>
      <b-col>
        <b-modal id="output_edit_modal" title="Output">
          <b-form-textarea
            id="output_edit_form_textarea"
            rows="6"
            v-model="outputFile"
          ></b-form-textarea>
          <!-- https://www.raymondcamden.com/2019/08/08/drag-and-drop-file-upload-in-vuejs -->
          <div id="output" v-cloak @drop.prevent="addFile" @dragover.prevent>
            <h2>Files to Upload (Drag them over)</h2>
            <ul>
              <li v-for="file in files" :key="file">
                {{ file.name }} ({{ file.size | kb }} kb)
                <button @click="removeFile(file)" title="Remove">X</button>
              </li>
            </ul>
            <label
              >File
              <input
                type="file"
                id="file"
                ref="file"
                @change="handleFileUpload()"
              />
            </label>
            <button :disabled="uploadDisabled" @click="upload">Upload</button>
          </div>
        </b-modal>
        <b-row class="d-flex justify-content-end p-2">
          <b-button v-b-modal.output_edit_modal>+</b-button>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      file: "",
      listOfOutputs: [
        { file: "Outputdatei 1" },
        { file: "Outputdatei 2" },
        { file: "Outputdatei 3" },
      ],
    };
  },

  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log("heyyy");
      console.log(this.file);
    },

    upload() {
      var fileausgabe = new FormData();
      var output_datei = this.file;
      fileausgabe.append(output_datei, "titel");
      this.$store.dispatch("output_documents/createOutputData", fileausgabe);

      console.log(this.file + "  in upload this.file");
      console.log(
        fileausgabe.output_datei + "  in upload fileausgabeoutputdatei"
      );
    },

    /*          var ausgabe = {

            output_datei: this.file,
         }
      this.$store.dispatch('output_document/createOutputData', ausgabe) */

    /*       
      let formData = new FormData();
      this.files.forEach((f, x) => {
        formData.append("file" + (x + 1), f);
      });

      fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      })
      .catch(e => {
        console.error(JSON.stringify(e.message));
      }); */
  },
};
</script>
<style scoped>
.title {
  width: auto;
  /* height: 1em; */
  background-color: rgb(78, 78, 78);
}
.title h3 {
  color: white;
}
</style>