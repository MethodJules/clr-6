<template>
    <div class="button">
      <p><b-button :href="button.link" @click="hide" block variant="outline-dark">{{button.name}} </b-button></p>
      <!-- anstatt den link so zu binden oder mit $ oder mit {{}} das mit v-bind:to
       <router-link tag="div" to="button.buttonlink" class="element"> 

      <router-link tag="div" :to="button.link" class="element">
      <p><b-button variant="outline-dark">{{button.name}}</b-button></p> 
      </router-link>-->
    </div>
</template>

<script>

  export default {
    props: {
      button: {
        required: true,
        type: Object
      }
    },

  }
</script>

<style scoped>
</style>
