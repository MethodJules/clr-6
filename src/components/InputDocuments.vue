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
            <b-button v-b-modal.fileUpload>+</b-button>
            <!-- For Database upload. This button may be activated later...     -->
            <!-- <b-button @click="uploadToDatabase()">Database Hochladen</b-button> -->
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
                    <input type="file" @change="onFileChanged" />
                    <hr />

                    <b-card-text align="right" class="mt-3">
                        <b-button
                            class="mr-2"
                            variant="primary"
                            size="sm"
                            @click="upload"
                            >Ok</b-button
                        >
                        <b-button
                            class="mr-2"
                            variant="secondary"
                            size="sm"
                            @click="clear()"
                            >Leeren</b-button
                        >
                        <b-button
                            variant="danger"
                            size="sm"
                            @click="closeModal()"
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
            //inputFiles: [],
            //uploadedFiles: [], // this is for database interaction.
            //noFile: "Keine Datei Ausgewählt",
            //okButtonClicked: false,
            file: null,
        };
    },
    computed: {
        ...mapGetters({ getInputs: "inputDocuments/getInputs" }),
        isLoading() {
            if (this.okButtonClicked) {
                return { display: "block" };
            } else {
                return { display: "none" };
            }
        },
    },

    methods: {
        /**
         * @param files files that we are going to use
         * uploads the file
         * triggers loading bar
         * closes the modal
         */

        onFileChanged(file) {
            if (file) {
                console.log(file);
                this.file = file;
            }
        },

        upload() {
            // changing okButtonClicked for loading bar
            /* this.okButtonClicked = true;
      this.$store.commit("inputDocuments/uploadFiles", files);
      this.files.push(this.inputFiles);
      this.inputFiles = [];
      this.$refs["fileUploadModal"].hide(); */
            // setTimeout is for loading bar. - incomplete
            //setTimeout(() => (this.okButtonClicked = false), 1000);

            this.$store.dispatch(
                "inputDocuments/uploadFilesToDatabase",
                this.file
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
        deleteFile(index) {
            this.$store.commit("inputDocuments/deleteInput", index);
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
.card:hover {
    cursor: pointer;
}
</style>