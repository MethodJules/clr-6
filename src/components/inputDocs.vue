<template>
  <b-row>
    <div
      v-for="(input, i) in inputs"
      :key="i"
      class="card card-body text-center"
    >
      <div class="text-center">
        {{ input.name }}
      </div>
    </div>
  </b-row>
</template>
<script>
export default {
  computed: {
    inputs() {
      return this.$store.getters.getInputs;
    },
  },
};
</script>
<style scoped>
</style>