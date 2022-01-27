<template>
  <div class="home">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{ forum.name }}</h1>
          <p class="text-lead">{{ forum.description }}</p>
        </div>

        <router-link
          :to="{ name: 'NewThread', params: { id: id } }"
          class="btn-red btn-small"
        >
          Start a thread
        </router-link>
      </div>
    </div>
    <div class="scroll">
      <div class="col-full">
        <ThreadList :threads="threads" />
      </div>
    </div>
  </div>
</template>

<script>
import ThreadList from "@/components/forum/ThreadList";

export default {
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  components: {
    ThreadList,
  },
  computed: {
    forum() {
      return this.$store.state.forums[this.id];
    },
    threads() {
      return Object.values(this.$store.state.threads).filter(
        (thread) => thread.forumId === this.id
      );
    },
  },
};
</script>

<style scoped>
.forum-wrapper {
  width: 100%;
}
h1 {
  color: #c93e37;
}
.scroll {
  overflow: scroll;
  height: 75%;
  overflow: scroll;
  width: 100%;
  padding: 10px;
}
</style>
