<template>
  <div>
    <ForumListItem
      v-for="forum in forums"
      :forum="forum"
      :key="forum['.key']"
    />
  </div>
</template>
<script>
import ForumListItem from "@/components/forum/ForumListItem";
export default {
  components: {
    ForumListItem,
  },
  props: {
    forums: {
      required: true,
      type: Array,
    },
  },
};
</script>