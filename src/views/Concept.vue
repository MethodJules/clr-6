<template>
  <div class="home p-4">
    <b-tabs content-class="mt-3">
      <b-tab title="Concept Map" active>
        <Concept />
      </b-tab>
      <b-tab title="Comments">
        <div class="comments">
          <CommentForm />
        </div>
      </b-tab>
      <b-tab title="Daily Scrum">
        <div class="dailys">
          <br />
          <h1>Daily Scrum</h1>
          <TabelleDaily msg="Welcome to Your Vue.js App" />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>



<script>
import Concept from "@/components/Concept";
import TabelleDaily from "@/components/TabelleDaily";
import CommentForm from "@/components/CommentForm";

//import CreateConnection from '@/components/CreateConnection'

export default {
  name: "Home",

  components: {
    //CreateConnection,
    Concept,
    CommentForm,
    TabelleDaily,
  },
};
</script>
<style scoped>
.home {
  width: 100%;
  background-color: white;
  height: 100%;
  margin: 0px;
}

.comments {
  border: solid;
  background-color: white;
  border-color: #c93e37;
}
</style>