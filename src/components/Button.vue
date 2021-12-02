<template>

      <b-button
        :href="button.link"
        @click="button.methode"
        block
        :variant="button.variant"
        :class="button.class"
        :size="button.size"
       
        
     
        > {{ button.name }}<b-icon :class="button.iconClass" class="hide" :icon="button.icon"  aria-label="Help"></b-icon> 
 
      </b-button>
  
    <!-- anstatt den link so zu binden oder mit $ oder mit {{}} das mit v-bind:to
       <router-link tag="div" to="button.buttonlink" class="element"> 

      <router-link tag="div" :to="button.link" class="element">
      <p><b-button variant="outline-dark">{{button.name}}</b-button></p> 
      </router-link>-->
 
</template>

<script>
export default {
  
  props:{
    button: {
        required: true,
        type: Object,
        name: "myButton",
        link: "#",
        methode: "",
        variant:"outline-dark",
        icon: "question-circle-fill",
        iconClass: "hide",
        class:"",
        size:""
     

      },
  },

};
</script>

<style scoped>
.hide{
  display:none;
}
.show{
  display:block;
}

</style>
