<template>
  <vc-calendar :attributes="attributes" is-expanded />
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      attributes: "todo/getAttributesForVcCalendar",
    }),
  },
};
</script>
