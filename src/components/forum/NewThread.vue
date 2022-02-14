<template>
  <div class="home">
    <div class="home">
      <h1>Create New Thread</h1>
      <div class="scroll">
        <NewThreadEditor @save="newThread" :forumId="id" />
      </div>
    </div>
  </div>
</template>
<script>
import NewThreadEditor from "@/components/NewThreadEditor";
export default {
  name: "Home",
  components: {
    NewThreadEditor,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  methods: {
    async newThread({ thread, post }) {
      console.log(post);
      await this.$store.dispatch("createNewThread", [thread, post]);
      this.$router.push({ name: "ForumThreads", params: { id: this.id } });
    },
  },
};
</script>
<style scoped>
.scroll {
  overflow: scroll;
  height: 100%;
  overflow: scroll;
  width: 100%;
  padding: 10px;
}
h1 {
  color: #c93e37;
}
</style>
s