<template>
  <b-button id="popover-postfach">
    <b-icon icon="envelope"></b-icon>
    <b-popover target="popover-postfach" triggers="click" placement="bottom">
      <template #title>Benachrichtigung</template>
      <div class="card" v-for="postfach in listOfPostfach" :key="postfach.date">
        <div class="card-body text-center">
          <b-form :id="postfach.date" v-model="status">
            {{ postfach.postfach }}
            <b-button @click="deletePostfach(postfach)" class="btn btn-s">
              <b-icon icon="trash-fill"> </b-icon></b-button
          ></b-form>

          {{ postfach.nachrichten }}
        </div>
      </div>
    </b-popover>
  </b-button>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      status: "",
      listOfPostfach: [
        { postfach: "postfach1" },
        { postfach: "postfach2" },
        { postfach: "postfach3" },
      ],
    };
  },

  methods: {
    deletePostfach(postfach) {
      this.$store.dispatch("postfach/deletePostfach", postfach);
    },
  },
  //Die in der Datenbank gespeicherten Benachrichtigungen werden hiermit aufgelistet
  mounted() {
    this.$store.dispatch("postfach/loadPostfachFromBackend");
    this.listOfPostfach = this.$store.state.postfach.listOfPostfach;
  },
};
</script>



