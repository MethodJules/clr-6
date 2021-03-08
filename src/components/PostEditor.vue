<!-- Post Editor -->
<template>
    <form @submit.prevent="save">
        <!-- Posttext-->
        <div class="form-group">
            <textarea name=""
                      id=""
                      cols="30"
                      rows="5"
                      class="form-input"
                      v-model="text"></textarea>
        </div>
        <!-- Submit new post-->
        <div class="form-actions">
            <button class="btn-red">Submit post</button>
        </div>
    </form>
</template>

<script>
  export default {
    props: {
      threadId: {
        required: true
      }
    },
    data () {
      return {
        text: ''
      }
    },
    methods: {
        // save and store post 
        save() {
            // save new post with values
            const post = {
                  text: this.text,
                  publishedAt: Math.floor(Date.now() / 1000),
                  threadId: this.threadId,
                  userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2'
            }

             this.text = ''
            // save Post, put it to store (emit save-method from component)
             this.$emit('save', {post})
      }
    }
  }
</script>

<style scoped>
</style>
