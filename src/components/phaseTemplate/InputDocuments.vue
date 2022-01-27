<template>
  <div>
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
    <b-row class="addFileButton">
      <InputFileUploadButton />
    </b-row>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import InputFileUploadButton from "@/components/buttons/InputFileUploadButton.vue";
export default {
  data() {
    return {};
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