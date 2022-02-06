<template>
  <div>
    <b-row>
      <div
        v-for="(output, index) in getOutputs"
        :key="index"
        class="card card-body p-2"
      >
        <div>
          <p class="m-0">
            {{ output.name }}
            <span class="float-right sizeBox"
              >{{ output.size | convertSize }}
            </span>
          </p>

          <div class="buttons">
            <a
              :href="output.url"
              class="btn btn-secondary btn-sm"
              v-b-tooltip.hover
              title="Dokument Ansehen"
            >
              <b-icon icon="eyeglasses"></b-icon>
            </a>

            <b-button
              variant="secondary"
              size="sm"
              @click="deleteFile(output, index)"
            >
              <b-icon icon="trash"></b-icon
            ></b-button>
          </div>
        </div>
      </div>
    </b-row>
    <b-row class="d-flex justify-content-end">
      <OutputFileUploadButton />
    </b-row>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import OutputFileUploadButton from "@/components/buttons/OutputFileUploadButton.vue";

export default {
  components: {
    OutputFileUploadButton,
  },
  computed: {
    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },
    ...mapGetters({ getOutputs: "output_documents/getOutputs" }),
  },
  methods: {
    /**
     * @param index, index of the file that will be deleted
     * Deletes the file from state
     */
    deleteFile(output, index) {
      let payload = { output: output, index: index };
      this.$store.dispatch("output_documents/deleteOutputDocuments", payload);
    },
  },

  mounted() {
    this.$store.dispatch("output_documents/loadOutputdocumentsFromBackend");
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