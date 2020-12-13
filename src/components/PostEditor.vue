<template>
    <form @submit.prevent="save">
        <div class="form-group">
            <textarea name=""
                      id=""
                      cols="30"
                      rows="5"
                      class="form-input"
                      v-model="text"></textarea>
        </div>

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
        save() {
            alert(this.threadId)

        const post = {
          text: this.text,
          publishedAt: Math.floor(Date.now() / 1000),
          threadId: this.threadId,
          userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2'
        }

        this.text = ''

        // console.log(post)

        this.$emit('save', {post})
      }
    }
  }
</script>

<style scoped>
</style>
