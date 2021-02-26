<template>
    <div>
    <b-container>
    <b-row>
    </b-row>
    <b-row class="#f8f9fa">
        <h2><b-badge >Dokumentation</b-badge></h2>
    </b-row>
    <b-row>
    
    <b-form-textarea v-model="value" debounce="500" rows="3" max-rows="5"></b-form-textarea>
    <pre class="mt-2 mb-0">{{ value }}</pre>
    </b-row>
    </b-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>