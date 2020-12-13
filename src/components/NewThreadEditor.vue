<template>
    <form @submit.prevent="save">
        <div class="form-group">
            Threadname:
            <input name=""
                   id=""
                   class="form-input"
                   v-model="title" />
            Slugs:
            <input name=""
                   id=""
                   class="form-input"
                   v-model="slug" />
            Message
            <textarea name=""
                      id=""
                      cols="30"
                      rows="5"
                      class="form-input"
                      v-model="text"></textarea>
        
        </div>

        <div class="form-actions">
            <button class="btn-red">Create Thread</button>
        </div>
    </form>
</template>

<script>
  export default {
    props: {
        forumId: {
        required: true
      }
    },
    data () {
      return {
          title: '',
          slug: '',
          text: ''
      }
    },
    methods: {
      save () {
          const thread = {
              title: this.title,
              slug: this.slug,
              publishedAt: Math.floor(Date.now() / 1000),
              userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
              forumId: this.forumId               
          }

          const post = {
              text: this.text,
              publishedAt: Math.floor(Date.now() / 1000),
              userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2'
          }

          this.$emit('save', { thread, post })
      }
    }
  }
</script>

<style scoped>
</style>
