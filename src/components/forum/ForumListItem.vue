<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        class="text-xlarge"
        :to="{ name: 'ForumThreads', params: { id: forum['.key'] } }"
      >
        {{ forum.name }}
      </router-link>

      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p class="count">{{ threadsCound }}</p>
      {{ threadsCound === 1 ? "thread" : "threads" }}
    </div>

    <div class="last-thread"></div>
  </div>
</template>

<script>
import { countObjectProperties } from "@/utils";

export default {
  props: {
    forum: {
      required: true,
      type: Object,
    },
  },
  computed: {
    threadsCound() {
      return countObjectProperties(this.forum.threads);
    },
  },
};
</script>

<style scoped>
</style>
