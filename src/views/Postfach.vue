<template>
  <div>
    <b-button id="popover-postfach">
      <b-icon icon="envelope"></b-icon>
    </b-button>
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
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      //no idea for what status is, but for now it is not referenced during render only
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
      //Löschen einer Benachrichtigung
      //this.listOfPostfach.splice(this.listOfPostfach.indexOf(postfach), 1)
      //alert("Delete");

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



